import { BotDefinition, z } from '@botpress/sdk'
import faxforagents from './bp_modules/faxforagents'

export default new BotDefinition({
  actions: {
    requestFaxReview: {
      title: 'Request sandbox fax review',
      description: 'Prepare a fixed sandbox document, quote its destination, and request human review.',
      input: { schema: z.object({ operationId: z.string().min(1).max(180).regex(/^[A-Za-z0-9_-]+$/) }) },
      output: { schema: z.object({
        ok: z.boolean(), message: z.string(), document_id: z.string().nullable(),
        quote_id: z.string().nullable(), review_request_id: z.string().nullable(),
      }) },
    },
  },
}).addIntegration(faxforagents, {
  enabled: false,
  configuration: { apiKey: '', sandbox: true },
})
