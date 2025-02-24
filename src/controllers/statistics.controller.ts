/**
 * @Author Yang (yang dong nan)
 * @Date 2025年2月24日 09:38:16
 * @LastEditorAuthors yangdongnan
 * @LastDate 2025年2月24日 09:38:16
 * @Description 统计
 */

import { Controller, Get } from '../decorators'
import { ApiOperation, ApiParam, ApiPath, ApiResponse } from '../decorators/swagger'
import { Validate } from '../decorators/validator'
import { PaginationValid } from '../middleware'
import { Request, Response } from 'express'

@Controller('stat')
export class StatisticsController {
  @Get('/login')
  @Validate(PaginationValid())
  @ApiOperation('登录统计')
  @ApiPath('/stat/login')
  @ApiParam([
    { in: 'query', name: 'page', required: true, description: '页码', schema: { type: 'integer' } },
    { in: 'query', name: 'limit', required: true, description: '每页数量', schema: { type: 'integer' } }
  ])
  @ApiResponse(200, 'success', {})
  @ApiResponse(500, '获取登录统计失败')
  getLoginStat(req: Request, res: Response) {
    res.json({
      data: [],
      total: 100,
      page: 1,
      pageSize: 10
    })
  }

  @Get('/users')
  @Validate(PaginationValid())
  @ApiOperation('用户统计')
  @ApiPath('/stat/users')
  @ApiParam([
    { in: 'query', name: 'page', required: true, description: '页码', schema: { type: 'integer' } },
    { in: 'query', name: 'limit', required: true, description: '每页数量', schema: { type: 'integer' } }
  ])
  @ApiResponse(200, 'success', {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: '用户ID'
            },
            name: {
              type: 'string',
              description: '用户名'
            },
            age: {
              type: 'number',
              description: '年龄'
            }
          }
        }
      },
      total: {
        type: 'number',
        description: '总记录数'
      },
      page: {
        type: 'number',
        description: '当前页码'
      },
      pageSize: {
        type: 'number'
      }
    }
  })
  @ApiResponse(500, '获取用户统计失败')
  getUserStat(req: Request, res: Response) {
    res.json({
      data: [],
      total: 100,
      page: 1,
      pageSize: 10
    })
  }
}
