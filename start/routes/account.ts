import AccountsController from '#controllers/accounts_controller'
import router from '@adonisjs/core/services/router'

// router.post('/').).prefix("account")
router.group(()=>{
      router.group(()=>{
            router.post('/create', [AccountsController, 'create'])
      }).prefix("account")
      
}).prefix("/api/v1/")