import { beforeEach, expect, it, vi } from 'vitest'
import type { SDKClient } from '../src/actions'
import { config, fakeSDK } from './helpers'

const state = vi.hoisted(() => ({ client: undefined as SDKClient | undefined }))
vi.mock('faxforagents', async (importOriginal) => {
  const original = await importOriginal<typeof import('faxforagents')>()
  return { ...original, FaxForAgents: vi.fn(function () { return state.client }) }
})
import integration from '../src/index'

beforeEach(() => { state.client = fakeSDK().client })

it('connects the Botpress prepare action to the configured SDK', async () => {
  const args = { ctx: { configuration: config }, input: { text: 'From Botpress', idempotency_key: 'botpress:prepare' } }
  const result = await integration.actions.prepareFax(args as Parameters<typeof integration.actions.prepareFax>[0])
  expect(result.ok).toBe(true)
  expect(state.client?.documents.create).toHaveBeenCalledWith({ text: 'From Botpress' }, { idempotencyKey: 'botpress:prepare' })
})
it('connects registration to credential validation', async () => {
  await integration.register({ ctx: { configuration: config } } as Parameters<typeof integration.register>[0])
  expect(state.client?.platform.capabilities).toHaveBeenCalledOnce()
})
it('refuses unconfigured webhook traffic', async () => {
  expect(await integration.webhook({} as Parameters<typeof integration.webhook>[0])).toMatchObject({ status: 404 })
})
