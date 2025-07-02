import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'message_histories'

  async up() {
   this.schema.alterTable(this.tableName, (table) => {
      table.json("attachments").after("template_params")
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("attachments")
    })
  }
}