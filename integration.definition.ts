import { IntegrationDefinition } from '@botpress/sdk'
import { actions } from './definitions/actions'
import { configurationSchema } from './definitions/configuration'

export default new IntegrationDefinition({
  name: 'faxforagents',
  version: '0.1.1',
  title: 'Fax for Agents',
  description: 'Prepare and quote faxes, request human review, send approved faxes, and read received documents.',
  icon: 'icon.svg',
  readme: 'hub.md',
  configuration: { schema: configurationSchema },
  actions,
  events: {},
  channels: {},
})
