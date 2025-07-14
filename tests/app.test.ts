import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { Express } from 'express';
import { createTestApp } from './setup';

describe('App Integration Tests', () => {
  let app: Express;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('基础路由测试', () => {
    it('应该响应根路径请求', async () => {
      // 添加根路径处理
      app.get('/', (req, res) => {
        res.send('Hello World! express + TypeScript');
      });

      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.text).toBe('Hello World! express + TypeScript');
    });

    it('不存在的路由应该返回404', async () => {
      await request(app)
        .get('/nonexistent-route')
        .expect(404);
    });
  });

  describe('中间件测试', () => {
    it('应该正确处理JSON请求体', async () => {
      const testData = { test: 'data' };
      
      // 添加测试路由
      app.post('/test-json', (req, res) => {
        res.json({ received: req.body });
      });

      const response = await request(app)
        .post('/test-json')
        .send(testData)
        .expect(200);

      expect(response.body.received).toEqual(testData);
    });

    it('应该支持CORS', async () => {
      app.get('/test-cors', (req, res) => {
        res.json({ message: 'CORS test' });
      });

      const response = await request(app)
        .get('/test-cors')
        .expect(200);

      // 检查CORS头部是否存在
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('错误处理测试', () => {
    it('应该处理服务器错误', async () => {
      // 添加会抛出错误的路由
      app.get('/test-error', (req, res, next) => {
        const error = new Error('Test error');
        next(error);
      });

      // 添加错误处理中间件
      app.use((err: Error, req: any, res: any, next: any) => {
        res.status(500).json({ error: err.message });
      });

      const response = await request(app)
        .get('/test-error')
        .expect(500);

      expect(response.body.error).toBe('Test error');
    });
  });

  describe('请求方法测试', () => {
    it('应该支持不同的HTTP方法', async () => {
      const methods = ['get', 'post', 'put', 'delete'] as const;
      
      methods.forEach(method => {
        app[method](`/test-${method}`, (req, res) => {
          res.json({ method: method.toUpperCase() });
        });
      });

      for (const method of methods) {
        const response = await request(app)
          [method](`/test-${method}`)
          .expect(200);

        expect(response.body.method).toBe(method.toUpperCase());
      }
    });
  });

  describe('请求头测试', () => {
    it('应该正确处理Content-Type头', async () => {
      app.post('/test-content-type', (req, res) => {
        res.json({ 
          contentType: req.get('Content-Type'),
          body: req.body 
        });
      });

      const response = await request(app)
        .post('/test-content-type')
        .set('Content-Type', 'application/json')
        .send({ test: 'data' })
        .expect(200);

      expect(response.body.contentType).toContain('application/json');
      expect(response.body.body).toEqual({ test: 'data' });
    });

    it('应该正确处理自定义请求头', async () => {
      app.get('/test-custom-header', (req, res) => {
        res.json({ 
          customHeader: req.get('X-Custom-Header')
        });
      });

      const response = await request(app)
        .get('/test-custom-header')
        .set('X-Custom-Header', 'test-value')
        .expect(200);

      expect(response.body.customHeader).toBe('test-value');
    });
  });
});