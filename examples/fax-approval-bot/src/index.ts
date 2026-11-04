import * as bp from '.botpress'
import { requestFaxReview } from './workflow'

export default new bp.Bot({
  actions: {
    requestFaxReview: ({ client, input }) => requestFaxReview(input.operationId, {
      capabilities: async () => (await client.callAction({ type: 'faxforagents:getFaxCapabilities', input: {} })).output,
      prepare: async (input) => (await client.callAction({ type: 'faxforagents:prepareFax', input })).output,
      quote: async (input) => (await client.callAction({ type: 'faxforagents:quoteFax', input })).output,
      review: async (input) => (await client.callAction({ type: 'faxforagents:requestHumanReview', input })).output,
    }),
  },
})
