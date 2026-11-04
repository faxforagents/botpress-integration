import { readFileSync, writeFileSync } from 'node:fs'

const { schemas } = JSON.parse(readFileSync(new URL('../definitions/rest-contract.json', import.meta.url)))
const declarations = new Map()
const quote = JSON.stringify
function schema(s) {
  if (s.$ref) {
    const name = s.$ref.split('/').pop()
    emit(name)
    return `${name}Schema`
  }
  if (s.anyOf) return `z.union([${s.anyOf.map(schema).join(', ')}])`
  if (s.enum) return `z.enum(${quote(s.enum)})`
  let value
  switch (s.type) {
    case 'null': return 'z.null()'
    case 'string': value = 'z.string()'; break
    case 'integer': value = 'z.number().int()'; break
    case 'number': value = 'z.number()'; break
    case 'boolean': return 'z.boolean()'
    case 'array': return `z.array(${schema(s.items)})`
    case 'object': {
      if (!s.properties) return `z.record(${typeof s.additionalProperties === 'object' ? schema(s.additionalProperties) : 'z.any()'})`
      const fields = Object.entries(s.properties).map(([key, field]) =>
        `  ${quote(key)}: ${schema(field)}${s.required?.includes(key) ? '' : '.optional()'}`)
      return `z.object({\n${fields.join(',\n')}\n})`
    }
    default: throw new Error(`Unsupported schema: ${quote(s)}`)
  }
  if (s.minimum !== undefined) value += `.min(${s.minimum})`
  if (s.maximum !== undefined) value += `.max(${s.maximum})`
  if (s.minLength !== undefined) value += `.min(${s.minLength})`
  if (s.maxLength !== undefined) value += `.max(${s.maxLength})`
  if (s.pattern) value += `.regex(new RegExp(${quote(s.pattern)}))`
  return value
}
function emit(name) {
  if (declarations.has(name)) return
  const value = schema(schemas[name])
  declarations.set(name, `export const ${name}Schema = ${value}`)
}
Object.keys(schemas).forEach(emit)
writeFileSync(new URL('../definitions/responses.ts', import.meta.url),
  '// Generated from rest-contract.json. Run npm run generate:schemas.\n' +
  "import { z } from '@botpress/sdk'\n\n" + [...declarations.values()].join('\n\n') + '\n')
