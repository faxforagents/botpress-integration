import type { Result } from '../../../definitions/actions'

export interface FaxActions {
  capabilities(): Promise<Result<'getFaxCapabilities'>>
  prepare(input: { text: string; idempotency_key: string }): Promise<Result<'prepareFax'>>
  quote(input: { document_id: string; to: string; idempotency_key: string }): Promise<Result<'quoteFax'>>
  review(input: { quote_id: string; message: string; idempotency_key: string }): Promise<Result<'requestHumanReview'>>
}

export async function requestFaxReview(operationId: string, fax: FaxActions) {
  if (!/^[A-Za-z0-9_-]{1,180}$/.test(operationId)) throw new Error('Supply a persistent operation ID with letters, digits, hyphens, or underscores.')
  const result = { ok: false, message: '', document_id: null as string | null,
    quote_id: null as string | null, review_request_id: null as string | null }
  const capabilities = await fax.capabilities()
  if (!capabilities.ok || capabilities.data?.capabilities.environment !== 'test' || capabilities.data.identity.environment !== 'test') {
    return { ...result, message: 'Configure an ffa_test_ credential and enable Sandbox before running this example.' }
  }
  const prepared = await fax.prepare({ text: 'Sandbox fax from the Botpress approval example.', idempotency_key: `${operationId}:prepare` })
  if (!prepared.ok || !prepared.data) return { ...result, message: prepared.message }
  result.document_id = prepared.data.id
  const quoted = await fax.quote({ document_id: prepared.data.id, to: '+15550000001', idempotency_key: `${operationId}:quote` })
  if (!quoted.ok || !quoted.data) return { ...result, message: quoted.message }
  result.quote_id = quoted.data.id
  const requested = await fax.review({ quote_id: quoted.data.id,
    message: 'Review this sandbox fax to +15550000001.', idempotency_key: `${operationId}:review` })
  if (!requested.ok || !requested.data) return { ...result, message: requested.message }
  return { ...result, ok: true, review_request_id: requested.data.id,
    message: 'Review requested. Poll getReviewStatus for the decision. This example does not send.' }
}
