// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  cliceventsDataValidator,
  cliceventsPatchValidator,
  cliceventsQueryValidator,
  cliceventsResolver,
  cliceventsExternalResolver,
  cliceventsDataResolver,
  cliceventsPatchResolver,
  cliceventsQueryResolver
} from './clicevents.schema'

import type { Application } from '../../declarations'
import { CliceventsService, getOptions } from './clicevents.class'
import { cliceventsPath, cliceventsMethods } from './clicevents.shared'

export * from './clicevents.class'
export * from './clicevents.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const clicevents = (app: Application) => {
  // Register our service on the Feathers application
  app.use(cliceventsPath, new CliceventsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: cliceventsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(cliceventsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(cliceventsExternalResolver),
        schemaHooks.resolveResult(cliceventsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(cliceventsQueryValidator),
        schemaHooks.resolveQuery(cliceventsQueryResolver)
      ],
      find: [
        (context) => {
          // If {$distinct: true} is included in the query,
          // add `distinct()` to the knex query.
          if (context?.params?.query?.$distinct) {
            delete context.params.query.$distinct
            const knex = context.service.createQuery(context.params)
            context.params.knex = knex.distinct()
            // workaround to remove id from the query:
            context.params.knex = knex
              .clearSelect()
              .select(context.params.query.$select || '')
              .distinct()
            return context
          }
        }
      ],
      get: [],
      create: [
        schemaHooks.validateData(cliceventsDataValidator),
        schemaHooks.resolveData(cliceventsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(cliceventsPatchValidator),
        schemaHooks.resolveData(cliceventsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [cliceventsPath]: CliceventsService
  }
}
