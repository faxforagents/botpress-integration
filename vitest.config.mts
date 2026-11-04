import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: { alias: { '.botpress': fileURLToPath(new URL('./.botpress', import.meta.url)) } },
  test: { include: ['tests/**/*.test.ts'], passWithNoTests: false },
})
