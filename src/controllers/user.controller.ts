import { Request, Response } from 'express'
import { Controller, Get, Post, Put } from '../decorators'
import { ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiPath } from '../decorators/swagger'
import { Validate } from '../decorators/validator'
import { PaginationValid } from '../middleware'
import { body } from 'express-validator'

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
  @Validate([body('username').notEmpty(), body('password').notEmpty()])
  @ApiOperation('创建用户')
  @ApiPath('/users/create')
  @ApiBody([
    { name: 'username', type: 'string', description: '用户名' },
    { name: 'password', type: 'string', description: '密码' }
  ])
  @ApiResponse(200, '创建成功')
  createUser(req: Request, res: Response) {
    console.log(req)
    res.status(201).json({ id: 2, ...req.body })
  }

  /**
   * 更新用户
   */
  @Put('/update')
  @Validate([body('userId').notEmpty(), body('username').notEmpty()])  
  @ApiOperation('更新用户')
  @ApiPath('/users/update')
  @ApiBody([
    { name: 'userId', type: 'string', description: '用户id', required: true },
    { name: 'username', type: 'string', description: '用户名', required: true },
    { name: 'sex', type: 'string', description: '性别' },
    { name: 'email', type: 'string', description: '邮箱' },
    { name: 'phone', type: 'string', description: '手机号' },
  ])
  @ApiResponse(200, '更新成功')
  @ApiResponse(500, '更新失败')
  updateUser(req: Request, res: Response) {
    if(!req.body?.id) return res.status(500).json({ msg: '更新失败' })
    res.json({ id: req.body.id, ...req.body })
  }
}
