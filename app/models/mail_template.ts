import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import MessageHistory from './message_history.js'

export default class MailTemplate extends BaseModel {
  public static table = 'mail_templates'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare hash: string

  @column()
  declare user_id_fk: number

  @column()
  declare template_name: string

  @column()
  declare template_body: string

  @column()
  declare status: number

  @column()
  declare created_by: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare updated_by: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id_fk',
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => MessageHistory, {
    foreignKey: 'template_id_fk',
  })
  declare messageHistories: HasMany<typeof MessageHistory>
}