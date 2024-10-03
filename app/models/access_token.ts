import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'

export default class AccessToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id_fk: number

  @column()
  declare access_token: string

  @column()
  declare status: number
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id_fk',
  })
  declare user: BelongsTo<typeof User>
}