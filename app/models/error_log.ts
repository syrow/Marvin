import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ErrorLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare error_filename: string

  @column()
  declare function_name: string

  @column()
  declare error_message: string


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}