# Changelog

## 1.1.0, November 14, 2026

Follow the hosted MCP server at API 1.20.3, which lists 17 tools. This version adds actions and optional inputs only.

- New action `requestCardPayment`: ask a person to pay for one quoted fax by card. It returns `status_url` for the person. It never takes card details.
- New action `getCardPaymentStatus`: read the order, and the fax with its attempts once it is released.
- `requestCardPayment` needs a live credential and an `approval_id`. It refuses both gaps before calling the API.
- Card results leave out the payer's address, the card and the status token.
- `quoteFax` takes `quality`, `sender_name`, `from_number` and `delete_after_send`.
- `listFaxes` takes `idempotency_key`, a filter that finds the send made with that key.
- The guide has the sections `one_time` and `going_live`. Five card refusal codes have their own remedy.
- `definitions/tool-definitions.json` is the hosted catalog of 17 tools. `cancel_fax` is marked idempotent there.
- No existing output schema changed.

## 1.0.0, November 14, 2026

Follow API 1.20.3. The version is 1.0.0 because the output of `extractFaxData` lost a field, and Botpress counts that as a breaking change.

- `extractFaxData` answered `invalid_response` since API 1.19.0. The API stopped sending `provider_cost_micro`, and the response check required it.
- The response schemas come from the public OpenAPI document at 1.20.3. A quote and a fax carry `quality`, `sender_name` and `delete_after_send`. A balance carries `top_up_url`.
- The SDK dependency is `faxforagents` 0.6.0. It was 0.2.5.
- The README says the hosted MCP server has two card tools this integration does not have.

## 0.1.1, November 7, 2026

Fix the registration scope check.

- Registration now reads the key's own scopes from `GET /v1/me`.
- `GET /v1/capabilities` lists every platform scope, so every save showed "Use an agent credential without approval:decide" although the configuration was saved.
- A key that really holds `approval:decide` is still refused. Live credentials are still refused in sandbox mode.

## 0.1.0, November 4, 2026

Initial local package for Botpress Hub submission.

- Add all 15 canonical operations and the `sendFax` alias.
- Default to sandbox and validate credentials during registration.
- Require caller idempotency keys for mutations.
- Require quote and approval IDs for live sending.
- Return structured failures and mark external content as untrusted.
- Add a sandbox approval example and fake SDK tests.
- Add Hub listing text and Ben's submission steps.

Deployment, public visibility, and Hub verification remain pending.
