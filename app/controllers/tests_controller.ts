import MailService from '#services/mail_service'
import type { HttpContext } from '@adonisjs/core/http'
import mjml from 'mjml'

export default class TestsController {
  public async sendEmail({ request, response }: HttpContext) {
      const request_data = {
            "email": "ganguchimmad@gmail.com",
            "url": "http://localhost:3335/test"
      }

      edge.renderRawSync(, { username: 'virk' })

      const html_data = mjml(textView('email/verify_email_html', request_data)).html
      const body = {
            config: {
            host: 'syrow.com',
            port: 465,
            secure: true,
            auth: {
            user: 'gangappa.c@syrow.in',
            pass: 'Sy4Jb2$8kcM',
            },
            },

            mailDetails: {
            from: 'gangappa.c@syrow.in',
            to: 'ganguchimmad@gmail.com',
            subject: 'Hello',
            text: 'Hello world? my text',
            html: html_data
            },
      }
      const config = body.config

      const mailDetails = body.mailDetails

      const mailService = new MailService(config)
      console.log('mailService ', mailService)

      try {
            const res = await mailService.sendMail(mailDetails)
            return res
            return response.status(200).json({ message: 'Email sent successfully' })
      } catch (error) {
            return response.status(500).json({ error: 'Failed to send email', details: error.message })
      }
  }
}
