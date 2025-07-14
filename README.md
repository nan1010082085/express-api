# Express TypeScript API

一个基于 Express 和 TypeScript 构建的现代化 RESTful API 项目，集成了 Swagger 文档、单元测试、文件上传等功能。

## 🚀 特性

- ✨ **TypeScript** - 类型安全的开发体验
- 🎯 **装饰器模式** - 优雅的路由和控制器定义
- 📚 **Swagger 集成** - 自动生成 API 文档
- 🧪 **完整测试** - 基于 Vitest 的单元测试和覆盖率报告
- 📁 **文件上传** - 支持多种文件类型上传
- 🔐 **用户管理** - 完整的用户 CRUD 操作
- 📊 **日志统计** - 系统日志和统计功能
- 🔄 **热重载** - 开发环境自动重启

## 🛠️ 技术栈

### 核心框架
- **Express.js** - Web 应用框架
- **TypeScript** - 类型安全的 JavaScript
- **Reflect Metadata** - 装饰器元数据支持

### 开发工具
- **TSX** - TypeScript 执行器
- **Vitest** - 现代化测试框架
- **Supertest** - HTTP 断言测试
- **Morgan** - HTTP 请求日志中间件
- **CORS** - 跨域资源共享

### 文档和验证
- **Swagger UI Express** - API 文档界面
- **Swagger JSDoc** - API 文档生成
- **Express Validator** - 请求参数验证

### 文件处理
- **Multer** - 文件上传中间件

## 📦 安装

### 环境要求
- Node.js >= 16.0.0
- pnpm >= 7.0.0

### 克隆项目
```bash
git clone <repository-url>
cd express-ts
```

### 安装依赖
```bash
pnpm install
```

### 环境配置
创建 `.env` 文件（可选）：
```env
PORT=3000
NODE_ENV=development
```

## 🚀 运行项目

### 开发模式
```bash
pnpm dev
```

### 生产构建
```bash
pnpm build
pnpm start
```

### 访问地址
- **API 服务**: http://localhost:3000
- **Swagger 文档**: http://localhost:3000/api-docs

## 🧪 测试

### 运行所有测试
```bash
pnpm test:run
```

### 监听模式测试
```bash
pnpm test
```

### 测试覆盖率
```bash
pnpm test:coverage
```

### 测试 UI 界面
```bash
pnpm test:ui
```

## 📚 API 文档

### 用户管理 API

#### 获取用户列表
```http
GET /users/
```

#### 获取用户详情
```http
GET /users/get/:id
```

#### 创建用户
```http
POST /users/create
Content-Type: application/json

{
  "name": "用户名",
  "email": "user@example.com",
  "age": 25
}
```

#### 更新用户
```http
PUT /users/update
Content-Type: application/json

{
  "userId": "1",
  "name": "新用户名",
  "email": "newemail@example.com",
  "age": 26
}
```

### 文件上传 API

#### 上传文件
```http
POST /upload/file
Content-Type: multipart/form-data

file: <文件>
```

#### 上传图片
```http
POST /upload/picture
Content-Type: multipart/form-data

file: <图片文件>
```

#### 上传头像
```http
POST /upload/avatar
Content-Type: multipart/form-data

file: <头像文件>
```

### 登录认证 API

#### 用户登录
```http
POST /login/sign
Content-Type: application/json

{
  "username": "用户名",
  "password": "密码"
}
```

#### 用户登出
```http
POST /login/out
```

### 日志统计 API

#### 获取登录日志
```http
GET /logs/login
```

#### 获取用户日志
```http
GET /logs/users
```

#### 获取上传日志
```http
GET /logs/upload
```

#### 获取统计数据
```http
GET /logs/stat
```

## 🏗️ 项目结构

```
src/
├── app.ts                 # 应用入口文件
├── controllers/           # 控制器目录
│   ├── login.controller.ts    # 登录控制器
│   ├── user.controller.ts     # 用户控制器
│   ├── upload.controller.ts   # 文件上传控制器
│   ├── logs.controller.ts     # 日志控制器
│   └── statistics.controller.ts # 统计控制器
├── decorators/            # 装饰器目录
│   ├── index.ts              # 路由装饰器
│   ├── swagger.ts            # Swagger 装饰器
│   └── validator.ts          # 验证装饰器
├── middleware/            # 中间件目录
│   └── index.ts
├── plugins/               # 插件目录
│   └── swagger.ts            # Swagger 配置
├── routes/                # 路由目录
│   └── index.ts              # 路由注册
├── utils/                 # 工具函数
│   └── swagger-generator.ts
└── types.d.ts             # 类型定义

tests/                     # 测试目录
├── setup.ts               # 测试配置
├── app.test.ts            # 应用测试
├── user.controller.test.ts # 用户控制器测试
├── upload.controller.test.ts # 文件上传测试
└── login.controller.test.ts # 登录控制器测试
```

## 🎯 装饰器使用

### 控制器装饰器
```typescript
@Controller('/users')
export class UserController {
  @Get('/')
  @ApiOperation('获取用户列表')
  @ApiResponse(200, '获取成功')
  getUsers(req: Request, res: Response) {
    // 控制器逻辑
  }
}
```

### 路由装饰器
- `@Get(path)` - GET 请求
- `@Post(path)` - POST 请求
- `@Put(path)` - PUT 请求
- `@Delete(path)` - DELETE 请求

### Swagger 装饰器
- `@ApiOperation(summary)` - 操作描述
- `@ApiPath(path)` - API 路径
- `@ApiResponse(code, description)` - 响应描述
- `@ApiFile(fieldName, required, description)` - 文件上传字段

### 验证装饰器
```typescript
@Post('/create')
@Validate([
  check('name').notEmpty().withMessage('姓名不能为空'),
  check('email').isEmail().withMessage('邮箱格式不正确')
])
createUser(req: Request, res: Response) {
  // 控制器逻辑
}
```

## 📝 开发指南

### 添加新的控制器

1. 在 `src/controllers/` 目录下创建新的控制器文件
2. 使用装饰器定义路由和验证规则
3. 在 `src/routes/index.ts` 中注册控制器
4. 编写对应的测试文件

### 文件上传配置

文件上传使用 Multer 中间件，默认存储在 `uploads/` 目录下。可以通过修改 `upload.controller.ts` 中的配置来自定义存储路径和文件处理逻辑。

### 测试编写

使用 Vitest 和 Supertest 编写测试：

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { createTestApp } from './setup';

describe('UserController', () => {
  let app: any;

  beforeEach(async () => {
    app = await createTestApp();
  });

  it('应该获取用户列表', async () => {
    const response = await request(app)
      .get('/users/')
      .expect(200);

    expect(response.body).toBeDefined();
  });
});
```

## 🔧 配置说明

### TypeScript 配置
项目使用 `typeconfig.json` 进行 TypeScript 配置，启用了装饰器支持和严格模式。

### Vitest 配置
测试配置在 `vitest.config.ts` 中，包含覆盖率报告、测试超时等设置。

### Swagger 配置
Swagger 文档自动生成，访问 `/api-docs` 查看完整的 API 文档。

## 📄 许可证

ISC License

## 👨‍💻 作者

yangdongnan

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如果您在使用过程中遇到问题，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至项目维护者

---

**Happy Coding! 🎉**