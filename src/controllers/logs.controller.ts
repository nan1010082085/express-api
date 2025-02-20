import { Controller, Get } from '../decorators'
import { Request, Response } from 'express'
import { ApiOperation, ApiParam, ApiPath, ApiResponse } from '../decorators/swagger'
import { Validate } from '../decorators/validator'
import { PaginationValid } from '../middleware'

@Controller('/logs')
export class LogsController {
  @Get('/users')
  @Validate(PaginationValid())
  @ApiOperation('获取用户日志')
  @ApiPath('/logs/users')
  @ApiParam([
    { in: 'query', name: 'page', required: true, description: '页码', schema: { type: 'integer' } },
    { in: 'query', name: 'limit', required: true, description: '每页数量', schema: { type: 'integer' } }
  ])
  @ApiResponse(200, '获取用户日志成功', { type: 'array', items: { type: 'string' } })
  getLogs(req: Request, res: Response) {
    res.json('get users logs')
  }
}
