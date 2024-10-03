import vine from '@vinejs/vine'

const create_user_validator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine.string().trim().email(),
    phone_number: vine.string().trim()
  })
)

export default create_user_validator