// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { CliceventsService } from './clicevents.class'

// Main data model schema
export const cliceventsSchema = Type.Object(
  {
    id: Type.Number(),
    project: Type.Number(),
    user: Type.Optional(Type.String()),
    screen: Type.String(),
    target: Type.String(),
    reason: Type.Optional(Type.String()),
    item: Type.Optional(Type.String()),
    createdAt: Type.Optional(Type.String())
  },
  { $id: 'Clicevents', additionalProperties: false }
)
export type Clicevents = Static<typeof cliceventsSchema>
export const cliceventsValidator = getValidator(cliceventsSchema, dataValidator)
export const cliceventsResolver = resolve<Clicevents, HookContext<CliceventsService>>({})

export const cliceventsExternalResolver = resolve<Clicevents, HookContext<CliceventsService>>({})

// Schema for creating new entries
export const cliceventsDataSchema = Type.Pick(
  cliceventsSchema,
  ['project', 'user', 'screen', 'target', 'reason', 'item'],
  {
    $id: 'CliceventsData'
  }
)
export type CliceventsData = Static<typeof cliceventsDataSchema>
export const cliceventsDataValidator = getValidator(cliceventsDataSchema, dataValidator)
export const cliceventsDataResolver = resolve<Clicevents, HookContext<CliceventsService>>({
  createdAt: async () => {
    return new Date().toISOString()
  }
})

// Schema for updating existing entries
export const cliceventsPatchSchema = Type.Partial(cliceventsSchema, {
  $id: 'CliceventsPatch'
})
export type CliceventsPatch = Static<typeof cliceventsPatchSchema>
export const cliceventsPatchValidator = getValidator(cliceventsPatchSchema, dataValidator)
export const cliceventsPatchResolver = resolve<Clicevents, HookContext<CliceventsService>>({})

// Schema for allowed query properties
export const cliceventsQueryProperties = Type.Pick(cliceventsSchema, [
  'id',
  'project',
  'user',
  'screen',
  'target',
  'reason',
  'item',
  'createdAt'
])
export const cliceventsQuerySchema = Type.Intersect(
  [
    querySyntax(cliceventsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CliceventsQuery = Static<typeof cliceventsQuerySchema>
export const cliceventsQueryValidator = getValidator(cliceventsQuerySchema, queryValidator)
export const cliceventsQueryResolver = resolve<CliceventsQuery, HookContext<CliceventsService>>({})
