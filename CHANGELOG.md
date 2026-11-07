# Changelog

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
