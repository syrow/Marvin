const MailController = () => import('#controllers/mail_controller')
import router from '@adonisjs/core/services/router'

router.group(()=>{
      router.group(()=>{
            router.get("/", [MailController, "get"])
            
            router.post("/", [MailController, "create"])

            router.put("/:id", [MailController, "update"])

            router.post("send", [MailController, "send_mail_queue"])

            router.post("send_mail", [MailController, "send_mail"])
      }).prefix("mail")

}).prefix("/api/v1/")