import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import AccessToken  from '#models/access_token'

class AuthenticationError extends Error {
  constructor(message: string, public status: number = 401) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export default class AccessTokenMiddleware {    
  async handle(ctx: HttpContext, next: NextFn) {
    console.log("entered here");
    const authHeader = ctx.request.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Unauthorized access')
    }

    const token = authHeader.split(' ')[1]
    console.log("token ", token);
    
    try {
      const accessToken = await AccessToken.query()
        .where('access_token', token)
        .where('status', 1)  // Assuming 1 means active
        .firstOrFail()
            
      // Attach the user_id to the request
      ctx.request.updateBody({ user_id: accessToken.user_id_fk })

      // You can also attach the entire user object if needed
      // const user = await accessToken.related('user').query().firstOrFail()
      // ctx.request.updateBody({ user })

      // Proceed to the next middleware or route handler
      
      await next()
    } catch (error) {
      return ctx.response.status(401).json({
        "status_code":"401", 
        "status":"permission_denied",
        "message": "Invalid or expired access token",
        "data": error
      })
    }
    await next()
  }
}