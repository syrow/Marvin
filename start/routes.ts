/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import env from '#start/env'
const TestsController = () => import('#controllers/tests_controller')

// router.on('/').render('pages/home')
router.on('/').render('pages/home', {
  base_url: env.get('BASE_URL'),
})

router.post('/test', [TestsController, 'sendEmail'])

import './routes/account.js'

import './routes/key.js'

import './routes/mail.js'
