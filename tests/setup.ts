import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import useRoutes from '../src/routes';

/**
 * 创建测试应用实例
 * @returns Express应用实例
 */
export function createTestApp() {
  const app = express();
  
  // 中间件配置
  app.use(express.json());
  app.use(cors());
  
  // 注册路由
  useRoutes(app);
  
  return app;
}

/**
 * 测试数据工厂
 */
export const TestDataFactory = {
  /**
   * 创建用户测试数据
   */
  createUserData: () => ({
    username: 'testuser',
    password: 'testpassword',
    email: 'test@example.com',
    phone: '13800138000'
  }),
  
  /**
   * 创建更新用户测试数据
   */
  createUpdateUserData: () => ({
    userId: '1',
    username: 'updateduser',
    sex: 'male',
    email: 'updated@example.com',
    phone: '13900139000'
  })
};

/**
 * 测试工具函数
 */
export const TestUtils = {
  /**
   * 延迟函数
   * @param ms 延迟毫秒数
   */
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
  
  /**
   * 生成随机字符串
   * @param length 字符串长度
   */
  randomString: (length: number = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
};