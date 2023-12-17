// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('clicevents', (table) => {
    table.increments('id')
    table.integer('project').notNullable()
    table.string('user')
    table.string('screen').notNullable()
    table.string('target').notNullable()
    table.string('reason')
    table.string('item')
    table.string('createdAt').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('clicevents')
}
