'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable()
      table.text('message').notNullable()
      table.uuid('room_id').references('uuid').inTable('rooms').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessageSchema
