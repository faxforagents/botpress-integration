import { expect, it, vi } from 'vitest'
import { requestFaxReview, type FaxActions } from '../examples/fax-approval-bot/src/workflow'
import { execute } from '../src/actions'
import { config, fakeSDK, fixture } from './helpers'

function setup() {
  const sdk = fakeSDK()
  const fax: FaxActions = {
    capabilities: vi.fn(() => execute('getFaxCapabilities', {}, config, sdk.factory)),
    prepare: vi.fn((input) => execute('prepareFax', input, config, sdk.factory)),
    quote: vi.fn((input) => execute('quoteFax', input, config, sdk.factory)),
    review: vi.fn((input) => execute('requestHumanReview', input, config, sdk.factory)),
  }
  return { ...sdk, fax }
}
it('prepares, quotes, and requests review with fixed sandbox content and persistent keys', async () => {
  const { fax, client } = setup()
  const result = await requestFaxReview('demo-001', fax)
  expect(result.ok).toBe(true)
  expect(result.review_request_id).toBeTruthy()
  expect(client.quotes.create).toHaveBeenCalledWith({ document_id: fixture('Document').id, to: '+15550000001' }, { idempotencyKey: 'demo-001:quote' })
  expect(client.approvals.request).toHaveBeenCalledWith(fixture('Quote').id, { idempotencyKey: 'demo-001:review' })
  expect(client.faxes.create).not.toHaveBeenCalled()
})
it('refuses live capabilities before preparing a document', async () => {
  const { fax, client } = setup()
  client.platform.capabilities.mockResolvedValue({ ...fixture('Capabilities'), environment: 'live' })
  expect((await requestFaxReview('demo-001', fax)).ok).toBe(false)
  expect(client.documents.create).not.toHaveBeenCalled()
})
it('stops after a preparation failure', async () => {
  const { fax, client } = setup()
  client.documents.create.mockRejectedValue(new Error('Provider failure'))
  expect((await requestFaxReview('demo-001', fax)).ok).toBe(false)
  expect(client.quotes.create).not.toHaveBeenCalled()
  expect(client.approvals.request).not.toHaveBeenCalled()
})
it('uses identical operation keys on retries', async () => {
  const { fax, client } = setup()
  await requestFaxReview('demo-001', fax)
  await requestFaxReview('demo-001', fax)
  expect(client.documents.create.mock.calls[0]).toEqual(client.documents.create.mock.calls[1])
  expect(client.quotes.create.mock.calls[0]).toEqual(client.quotes.create.mock.calls[1])
  expect(client.approvals.request.mock.calls[0]).toEqual(client.approvals.request.mock.calls[1])
})
