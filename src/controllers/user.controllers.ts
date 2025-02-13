import { Request, Response } from 'express'
import { Controller, Get, Post } from '../decorators'
import { ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiPath } from '../decorators/swagger'
import { Validate } from '../decorators/validator'
import { PaginationValid } from '../middleware'

@Controller('/users')
export class UserController {
  @Get('/')
  @Validate(PaginationValid())
  @ApiOperation('获取用户列表')
  @ApiPath('/users/')
  @ApiQuery([
    { in: 'query', name: 'page', required: true, description: '页码', schema: { type: 'integer' } },
    { in: 'query', name: 'limit', required: true, description: '每页数量', schema: { type: 'integer' } }
  ])
  @ApiResponse(200, '查询成功')
  getUsers(req: Request, res: Response) {
    res.json([{ id: 1, name: 'Alice' }])
  }

  /**
   * 获取用户详情
   * @param req
   * @param res
   */
  @Get('/get/:id')
  @ApiOperation('获取用户详情')
  @ApiPath('/users/get/{id}')
  @ApiParam([
    {
      name: 'id',
      in: 'path',
      required: true,
      description: '用户id',
      schema: { type: 'string' }
    }
  ])
  @ApiResponse(200, '查询成功')
  getUser(req: Request, res: Response) {
    console.log(req.path)
    res.json({ id: req.params.id, name: 'Alice' })
  }

  /***
   * 创建新用户
   */
  @Post('/create')
  @ApiOperation('创建用户')
  @ApiPath('/users/create')
  @ApiBody({
    description: '用户信息',
    content: {
      username: { schema: { type: 'string', description: '用户名' } },
      password: { schema: { type: 'string', description: '密码' } }
    },
    required: true
  })
  @ApiResponse(200, '创建成功')
  createUser(req: Request, res: Response) {
    console.log(req)

    res.status(201).json({ id: 2, ...req.body })
  }
}
