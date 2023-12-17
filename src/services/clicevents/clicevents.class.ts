// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Clicevents, CliceventsData, CliceventsPatch, CliceventsQuery } from './clicevents.schema'

export type { Clicevents, CliceventsData, CliceventsPatch, CliceventsQuery }

export interface CliceventsParams extends KnexAdapterParams<CliceventsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CliceventsService<ServiceParams extends Params = CliceventsParams> extends KnexService<
  Clicevents,
  CliceventsData,
  CliceventsParams,
  CliceventsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'clicevents'
  }
}
