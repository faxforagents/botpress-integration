# Botpress Hub handoff

Package B07 is prepared locally for `github.com/faxforagents/botpress-integration`.
No account, repository, deployment, or submission was created.

## Local commands

Run from the repository root with Node.js 22.12 or later.
These commands were verified without login.

```bash
export BP_BOTPRESS_HOME="$PWD/.bp-home"
npm ci
npx --no-install bp --version
npx --no-install bp build
npm run check:type
npx --no-install bp lint
npm test
npm run build:example
npm run check:example
```

The pinned CLI is 7.1.12.
Its help output confirms the camelCase flags used below.
The example's local dependency requires no remote package lookup.

## Ben's account steps

The next authenticated step is `bp login`.
Stop here until Ben performs it.

1. Sign in to the [Botpress dashboard](https://app.botpress.cloud/).
2. Open Personal Access Tokens and create a token for the CLI.
3. Choose the workspace that will own the integration.
4. Run the following command and enter the token at its prompt.

```bash
npx --no-install bp login
```

Keep the token out of source control and shell arguments.
The `.bp-home` directory is ignored.
Review current dependency advisories in the local evidence before deploying.

## Ben's private test

Deploy the integration privately after reviewing the local package.

```bash
npx --no-install bp deploy --visibility private
```

Select the intended workspace when prompted.
Accept the workspace-qualified name when the CLI prompts.
Record the deployed name, including its workspace prefix, and version.
Open its dashboard page and verify the title, icon, configuration, and action cards.

Build and deploy the example only after the integration exists in that workspace.
Replace the local dependency with the deployed name while keeping the action alias.
Enter that exact workspace-qualified name at the prompt below.

```bash
read -r -p 'Deployed integration name: ' FAX_BOTPRESS_NAME
npx --no-install bp add "$FAX_BOTPRESS_NAME@0.1.0" --alias faxforagents --installPath examples/fax-approval-bot
npm run build:example
npx --no-install bp deploy --workDir examples/fax-approval-bot --createNewBot --visibility private
```

Record the created bot ID before later updates.
The example initially disables the integration.
Enable it in the dashboard with an `ffa_test_` secret and Sandbox selected.
Invoke `requestFaxReview` with a persistent operation ID.
Confirm the quote targets `+15550000001` and that the review appears in Fax for Agents.
Confirm the bot never sends or decides approval.
The example README explains the action input and expected result.

## Ben's public profile and review

Complete these steps in the dashboard after the private test passes.

1. Set a workspace URL handle that identifies Fax for Agents.
2. Add the website and `hello@faxforagents.com` as contact details.
3. Add the workspace description and brand icon if desired.
4. Confirm the source repository exists before adding its public link to the listing.
5. Open the integration page and select Make Public.
6. Read and accept the Hub terms.
7. Use Request Verification in the integration's banner.
8. Provide the demonstration bot and follow the dashboard's current review instructions.

The current guide suggests inviting `hub-applications@botpress.com` as a workspace Admin to help reviewers test.
Ben must decide and perform that invitation himself.
No invitation or review message was sent.
Record the submission receipt and any reviewer requests before calling verification complete.

The integration title is Fax for Agents.
The icon uses the brand's cream, charcoal, and green colors.
It contains no Botpress branding.
The Hub text covers setup, usage, dated pricing, support, and privacy.

## References checked November 4, 2026

- [Integration setup](https://botpress.com/docs/integrations/sdk/integration/getting-started/)
- [Definition concepts](https://botpress.com/docs/integrations/sdk/integration/concepts/)
- [Hub publication](https://botpress.com/docs/integrations/sdk/integration/publish-your-integration-on-botpress-hub/)
- [CLI reference](https://botpress.com/docs/integrations/sdk/cli-reference/)
- [Bots-as-code](https://botpress.com/docs/integrations/sdk/bots-as-code/)
