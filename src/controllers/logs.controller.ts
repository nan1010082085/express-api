/**
 * @Author Yang (yang dong nan)
 * @Date 2025年2月24日 09:38:32
 * @LastEditorAuthors yangdongnan
 * @LastDate 2025年2月24日 09:38:32
 * @Description 日志
 */

import { Controller, Get } from '../decorators'
import { Request, Response } from 'express'
import { ApiOperation, ApiParam, ApiPath, ApiResponse } from '../decorators/swagger'
import { Validate } from '../decorators/validator'
import { PaginationValid } from '../middleware'

@Controller('/logs')
export class LogsController {
  @Get('login')
  @Validate(PaginationValid())
  @ApiOperation('登录日志')
  @ApiPath('/logs/login')
  @ApiParam([
    { in: 'query', name: 'page', required: true, description: '页码', schema: { type: 'integer' } },
    { in: 'query', name: 'limit', required: true, description: '每页数量', schema: { type: 'integer' } }
  ])
  @ApiResponse(200, '获取登录日志成功',{ type: 'array', items: { type: 'string' } })  
  getLoginLogs(req: Request, res: Response) {
    res.json('get login logs')
  }

  /**
   * 用户日志
   */
  @Get('/users')
  @Validate(PaginationValid())
  @ApiOperation('获取用户日志')
  @ApiPath('/logs/users')
  @ApiParam([
    { in: 'query', name: 'page', required: true, description: '页码', schema: { type: 'integer' } },
    { in: 'query', name: 'limit', required: true, description: '每页数量', schema: { type: 'integer' } }
  ])
  @ApiResponse(200, '获取用户日志成功', { type: 'array', items: { type: 'string' } })
  getUsersLogs(req: Request, res: Response) {
    res.json('get users logs')
  }

  /**
   * 文件上传日志
   */
  @Get('upload')
  @Validate(PaginationValid())
  @ApiOperation('文件上传日志')
  @ApiPath('/logs/upload')
  @ApiParam([
    { in: 'query', name: 'page', required: true, description: '页码', schema: { type: 'integer' } },
    { in: 'query', name: 'limit', required: true, description: '每页数量', schema: { type: 'integer' } }
  ])
  @ApiResponse(200, '获取文件上传日志成功', { type: 'array', items: { type: 'string' } })
  getUploadLogs(req: Request, res: Response) {
    res.json('get upload logs')
  }
}
