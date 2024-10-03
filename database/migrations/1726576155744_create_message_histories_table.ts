import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'message_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("hash", 50).index()
      table.integer("template_id_fk")
      table.string("from_address")
      table.json("to_address")
      table.json("cc")
      table.json("bcc")
      table.json("template_params")
      table.string("subject")
      table.text("body", "longtext")
      table.string("reply_to")
      table.string("message_id", 150)
      table.string("priority", 20)
      table.tinyint("retry")
      table.string("mail_provider", 50)
      table.json("config")
      table.tinyint("status").defaultTo(1).comment("1=new, 2=queue, 3=processing, 4=completed")
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index("priority")
      table.index("status")
      table.index("template_id_fk")
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}