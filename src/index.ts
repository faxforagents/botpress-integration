import * as bp from '.botpress'
import { execute, register } from './actions'

export default new bp.Integration({
  register: async ({ ctx }) => register(ctx.configuration),
  unregister: async () => {},
  channels: {},
  handler: async () => ({ status: 404, body: 'This integration uses action polling. Webhooks are not configured.' }),
  actions: {
    getGuide: ({ input, ctx }) => execute('getGuide', input, ctx.configuration),
    getFaxCapabilities: ({ input, ctx }) => execute('getFaxCapabilities', input, ctx.configuration),
    prepareFax: ({ input, ctx }) => execute('prepareFax', input, ctx.configuration),
    getFaxDocument: ({ input, ctx }) => execute('getFaxDocument', input, ctx.configuration),
    quoteFax: ({ input, ctx }) => execute('quoteFax', input, ctx.configuration),
    sendApprovedFax: ({ input, ctx }) => execute('sendApprovedFax', input, ctx.configuration),
    sendFax: ({ input, ctx }) => execute('sendFax', input, ctx.configuration),
    getFaxStatus: ({ input, ctx }) => execute('getFaxStatus', input, ctx.configuration),
    listFaxes: ({ input, ctx }) => execute('listFaxes', input, ctx.configuration),
    getFaxBalance: ({ input, ctx }) => execute('getFaxBalance', input, ctx.configuration),
    cancelFax: ({ input, ctx }) => execute('cancelFax', input, ctx.configuration),
    requestHumanReview: ({ input, ctx }) => execute('requestHumanReview', input, ctx.configuration),
    getReviewStatus: ({ input, ctx }) => execute('getReviewStatus', input, ctx.configuration),
    listInbox: ({ input, ctx }) => execute('listInbox', input, ctx.configuration),
    readInboundFax: ({ input, ctx }) => execute('readInboundFax', input, ctx.configuration),
    extractFaxData: ({ input, ctx }) => execute('extractFaxData', input, ctx.configuration),
  },
})
