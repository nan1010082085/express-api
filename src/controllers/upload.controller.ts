/**
 * @Author Yang (yang dong nan)
 * @Date 2025年2月24日 09:38:48
 * @LastEditorAuthors yangdongnan
 * @LastDate 2025年2月24日 09:38:48
 * @Description 文件 | 图片上传
 */

import { Controller, Post } from '../decorators'
import { Request, Response } from 'express'
import { ApiFile, ApiOperation, ApiPath, ApiResponse } from '../decorators/swagger'
import multer from 'multer'
import process from 'node:process'

const upload = multer({ dest: process.cwd() + '/uploads/' })

interface File {
  path: string // 上传路径
  size: number // 大小
  filename: string // 文件名
  originalname: string // 文件原始名称
  fieldname: string // 字段名
  destination: string // 存储位置
  mimetype: string // 文件格式
  encoding: string //编码
}

@Controller('/upload')
export class UploadController {
  @Post('/file', upload.single('file'))
  // @Validate([check('file').notEmpty()])
  @ApiOperation('上传文件')
  @ApiPath('/upload/file') // Swagger 路径
  @ApiFile('file', true, '上传的文件') // 文件字段名
  @ApiResponse(200, '上传成功')
  @ApiResponse(500, '文件不能为空')
  uploadFile(req: Request & { file: File }, res: Response) {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: '文件不能为空' })
    }
    res.json({ message: 'File uploaded successfully' })
  }

  @Post('/picture', upload.single('file'))
  // @Validate([check('file').notEmpty()])
  @ApiOperation('上传照片')
  @ApiPath('/upload/picture') // Swagger 路径
  @ApiFile('file', true, '上传的文件') // 文件字段名
  @ApiResponse(200, '上传成功')
  @ApiResponse(500, '文件不能为空')
  uploadPicture(req: Request & { file: File }, res: Response) {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: '文件不能为空' })
    }
    res.json({ message: 'File uploaded successfully' })
  }

  @Post('/avatar', upload.single('file'))
  // @Validate([check('file').notEmpty()])
  @ApiOperation('上头像片')
  @ApiPath('/upload/avatar') // Swagger 路径
  @ApiFile('file', true, '上传的文件') // 文件字段名
  @ApiResponse(200, '上传成功')
  @ApiResponse(500, '文件不能为空')
  uploadAvatar(req: Request & { file: File }, res: Response) {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: '文件不能为空' })
    }
    res.json({ message: 'File uploaded successfully' })
  }
}
