// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ProjectsService } from './projects.class'

// Main data model schema
export const projectsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    createdAt: Type.String()
  },
  { $id: 'Projects', additionalProperties: false }
)
export type Projects = Static<typeof projectsSchema>
export const projectsValidator = getValidator(projectsSchema, dataValidator)
export const projectsResolver = resolve<Projects, HookContext<ProjectsService>>({
  createdAt: async () => {
    return new Date().toISOString()
  }
})

export const projectsExternalResolver = resolve<Projects, HookContext<ProjectsService>>({})

// Schema for creating new entries
export const projectsDataSchema = Type.Pick(projectsSchema, ['name'], {
  $id: 'ProjectsData'
})
export type ProjectsData = Static<typeof projectsDataSchema>
export const projectsDataValidator = getValidator(projectsDataSchema, dataValidator)
export const projectsDataResolver = resolve<Projects, HookContext<ProjectsService>>({})

// Schema for updating existing entries
export const projectsPatchSchema = Type.Partial(projectsSchema, {
  $id: 'ProjectsPatch'
})
export type ProjectsPatch = Static<typeof projectsPatchSchema>
export const projectsPatchValidator = getValidator(projectsPatchSchema, dataValidator)
export const projectsPatchResolver = resolve<Projects, HookContext<ProjectsService>>({})

// Schema for allowed query properties
export const projectsQueryProperties = Type.Pick(projectsSchema, ['id', 'name', 'createdAt'])
export const projectsQuerySchema = Type.Intersect(
  [
    querySyntax(projectsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ProjectsQuery = Static<typeof projectsQuerySchema>
export const projectsQueryValidator = getValidator(projectsQuerySchema, queryValidator)
export const projectsQueryResolver = resolve<ProjectsQuery, HookContext<ProjectsService>>({})
