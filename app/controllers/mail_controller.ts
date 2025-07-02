import type { HttpContext } from '@adonisjs/core/http'
import { check_api_key } from '../Helpers/ApiKeyHelper.js'
import mail_data_validator from '#validators/check_send_mail'
import { Adapter } from '../adapters/Adapter.js'
import { check_access_token } from '../Helpers/AccessTokenHelper.js'
import { error_logs } from '../Helpers/LogHelper.js'
import MailTemplate from '#models/mail_template'
import MessageHistory from '#models/message_history'
import { cuid } from '@adonisjs/core/helpers'
import { HistoryStatus } from '../types/mail_types.js'
import { get_template_body } from '../Helpers/MailHelper.js'

export default class MailController {
  // get templates
  public async get({ request, response }: HttpContext) {
    const user = await check_access_token(request)
    if (user.status === 'success') {
      try {
        const templates = await MailTemplate.query()
          .andWhere('status', 1)

        return response.status(200).json({
          status_code: '200',
          status: 'success',
          message: 'Data fetched successfully',
          data: templates,
        })
      } catch (error) {
        error_logs('accounts_controller', 'create', { error: error.message })
        return error
      }
    } else {
      return response.status(400).json(user)
    }
  }

  // create template
  public async create({ request, response }: HttpContext) {
    const user = await check_access_token(request)
    if (user.status === 'success') {
      try {
        const user_id = user.data?.user_id_fk || null
        const template_name = request.input('template_name')
        const template_body = request.input('template_body')
        const check_duplicate = await MailTemplate.query()
          .where('template_name', template_name)
          .andWhere('user_id_fk', user_id!)
          .andWhere('status', 1)
          .first()
        if (check_duplicate) {
          return response.status(400).json({
            status_code: '400',
            status: 'duplicate',
            message: 'Template already existed',
          })
        } else {
          const query = {
            hash: cuid(),
            user_id_fk: user_id!,
            template_name: template_name,
            template_body: template_body,
            status: 1,
            created_by: user_id!,
          }

          const res = await MailTemplate.create(query)
          if (res.$isPersisted) {
            return response.status(200).json({
              status_code: '200',
              status: 'success',
              message: 'Data saved successfully',
              data: res,
            })
          } else {
            return response.status(400).json({
              status_code: '400',
              status: 'error',
              message: 'Something went wrong, Please try again',
            })
          }
        }
      } catch (error) {
        error_logs('accounts_controller', 'create', { error: error.message })
        return error
      }
    } else {
      return response.status(400).json(user)
    }
  }

  // edit template
  public async update({ request, params, response }: HttpContext) {
    const user = await check_access_token(request)
    if (user.status === 'success') {
      // try {
        const user_id = user.data?.user_id_fk || null
        const template_id = params.id
        const template_name = request.input('template_name')
        const template_body = request.input('template_body')
       
        const check_duplicate = await MailTemplate.query()
          .where('template_name', template_name)
          .andWhere('user_id_fk', user_id!)
          .andWhereNot('id', template_id)
          .andWhere('status', 1)
          .first()
   
        if (check_duplicate) {
          return response.status(400).json({
            status_code: '400',
            status: 'duplicate',
            message: 'Template already existed',
          })
        } else {
          const template = await MailTemplate.findByOrFail("id", template_id)
          
          if (template) {
            if(template_name){
              template.template_name = template_name
            }

            if (template_body) {
              template.template_body = template_body
            }

            const res = await template.save()
            if (res.$isPersisted) {
              return response.status(200).json({
                status_code: '200',
                status: 'success',
                message: 'Data saved successfully',
                data: res,
              })
            } else {
              return response.status(400).json({
                status_code: '400',
                status: 'error',
                message: 'Something went wrong, Please try again',
              })
            }
          }else{
            return response.status(400).json({
              status_code: '400',
              status: 'error',
              message: 'Unable to find template',
            })
          }
        }
      // } catch (error) {
      //   error_logs('accounts_controller', 'create', { error: error.message })
      //   return response.status(400).json({
      //     status_code: '400',
      //     status: 'error',
      //     message: 'Something went wrong, Please try again',
      //     "error": error
      //   })
      // }
    } else {
      return response.status(400).json(user)
    }
  }

  // send mail to queue
  public async send_mail_queue({ request, response }: HttpContext) {
    const user = await check_api_key(request)
    if (user.status === 'success') {
      try {
        let body = await mail_data_validator.validate(request.all())
        const to = body.to
        let template_params:any = body.template_params

        let template_id = null
        if (body.template_identifier) {
          const template = await MailTemplate.query()
            .where('hash', body.template_identifier)
            .andWhere('status', 1)
            .select('id')
            .first()

          if (template) {
            template_id = template.id
          }else{
            return response
              .status(400)
              .json({ status_code: 400, status: 'error', message: 'Mail template not found' })
          }
        }
              
        let message_ids:any = []
        for(let item of to){
                    
          template_params["user_email"] = item
          let query: any = {
              hash: cuid(),
              template_id_fk: template_id,
              from_address: body.from,
              to_address: JSON.stringify([item]),
              template_params: JSON.stringify(template_params),
              
              subject: body.subject,
              body: body.template_body || null,
              reply_to: body.reply_to || null,
              priority: body.priority,
              retry: body.retry,
              mail_provider: body.mail_provider,
              config: JSON.stringify(body.config),
              status: 1,
          }

          if(body.cc && body.cc.length > 0){
            query['cc'] = JSON.stringify(body.cc)
          }

          if(body.bcc && body.bcc.length > 0){
            query['bcc'] = JSON.stringify(body.bcc)
          }

          if(body.attachments && body.attachments.length > 0){
            query['attachments'] = JSON.stringify(body.attachments)
          }
          

          const res = await MessageHistory.create(query)
          if (res.$isPersisted) {
            let message_body = {
              hash: res.hash            
            }

            message_ids = [...message_ids, res.hash]
            // Send to the queue
            this.send_mail_adapter(message_body)

            await MessageHistory.query().where('id', res.id).update({ status: 2 })
          }
        }

        if(message_ids.length > 0 ){
          return response.status(200).json({
            status_code: 200,
            status: 'success',
            message: 'Mail accepted successfully',
            data: {
              message_id: message_ids,
            },
          })
        }else{
          return response
          .status(400)
          .json({
            status_code: 400,
            status: 'error',
            message: 'Error while inserting message history, Please try agaian',
          })
        }
      } catch (error) {
        await error_logs('mail_controller', 'send_mail_queue', { error: error.message })
        return response
          .status(400)
          .json({
            status_code: 400,
            status: 'error',
            message: 'Something went wrong',
            data: error.message,
          })
      }
    } else {
      return response.status(400).json(user)
    }
  }

  // send mail
  public async send_mail({ request, response }: HttpContext) {
    try {
      const body = request.body()
      
      const message_history = await get_template_body(body.hash)
                 
      if(message_history){        
        if(message_history!.status === HistoryStatus.Completed) {
            throw new Error("Message already sent")
        }else{
              const adapter = new Adapter(message_history.mail_provider, JSON.stringify(message_history.config))
              const check_config = await adapter.validate_config()
              if(check_config){
                const result = await adapter.send_mail(message_history)
                return response.status(200).json(result)
              }else{
                throw new Error("invalid config")
              }
        }
      }else{
        throw new Error("invalid message hash")
      }
    } catch (error) {
      await error_logs('mail_controller', 'send_mail', { error: error.message })
      return response
        .status(400)
        .json({
          status_code: 400,
          status: 'error',
          message: 'Something went wrong',
          data: error.message,
        })
    }
  }

  public async send_mail_adapter(body: { hash: any }) {
    try {
      const message_history = await get_template_body(body.hash)
                 
      if(message_history){        
        if(message_history!.status === HistoryStatus.Completed) {
            throw new Error("Message already sent")
        }else{
              const adapter = new Adapter(message_history.mail_provider, JSON.stringify(message_history.config))
              const check_config = await adapter.validate_config()
              if(check_config){
                const result = await adapter.send_mail(message_history)
                return result
              }else{
                throw new Error("invalid config")
              }
        }
      }else{
        throw new Error("invalid message hash")
      }
    } catch (error) {
      await error_logs('mail_controller', 'send_mail', { error: error.message })
      return {
          status_code: 400,
          status: 'error',
          message: 'Something went wrong',
          data: error.message,
        }
    }
  }
}
