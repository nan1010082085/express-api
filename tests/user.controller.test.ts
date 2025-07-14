import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { Express } from 'express';
import { createTestApp, TestDataFactory } from './setup';

describe('UserController', () => {
  let app: Express;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('GET /users', () => {
    it('应该返回用户列表', async () => {
      const response = await request(app)
        .get('/users')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toEqual([{ id: 1, name: 'Alice' }]);
    });

    it('缺少分页参数时应该返回400错误', async () => {
      await request(app)
        .get('/users')
        .expect(400);
    });

    it('分页参数无效时应该返回400错误', async () => {
      await request(app)
        .get('/users')
        .query({ page: 'invalid', limit: 10 })
        .expect(400);
    });
  });

  describe('GET /users/get/:id', () => {
    it('应该返回指定用户详情', async () => {
      const userId = '123';
      const response = await request(app)
        .get(`/users/get/${userId}`)
        .expect(200);

      expect(response.body).toEqual({
        id: userId,
        name: 'Alice'
      });
    });

    it('应该正确处理不同的用户ID', async () => {
      const userIds = ['1', '999', 'abc123'];
      
      for (const userId of userIds) {
        const response = await request(app)
          .get(`/users/get/${userId}`)
          .expect(200);

        expect(response.body.id).toBe(userId);
        expect(response.body.name).toBe('Alice');
      }
    });
  });

  describe('POST /users/create', () => {
    it('应该成功创建用户', async () => {
      const userData = TestDataFactory.createUserData();
      
      const response = await request(app)
        .post('/users/create')
        .send(userData)
        .expect(201);

      expect(response.body).toEqual({
        id: 2,
        ...userData
      });
    });

    it('缺少用户名时应该返回400错误', async () => {
      const userData = {
        password: 'testpassword'
      };

      await request(app)
        .post('/users/create')
        .send(userData)
        .expect(400);
    });

    it('缺少密码时应该返回400错误', async () => {
      const userData = {
        username: 'testuser'
      };

      await request(app)
        .post('/users/create')
        .send(userData)
        .expect(400);
    });

    it('空请求体时应该返回400错误', async () => {
      await request(app)
        .post('/users/create')
        .send({})
        .expect(400);
    });
  });

  describe('PUT /users/update', () => {
    it('应该成功更新用户', async () => {
      const updateData = TestDataFactory.createUpdateUserData();
      
      const response = await request(app)
        .put('/users/update')
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual({
        id: updateData.userId,
        ...updateData
      });
    });

    it('缺少用户ID时应该返回400错误', async () => {
      const updateData = {
        username: 'updateduser'
      };

      await request(app)
        .put('/users/update')
        .send(updateData)
        .expect(400);
    });

    it('缺少用户名时应该返回400错误', async () => {
      const updateData = {
        userId: '1'
      };

      await request(app)
        .put('/users/update')
        .send(updateData)
        .expect(400);
    });

    it('缺少userId字段时应该返回400错误', async () => {
      const updateData = {
        username: 'updateduser'
      };

      await request(app)
        .put('/users/update')
        .send(updateData)
        .expect(400);
    });

    it('包含完整数据时应该成功更新', async () => {
      const updateData = {
        userId: '1',
        username: 'updateduser',
        sex: 'female',
        email: 'updated@example.com',
        phone: '13900139000'
      };

      const response = await request(app)
        .put('/users/update')
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual({
        id: updateData.userId,
        ...updateData
      });
    });
  });
});