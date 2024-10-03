import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'mail_templates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("hash")
      table.integer("user_id_fk")
      table.string("template_name", 50)
      table.text("template_body", "long_text")
      table.tinyint("status")
      table.integer("created_by")
      table.timestamp('created_at')
      table.integer("updated_by")
      table.timestamp('updated_at')

      table.index("user_id_fk")
      table.index("status")      
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}