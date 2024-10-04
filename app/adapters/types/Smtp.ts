import vine from '@vinejs/vine'
import { error_logs } from '../../Helpers/LogHelper.js'
import MailService from '#services/mail_service'
import mjml2html from 'mjml'
import MessageHistory from '#models/message_history'
import edge from 'edge.js'
import { cuid } from '@adonisjs/core/helpers'

interface smtp_config {
      host: string,
      port: number,
      encryption: string,
      secure: boolean,
      auth:{
            user: string,
            pass: string,
      }
}

class Smtp{
      private config: smtp_config

      constructor(config:string){
            this.config = JSON.parse(config)
      }


      async validate_config(){
            const data = this.config           
            try{
                  console.log("came tt config", data);
                  
                  const schema = vine.object({
                        host: vine.string(),
                        port: vine.number().withoutDecimals(),
                        encryption: vine.enum(['ssl', 'tls']).optional(),
                        secure: vine.boolean(),
                        auth: vine.object({
                              user: vine.string(),
                              pass: vine.string()
                        })
                  })
                  
                  await vine.validate({ schema, data })
                  return true
            }catch(error){
                  console.log("error in config validation");
                  
                  error_logs("Smtp", "validate_config", {data, error:error.messsage})
                  return false
            }
      }

      async send_mail(body: MessageHistory) {
            try {
              const config = body.config;
              // Function to replace placeholders in the template
            
              // Function to detect template type
              const detectTemplateType = (template: string) => {
                if (template.trim().startsWith('<mjml>') && template.trim().endsWith('</mjml>')) {
                  return 'mjml';
                }
              };
          
              let template_message_body
              if(body.template_id_fk){
                  template_message_body = body.mailTemplate.template_body
              }else{
                  template_message_body = body.body
              }
              
              if (!template_message_body) {
                return { status_code: 404, status: "error", message: 'Template not found', data: null };
              }
              
              let message_body = template_message_body
              if(detectTemplateType(message_body) == 'mjml') {
                  message_body = mjml2html(message_body).html
              }
              const template_body = await edge.renderRaw(message_body, body.template_params)
         
              // Replace placeholders in the template
            let messageId = cuid()
            messageId = messageId+"@syrow.in"
            
              const mailService = new MailService(config);
              const mailDetails = {
                from: body.from_address,
                to: body.to_address,
                cc: body.cc,
                bcc: body.bcc,
                subject: body.subject,
                html: template_body,
                messageId: messageId
              };
          
              const res = await mailService.sendMail(mailDetails);
              console.log("res ", res);
              
              const message_history = await MessageHistory.findByOrFail("hash", body.hash)
              message_history.status = 4
              message_history.message_id = messageId
              await message_history.save()
              return { status_code: 200, status: "success", message: 'Email sent successfully', data: res };
            } catch (error) {
                  console.log("error", error);
                  await error_logs("Smtp", "send_mail", { body, error:error.message });
                  return { status_code: 400, status: "error", message: 'Unable to send mail. Please try again', data: error.message };
            }
      }
}

export default Smtp