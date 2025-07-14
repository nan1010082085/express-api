# 测试文档

本项目使用 [Vitest](https://vitest.dev/) 作为测试框架，提供快速、现代的单元测试和集成测试解决方案。

## 📁 测试文件结构

```
tests/
├── README.md                 # 测试文档
├── setup.ts                  # 测试环境配置和工具函数
├── example.test.ts           # Vitest 使用示例
├── app.test.ts              # 应用集成测试
├── user.controller.test.ts   # 用户控制器测试
├── login.controller.test.ts  # 登录控制器测试
└── upload.controller.test.ts # 文件上传控制器测试
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 以监听模式运行测试
pnpm test:watch

# 运行测试一次（CI模式）
pnpm test:run

# 启动测试UI界面
pnpm test:ui
```

## 📋 测试脚本说明

| 命令 | 描述 |
|------|------|
| `pnpm test` | 以监听模式运行测试，文件变化时自动重新运行 |
| `pnpm test:run` | 运行所有测试一次，适用于CI/CD环境 |
| `pnpm test:ui` | 启动Vitest的Web UI界面，提供可视化测试体验 |
| `pnpm test:coverage` | 运行测试并生成代码覆盖率报告 |
| `pnpm test:watch` | 明确指定监听模式运行测试 |

## 🛠️ 测试配置

测试配置位于 `vitest.config.ts` 文件中，主要配置包括：

- **测试环境**: Node.js 环境
- **全局API**: 启用全局测试API（describe, it, expect等）
- **文件匹配**: `**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`
- **覆盖率**: 使用 v8 提供商，支持文本、JSON、HTML格式报告
- **路径别名**: `@` 指向 `./src` 目录

## 📝 编写测试

### 基本测试结构

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('功能模块名称', () => {
  beforeEach(() => {
    // 每个测试前的设置
  });

  it('应该做某件事', () => {
    // 测试逻辑
    expect(actual).toBe(expected);
  });
});
```

### API测试示例

```typescript
import request from 'supertest';
import { createTestApp } from './setup';

describe('API测试', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('应该返回用户列表', async () => {
    const response = await request(app)
      .get('/users')
      .query({ page: 1, limit: 10 })
      .expect(200);

    expect(response.body).toEqual([{ id: 1, name: 'Alice' }]);
  });
});
```

### 文件上传测试示例

```typescript
import path from 'path';
import fs from 'fs';

it('应该成功上传文件', async () => {
  const testFilePath = path.join(__dirname, 'test.txt');
  fs.writeFileSync(testFilePath, 'test content');
  
  try {
    const response = await request(app)
      .post('/upload/file')
      .attach('file', testFilePath)
      .expect(200);

    expect(response.body.message).toBe('File uploaded successfully');
  } finally {
    fs.unlinkSync(testFilePath);
  }
});
```

## 🔧 测试工具

### 测试应用创建

使用 `createTestApp()` 函数创建测试用的Express应用实例：

```typescript
import { createTestApp } from './setup';

const app = createTestApp();
```

### 测试数据工厂

使用 `TestDataFactory` 创建测试数据：

```typescript
import { TestDataFactory } from './setup';

const userData = TestDataFactory.createUserData();
const updateData = TestDataFactory.createUpdateUserData();
```

### 测试工具函数

使用 `TestUtils` 提供的工具函数：

```typescript
import { TestUtils } from './setup';

// 延迟执行
await TestUtils.delay(1000);

// 生成随机字符串
const randomStr = TestUtils.randomString(8);
```

## 📊 覆盖率报告

运行 `pnpm test:coverage` 后，覆盖率报告将生成在 `coverage/` 目录中：

- `coverage/index.html` - HTML格式的可视化报告
- `coverage/coverage-final.json` - JSON格式的详细数据
- 终端输出文本格式的摘要报告

## 🎯 最佳实践

### 1. 测试命名
- 使用描述性的测试名称
- 遵循 "应该..." 的命名模式
- 使用中文描述更清晰的业务逻辑

### 2. 测试组织
- 使用 `describe` 对相关测试进行分组
- 每个控制器/模块对应一个测试文件
- 使用 `beforeEach`/`afterEach` 进行测试环境的设置和清理

### 3. 断言选择
- 使用最具体的断言方法
- `toBe()` 用于基本类型比较
- `toEqual()` 用于对象/数组比较
- `toContain()` 用于数组/字符串包含检查

### 4. 异步测试
- 使用 `async/await` 处理异步操作
- 使用 `resolves`/`rejects` 测试Promise
- 设置合适的超时时间

### 5. Mock使用
- 对外部依赖进行Mock
- 使用 `vi.fn()` 创建Mock函数
- 验证Mock函数的调用情况

## 🐛 调试测试

### 使用测试UI

```bash
pnpm test:ui
```

访问 `http://localhost:51204/__vitest__/` 查看可视化测试界面。

### 调试单个测试

```typescript
// 只运行这个测试
it.only('应该只运行这个测试', () => {
  // 测试代码
});

// 跳过这个测试
it.skip('应该跳过这个测试', () => {
  // 测试代码
});
```

### 查看详细输出

```bash
# 显示详细的测试输出
pnpm test --reporter=verbose
```

## 📚 参考资源

- [Vitest 官方文档](https://vitest.dev/)
- [Vitest API 参考](https://vitest.dev/api/)
- [SuperTest 文档](https://github.com/visionmedia/supertest)
- [Express 测试指南](https://expressjs.com/en/guide/testing.html)

## ❓ 常见问题

### Q: 测试运行缓慢怎么办？
A: 可以使用 `--run` 参数避免监听模式，或者使用 `--threads` 参数调整并发数。

### Q: 如何测试需要数据库的功能？
A: 建议使用内存数据库或Mock数据库操作，避免依赖真实数据库。

### Q: 如何处理文件上传测试？
A: 使用临时文件进行测试，测试完成后及时清理。参考 `upload.controller.test.ts` 中的示例。

### Q: 测试覆盖率不够怎么办？
A: 检查 `coverage/` 目录中的HTML报告，找出未覆盖的代码行，补充相应的测试用例。