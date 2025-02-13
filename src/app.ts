import express, { type Request, type Response } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import swagger from './plugins/swagger'
import useRoutes from './routes'
dotenv.config()

const app = express()
app.use(express.json())
// 跨域
app.use(cors())
// 日志
app.use(morgan('dev'))

// route
useRoutes(app)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! express + TypeScript')
})

// swagger
swagger(app)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

