import type { HttpContext } from '@adonisjs/core/http'
import { check_access_token } from '../Helpers/AccessTokenHelper.js'
import ApiKey from '#models/api_key'
import { cuid } from '@adonisjs/core/helpers'

export default class KeysController {
      // create user
      public async create({request, response}:HttpContext ){
            const user = await check_access_token(request)
            if(user.status == "success"){
                  const user_id = user.data?.user_id_fk
                  const key = "pk_"+cuid()
                  const query = {
                        user_id_fk: user_id,
                        key: key,
                        status: 1,
                        created_by: user_id
                  }

                  const res = await ApiKey.create(query)
                  if(res.$isPersisted){
                        return response.status(200).json({
                              "status_code":"200", 
                              "status":"success",
                              "message": "Data saved successfully",
                              "key": key
                        })
                  }else{
                        return response.status(400).json({
                              "status_code":"400", 
                              "status":"error",
                              "message": "Something went wrong, Please try again"
                        })
                  }
            }else{
                  return response.status(400).json(user)
            }
      }
}