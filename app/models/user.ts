import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import ApiKey from './api_key.js'
import AccessToken from './access_token.js'
import MailTemplate from './mail_template.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare phone_number: string

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

  @hasMany(() => ApiKey, {
    foreignKey: 'user_id_fk',
  })
  declare apiKeys: HasMany<typeof ApiKey>

  @hasMany(() => AccessToken, {
    foreignKey: 'user_id_fk',
  })
  declare accessTokens: HasMany<typeof AccessToken>

  @hasMany(() => MailTemplate, {
    foreignKey: 'user_id_fk',
  })
  declare mailTemplates: HasMany<typeof MailTemplate>
}