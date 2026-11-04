import { APIError, APIConnectionError, APITimeoutError } from 'faxforagents'

export const remedies = {
  invalid_input: 'Correct the action inputs and try again.',
  invalid_token: 'Replace the API key in the integration secret settings.',
  sandbox_required: 'Sandbox requires an ffa_test_ credential. Live credentials are refused.',
  environment_mismatch: 'The credential environment did not match. Check the configured API key.',
  unsafe_scope: 'Use an agent credential without approval:decide.',
  scope_missing: 'Ask the account owner to grant the required scope.',
  approval_required: 'Request human review. Wait for approval bound to this quote before sending.',
  approval_invalid: 'Use an approved send request bound to this quote.',
  quote_expired: 'Create a new quote and obtain approval for that quote.',
  quote_consumed: 'This quote already created a fax. Reuse the original idempotency key and payload.',
  insufficient_balance: 'Ask the owner to review the balance in the dashboard.',
  idempotency_conflict: 'Reuse the original payload with this idempotency key. Use a new key only for a new operation.',
  not_cancelable: 'This fax cannot be canceled. Read its delivery status.',
  not_found: 'Check the resource ID and credential environment.',
  rate_limited: 'Retry later with the same idempotency key and payload.',
  timeout: 'The request timed out. Retry with the same idempotency key and payload.',
  connection_error: 'The service could not be reached. Retry with the same idempotency key and payload.',
  invalid_response: 'The service returned an unexpected response. Contact hello@faxforagents.com before retrying mutations.',
  service_error: 'The request failed. Contact hello@faxforagents.com. Keep the same idempotency key for any retry.',
} as const
export type ErrorCode = keyof typeof remedies
export class ActionError extends Error {
  constructor(readonly code: ErrorCode, message?: string) {
    super(message ?? remedies[code])
  }
}
export function failure(error: unknown) {
  let code: ErrorCode = 'service_error'
  let retryable = false
  let message: string | undefined
  if (error instanceof ActionError) {
    code = error.code
    message = error.message
  } else if (error instanceof APITimeoutError) {
    code = 'timeout'
    retryable = true
  } else if (error instanceof APIConnectionError) {
    code = 'connection_error'
    retryable = true
  } else if (error instanceof APIError) {
    code = Object.hasOwn(remedies, error.code) ? error.code as ErrorCode : 'service_error'
    if (error.status === 401) code = 'invalid_token'
    retryable = error.retryable
  }
  return { ok: false, message: message ?? remedies[code], error_code: code, retryable, data: null, untrusted: [] }
}
