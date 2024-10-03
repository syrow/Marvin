import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { error_logs } from '../Helpers/LogHelper.js'
import create_user_validator from '#validators/account'
import AccessToken from '#models/access_token'
import string from '@adonisjs/core/helpers/string'
import { log } from 'console'

export default class AccountsController {
      // create user
      public async create({request, response}:HttpContext ){
            try{
                  log("came here")
                  const body = await request.validateUsing(create_user_validator)

                  const check_duplicate = await User.query().where("email", body.email).andWhere("status", 1).first()
                  if(check_duplicate){
                        return response.status(400).json({
                              "status_code":"400", 
                              "status":"duplicate",
                              "message": "User already existed"
                        })
                  }

                  const query = {
                        name: body.name,
                        email: body.email,
                        phone_number: body.phone_number,
                        status: 1
                  }
                  const res = await User.create(query)
                  const access_token = string.random(50)
                  await AccessToken.create({
                        user_id_fk: res.id,
                        access_token: access_token,
                        status: 1
                  })

                  if(res.$isPersisted){
                        return response.status(200).json({
                              "status_code":"200", 
                              "status":"success",
                              "message": "Data saved successfully"
                        })
                  }else{
                        return response.status(400).json({
                              "status_code":"400", 
                              "status":"error",
                              "message": "Something went wrong, Please try again"
                        })
                  }
            }catch(error){
                  error_logs("accounts_controller", "create", error)
                  return response.status(400).json({
                        "status_code":"400", 
                        "status":"error",
                        "message": "Something went wrong, Please try again",
                        "data": error
                  })
            }
      }

}