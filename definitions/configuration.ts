import { z } from '@botpress/sdk'

export const configurationSchema = z.object({
  apiKey: z.string().min(1).secret().title('API key')
    .describe('Fax for Agents credential. Use an ffa_test_ key for sandbox.'),
  sandbox: z.boolean().default(true).title('Sandbox')
    .describe('Reject live credentials. Test credentials never contact a carrier.'),
}).strict()
export type Configuration = z.input<typeof configurationSchema>
