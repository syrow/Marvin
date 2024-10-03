import nodemailer from 'nodemailer'

class MailService {
  private transporter: nodemailer.Transporter

  constructor(config: any) {
    this.transporter = nodemailer.createTransport(config)
  }

  async sendMail(mailDetails:any) {
    return await this.transporter.sendMail(mailDetails)
  }
}

export default MailService
