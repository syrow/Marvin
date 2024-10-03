import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'api_keys'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id_fk')
      table.string('key')
      table.tinyint("status")
      table.integer("created_by")
      table.timestamp('created_at')

      table.index("user_id_fk")
      table.index("status")
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}