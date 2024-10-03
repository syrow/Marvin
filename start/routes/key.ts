import KeysController from '#controllers/keys_controller'
import router from '@adonisjs/core/services/router'
// import { middleware } from '#start/kernel'

router.group(()=>{
      router.group(()=>{
            router.post("/", [KeysController, 'create'])
      }).prefix("key")

}).prefix("/api/v1/")
