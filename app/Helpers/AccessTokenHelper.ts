import AccessToken from "#models/access_token";
import { error_logs } from "./LogHelper.js";

// User access token chack
export const check_access_token = async (data:any) => {
      const authHeader = data.header('Authorization')

      const token = authHeader.split(' ')[1]
      console.log("token ", token);
      
      try {
            const accessToken = await AccessToken.query()
            .where('access_token', token)
            .where('status', 1)  // Assuming 1 means active
            .firstOrFail()
            if(accessToken){
                  return {"status_code": 200, "status": "success", "message": "success", "data": accessToken}
            }else{
                  return {"status_code": 401, "status": "permission_denied", "message": "Invalid or expired access token", "data": accessToken}
            }
      }catch (err) {
            error_logs("AccessTokenHelper", "check_access_token", err)
            return {"status_code": 401, "status": "permission_denied", "message": "Invalid or expired access token", "data": null}
      }
}