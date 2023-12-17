// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Clicevents,
  CliceventsData,
  CliceventsPatch,
  CliceventsQuery,
  CliceventsService
} from './clicevents.class'

export type { Clicevents, CliceventsData, CliceventsPatch, CliceventsQuery }

export type CliceventsClientService = Pick<
  CliceventsService<Params<CliceventsQuery>>,
  (typeof cliceventsMethods)[number]
>

export const cliceventsPath = 'clicevents'

export const cliceventsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const cliceventsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(cliceventsPath, connection.service(cliceventsPath), {
    methods: cliceventsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [cliceventsPath]: CliceventsClientService
  }
}
