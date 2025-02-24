/**
 * @Author Yang (yang dong nan)
 * @Date 2025年2月24日 09:39:28
 * @LastEditorAuthors yangdongnan
 * @LastDate 2025年2月24日 09:39:28
 * @Description 登陆
 */

import { Request, Response } from 'express'
import { Controller, Post } from '../decorators'
import { ApiBody, ApiOperation, ApiPath, ApiResponse } from '../decorators/swagger'
import { Validate } from '../decorators/validator'
import { body } from 'express-validator'

@Controller('/login')
export class LoginController {
  @Post('/sign')
  @Validate([body('username').notEmpty(), body('password').notEmpty(), body('code').notEmpty()])
  @ApiOperation('登陆')
  @ApiPath('/login/sign')
  @ApiBody([
    { name: 'username', type: 'string', description: '用户名', required: true },
    { name: 'password', type: 'string', description: '密码', required: true },
    { name: 'code', type: 'string', description: '验证码', required: true }
  ])
  @ApiResponse(200, '成功')
  sign(req: Request, res: Response) {
    console.log(req.body)
    res.json({ msg: 'login success' })
  }

  @Post('/out')
  @Validate([body('userId').notEmpty()])
  @ApiOperation('登出')
  @ApiPath('/login/out')
  @ApiBody([{ name: 'userId', type: 'string', description: '用户名ID', required: true }])
  @ApiResponse(200, '成功')
  out(req: Request, res: Response) {
    console.log(req.body)

    res.json({ msg: 'logout success' })
  }
}
