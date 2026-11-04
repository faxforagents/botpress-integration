# Sandbox fax approval bot

This bot prepares a document, quotes `+15550000001`, and requests human review.
It stops before sending.

## Build locally

Run these commands from the repository root.
No login or credential is needed.

```bash
export BP_BOTPRESS_HOME="$PWD/.bp-home"
npm run build:example
npm run check:example
```

The build installs the local integration definition through `bp add -y`.
It then runs `bp build` for this bot.
Botpress generates `.botpress` and `bp_modules` locally.
Those directories are excluded from source control.

## Run after Ben deploys

Follow the [Hub handoff](../../submissions/hub.md) first.
The integration starts disabled with an empty credential.
Configure its secret field in the dashboard and enable it with sandbox selected.
Use an `ffa_test_` credential.
Never embed a credential in `bot.definition.ts`.

Invoke the bot's `requestFaxReview` action with this input.
Use Botpress's authenticated Runtime API action call or a connected test client.

```json
{
  "operationId": "sandbox-review-2026-11-04-001"
}
```

The workflow checks that capabilities and identity both report the test environment.
It prepares fixed text and quotes the fixed sandbox destination.
Then it requests approval bound to that quote.
The result includes document, quote, and review request IDs.

Persist `operationId` before running.
Reuse it for retries of the same demonstration.
Use a new ID for a new demonstration or an expired quote.
The workflow uses separate idempotency keys for preparation, quotation, and review.

Poll `getReviewStatus` with the returned review request ID.
A person decides in Fax for Agents outside this bot.
No example action sends or decides approval.

## Review in Botpress

This is a bot-as-code definition, not a Studio workflow export.
Botpress displays bots-as-code in the dashboard, but Studio cannot edit their workflows.
For a Studio demonstration, add the integration's action cards in the same order.
Use `getFaxCapabilities`, `prepareFax`, `quoteFax`, and `requestHumanReview`.
Store each successful result before continuing.
Stop on any `ok=false` result.
