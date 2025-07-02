import nodemailer from 'nodemailer'
import { error_logs } from '../Helpers/LogHelper.js';

class MailService {
  private transporter: nodemailer.Transporter

  constructor(config: any) {
    this.transporter = nodemailer.createTransport(config)
    console.log("this.transporter ", this.transporter);
    
  }

  async sendMail(mailDetails:any) {
    return this.transporter.sendMail(mailDetails, async function(error, info){
      if(error){
        console.log("error ", error);
        
        await error_logs("Smtp", "send_mail", {error, error_message:error.message });
        throw Error(error.message)
      }else{
        console.log("info ", info);
        
        return info.response
      }
    })
  }
}

export default MailService

