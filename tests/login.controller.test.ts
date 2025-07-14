import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { Express } from 'express';
import { createTestApp } from './setup';

describe('LoginController', () => {
  let app: Express;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('POST /login/sign', () => {
    it('应该成功登录', async () => {
      const loginData = {
        username: 'testuser',
        password: 'testpassword',
        code: '1234'
      };

      const response = await request(app)
        .post('/login/sign')
        .send(loginData)
        .expect(200);

      expect(response.body).toEqual({ msg: 'login success' });
    });

    it('缺少用户名时应该返回400错误', async () => {
      const loginData = {
        password: 'testpassword',
        code: '1234'
      };

      await request(app)
        .post('/login/sign')
        .send(loginData)
        .expect(400);
    });

    it('缺少密码时应该返回400错误', async () => {
      const loginData = {
        username: 'testuser',
        code: '1234'
      };

      await request(app)
        .post('/login/sign')
        .send(loginData)
        .expect(400);
    });

    it('缺少验证码时应该返回400错误', async () => {
      const loginData = {
        username: 'testuser',
        password: 'testpassword'
      };

      await request(app)
        .post('/login/sign')
        .send(loginData)
        .expect(400);
    });

    it('空请求体时应该返回400错误', async () => {
      await request(app)
        .post('/login/sign')
        .send({})
        .expect(400);
    });

    it('用户名为空字符串时应该返回400错误', async () => {
      const loginData = {
        username: '',
        password: 'testpassword',
        code: '1234'
      };

      await request(app)
        .post('/login/sign')
        .send(loginData)
        .expect(400);
    });

    it('密码为空字符串时应该返回400错误', async () => {
      const loginData = {
        username: 'testuser',
        password: '',
        code: '1234'
      };

      await request(app)
        .post('/login/sign')
        .send(loginData)
        .expect(400);
    });

    it('验证码为空字符串时应该返回400错误', async () => {
      const loginData = {
        username: 'testuser',
        password: 'testpassword',
        code: ''
      };

      await request(app)
        .post('/login/sign')
        .send(loginData)
        .expect(400);
    });
  });

  describe('POST /login/out', () => {
    it('应该成功登出', async () => {
      const logoutData = {
        userId: '123'
      };

      const response = await request(app)
        .post('/login/out')
        .send(logoutData)
        .expect(200);

      expect(response.body).toEqual({ msg: 'logout success' });
    });

    it('缺少用户ID时应该返回400错误', async () => {
      await request(app)
        .post('/login/out')
        .send({})
        .expect(400);
    });

    it('用户ID为空字符串时应该返回400错误', async () => {
      const logoutData = {
        userId: ''
      };

      await request(app)
        .post('/login/out')
        .send(logoutData)
        .expect(400);
    });

    it('应该正确处理不同格式的用户ID', async () => {
      const userIds = ['123', 'user_456', 'abc-def-ghi'];
      
      for (const userId of userIds) {
        const response = await request(app)
          .post('/login/out')
          .send({ userId })
          .expect(200);

        expect(response.body).toEqual({ msg: 'logout success' });
      }
    });
  });
});