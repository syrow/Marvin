import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name", 50)
      table.string('email', 100)
      table.string('phone_number', 15)
      table.integer('status', 1)
      table.integer("created_by")
      table.timestamp('created_at')
      table.integer("updated_by")
      table.timestamp('updated_at')

      table.index("status")
      table.index("created_by")
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}