import vine from '@vinejs/vine'

const mail_data_validator = vine.compile(
  vine.object({
    to: vine.array(
      vine.string()
    ),
    from: vine.string().trim(),
    cc: vine.array(vine.string().email().trim()).optional(),
    bcc: vine.array(vine.string().email().trim()).optional(),
    // headers: vine.object({}).allowUnknownProperties().optional(),
    template_identifier: vine.string().optional().requiredWhen("template_body", "=", ""),
    template_body: vine.string().trim().optional().requiredIfMissing("template_identifier"),
    template_params: vine.object({}).allowUnknownProperties().optional(),
    attachments: vine.array(    
        // URL-based attachment
        vine.object({
          url: vine.string().trim().url(),
          filename: vine.string().trim().optional().requiredWhen('disposition', '=', 'attachment'),
          cid: vine.string().trim().optional().requiredWhen('disposition', '=', 'inline'),
          disposition: vine.enum(['attachment', 'inline']).optional()
        })
    ).optional(),
    subject: vine.string().trim(),
    reply_to: vine.string().trim().email().optional(),
    priority: vine.enum(['low', 'medium', 'high']).optional(),
    retry: vine.number(),
    mail_provider: vine.enum(['smtp']),
    config: vine.object({}).allowUnknownProperties()
  })
)


export default mail_data_validator