// Swagger 配置
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { generateSwaggerPaths } from '../utils/swagger-generator'
import { Express, Request, Response } from 'express'
import { controllers } from '../routes'

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API 文档',
      version: '1.0.0',
      description: '基于 Express 的通用 API'
    },
    paths: generateSwaggerPaths(controllers)
  },
  apis: []
  // apis: ['./src/**/*.controller.ts'] // 指定路由文件路径
}
const swaggerSpec = swaggerJsdoc(swaggerOptions)

export default (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/swagger.json', (req: Request, res: Response) => res.json(swaggerSpec))
}
