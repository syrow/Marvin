import Smtp from "./types/Smtp.js"

export class Adapter{
      private adapter
      constructor(adapter_name: string, config: string) {
          if(adapter_name == "smtp"){
              this.adapter = new Smtp(config)
          }else{
            this.adapter = new Smtp(config)
          }
      }

      async validate_config(){
            return await this.adapter.validate_config()
      }

      async send_mail(body:any){
            return await this.adapter.send_mail(body)
      }
}