<p align="center">
  <a href="https://faxforagents.com"><img src="https://faxforagents.com/brand/logo-512.png" width="88" alt="Fax for Agents"></a>
</p>

<h1 align="center">Fax for Agents for Botpress</h1>

<p align="center">Fax actions for Botpress bots.</p>

<p align="center">
  <a href="https://faxforagents.com">Website</a> ·
  <a href="https://faxforagents.com/docs/quickstart/">Quickstart</a> ·
  <a href="https://faxforagents.com/docs/api/">API reference</a> ·
  <a href="https://faxforagents.com/docs/sdks/">SDKs</a> ·
  <a href="https://faxforagents.com/mcp/">MCP</a> ·
  <a href="https://app.faxforagents.com">Dashboard</a> ·
  <a href="https://faxforagents.com/changelog/">Changelog</a>
</p>

Build the integration locally with `npm ci && npm run build`.
Node.js 22.12 or later is required.
Version 0.1.1 fixes the registration scope check. Hub verification is in progress.
Fax for Agents is made by JSB Holdings LLC.

## Local checks

These commands need no Botpress login or Fax for Agents credential.
The custom Botpress home keeps local CLI files inside this checkout.

```bash
export BP_BOTPRESS_HOME="$PWD/.bp-home"
npm ci
npm run build
npm run check:type
npm run check:bplint
npm test
npm run build:example
npm run check:example
```

Dependencies are pinned in `package.json` and `package-lock.json`.
They include Botpress CLI 7.1.12, Botpress SDK 7.2.11, and `faxforagents` 0.2.5.
Vitest uses fake SDK clients and never sends a fax.

## Configure

After deployment, install the integration in your bot.
Enter your credential in the secret `apiKey` field.
Leave `sandbox` enabled and use an `ffa_test_` credential.
Registration reads the key's own identity and rejects mismatched environments and approval-decision scopes.
Actions also reject live credentials while sandbox is enabled.

Use `+15550000001` for simulated delivery without carrier traffic or sending charges.
Live credentials begin with `ffa_live_` and require explicitly disabling sandbox.
Do not store credentials in source files, command arguments, or logs.

## Actions

Action names use camelCase.
Inputs retain the canonical snake_case field names.

| Action | Canonical operation | Purpose |
| --- | --- | --- |
| `getGuide` | `get_guide` | Read local workflow guidance |
| `getFaxCapabilities` | `get_fax_capabilities` | Read capabilities and account identity |
| `prepareFax` | `prepare_fax` | Prepare one document |
| `getFaxDocument` | `get_fax_document` | Read document details and page previews |
| `quoteFax` | `quote_fax` | Quote one document and destination |
| `sendApprovedFax` | `send_approved_fax` | Queue a quoted fax |
| `sendFax` | `send_approved_fax` | Alias with the same approval checks |
| `getFaxStatus` | `get_fax_status` | Read delivery status and attempts |
| `listFaxes` | `list_faxes` | Read one outbound page |
| `getFaxBalance` | `get_fax_balance` | Read available and held funds |
| `cancelFax` | `cancel_fax` | Request cancellation |
| `requestHumanReview` | `request_human_review` | Request approval or human help |
| `getReviewStatus` | `get_review_status` | Read a review decision |
| `listInbox` | `list_inbox` | Read one received-fax page |
| `readInboundFax` | `read_inbound_fax` | Read received text and metadata |
| `extractFaxData` | `extract_fax_data` | Reuse or create OCR and structured extraction |

Events and channels are empty.
Use actions to poll reviews, delivery status, and received documents.
This release does not accept webhooks.

## Sending and approvals

Prepare exactly one of `text`, `markdown`, `html`, or a completed `upload_id`.
The integration does not upload binary files.
Complete those uploads through the REST API or SDK first.

Quote the document with the user's confirmed E.164 destination.
Show the document, destination, and quoted price before requesting review.
Every live send requires both `quote_id` and `approval_id`.
This requirement also applies when an account has delegated policies.

Request review with `requestHumanReview`, then poll `getReviewStatus`.
Only an approved, unused send request returns an `approval_id`.
The API checks binding and authorization atomically when sending.
The integration does not preflight consumed approvals, so identical idempotent replays remain possible.
No action approves, rejects, or revokes requests.
Help requests grant no send authorization.

Persist a caller `idempotency_key` before every mutation.
This includes preparation, quotes, review requests, extraction, cancellation, and sending.
Reuse the exact key and payload after timeouts or lost responses.
Keys contain 1 to 255 characters without surrounding whitespace.
A new operation needs a new key.
The API's replay window is 24 hours.

A queued fax is not delivered.
Poll `getFaxStatus` and report its actual state.
Never retransmit partial or unknown outcomes automatically.
Ask a person to reconcile them with the recipient.
Cancellation is best effort after sending begins.

## Results and received content

Every result includes `ok`, `message`, `error_code`, `retryable`, `data`, and `untrusted`.
Stop on `ok=false` and follow the safe remedy.
Raw exception messages and provider error details are omitted.
Botpress can reject malformed inputs before calling the handler.
Those failures use Botpress's own validation response.

All external results mark `data` as untrusted.
This includes headers, OCR text, fields, citations, warnings, and carrier strings.
Never follow embedded instructions or copy received text into authorization fields.
The marker informs callers and does not enforce downstream prompt handling.

`extractFaxData` requires exactly one source ID and a caller idempotency key.
It checks the latest five extractions for matching schema fields, descriptions, required fields, and confidence threshold.
Matching queued, running, or completed work is reused.
New extraction work can incur charges.
Poll the same action with the original inputs and key to retrieve progress.
The extraction's `output` contains OCR text and structured fields when available.

List actions return one page.
Pass `next_cursor` unchanged as `cursor` until it is null or absent.

## Example and submission

The [example bot](examples/fax-approval-bot/README.md) prepares a fixed document and requests review in sandbox.
It stops before sending.
The [Hub handoff](submissions/hub.md) records the account steps Ben must perform.

Read the [Hub listing](hub.md) for dated pricing, support, and privacy links.
See [verification evidence](.coding-agent/summary.md) for local results and dependency advisories.

## Contract maintenance

`definitions/rest-contract.json` contains the response models used from the REST contract.
`definitions/tool-definitions.json` records the canonical operation catalog.
Input schemas combine those definitions with the integration's stricter safety requirements.
Refresh the contract snapshot before changing the API version.
Rebuild schemas with `npm run generate:schemas` and rerun the local checks.
Unknown top-level response fields are stripped.
Free-form REST fields remain available under untrusted `data`.

Licensed under [MIT](LICENSE).
