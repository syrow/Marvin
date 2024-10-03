import ApiKey from "#models/api_key";
import { error_logs } from "./LogHelper.js";

// User access token chack
export const check_api_key = async (data:any) => {
      const authHeader = data.header('Authorization')

      const key = authHeader.split(' ')[1]
      console.log("token ", key);
      
      try {
            const api_key = await ApiKey.query()
            .where('key', key)
            .where('status', 1)  // Assuming 1 means active
            .firstOrFail()
            if(api_key){
                  return {"status_code": 200, "status": "success", "message": "success", "data": api_key}
            }else{
                  return {"status_code": 401, "status": "permission_denied", "message": "Invalid or expired access token", "data": api_key}
            }
      }catch (error) {
            error_logs("AccessTokenHelper", "check_access_token", error.message)
            return {"status_code": 401, "status": "permission_denied", "message": "Invalid or expired access token", "data": null}
      }
}