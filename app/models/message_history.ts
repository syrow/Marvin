import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import MailTemplate from './mail_template.js'

export default class MessageHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare hash: string

  @column()
  declare template_id_fk: number

  @column()
  declare from_address: string

  @column()
  declare to_address: string

  @column()
  declare cc: string

  @column()
  declare bcc: string
  
  @column()
  declare template_params: string|any

  @column()
  declare subject: string

  @column()
  declare body: string
  
  @column()
  declare reply_to: string

  @column()
  declare message_id: string

  @column()
  declare mail_provider: string

  @column()
  declare priority: number

  @column()
  declare retry: number  
  
  @column()
  declare config: string 

  @column()
  declare status: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => MailTemplate, {
    foreignKey: 'template_id_fk',
  })
  declare mailTemplate: BelongsTo<typeof MailTemplate>
}