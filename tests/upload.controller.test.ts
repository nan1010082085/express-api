import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { Express } from 'express';
import { createTestApp } from './setup';
import path from 'path';
import fs from 'fs';

describe('UploadController', () => {
  let app: Express;
  const uploadsDir = path.join(process.cwd(), 'uploads');

  beforeEach(() => {
    app = createTestApp();
    // 确保uploads目录存在
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  });

  afterEach(() => {
    // 清理uploads目录中的测试文件
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      files.forEach(file => {
        const filePath = path.join(uploadsDir, file);
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        }
      });
    }
  });

  // 创建测试文件的辅助函数
  const createTestFile = (filename: string, content: string = 'test file content') => {
    const testFilePath = path.join(__dirname, filename);
    fs.writeFileSync(testFilePath, content);
    return testFilePath;
  };

  // 清理测试文件的辅助函数
  const cleanupTestFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  };

  describe('POST /upload/file', () => {
    it('应该成功上传文件', async () => {
      const testFilePath = createTestFile('test.txt');
      
      try {
        const response = await request(app)
          .post('/upload/file')
          .attach('file', testFilePath)
          .expect(200);

        expect(response.body).toEqual({ message: 'File uploaded successfully' });
      } finally {
        cleanupTestFile(testFilePath);
      }
    });

    it('没有文件时应该返回400错误', async () => {
      const response = await request(app)
        .post('/upload/file')
        .expect(400);

      expect(response.body).toEqual({ message: '文件不能为空' });
    });

    it('应该处理不同类型的文件', async () => {
      const testFiles = [
        { name: 'test.txt', content: 'text content' },
        { name: 'test.json', content: '{"test": "data"}' },
        { name: 'test.csv', content: 'name,age\nJohn,25' }
      ];

      for (const file of testFiles) {
        const testFilePath = createTestFile(file.name, file.content);
        
        try {
          const response = await request(app)
            .post('/upload/file')
            .attach('file', testFilePath)
            .expect(200);

          expect(response.body).toEqual({ message: 'File uploaded successfully' });
        } finally {
          cleanupTestFile(testFilePath);
        }
      }
    });
  });

  describe('POST /upload/picture', () => {
    it('应该成功上传图片', async () => {
      const testFilePath = createTestFile('test.jpg', 'fake image content');
      
      try {
        const response = await request(app)
          .post('/upload/picture')
          .attach('file', testFilePath)
          .expect(200);

        expect(response.body).toEqual({ message: 'File uploaded successfully' });
      } finally {
        cleanupTestFile(testFilePath);
      }
    });

    it('没有文件时应该返回400错误', async () => {
      const response = await request(app)
        .post('/upload/picture')
        .expect(400);

      expect(response.body).toEqual({ message: '文件不能为空' });
    });

    it('应该处理不同格式的图片文件', async () => {
      const imageFiles = ['test.jpg', 'test.png', 'test.gif', 'test.webp'];

      for (const fileName of imageFiles) {
        const testFilePath = createTestFile(fileName, 'fake image content');
        
        try {
          const response = await request(app)
            .post('/upload/picture')
            .attach('file', testFilePath)
            .expect(200);

          expect(response.body).toEqual({ message: 'File uploaded successfully' });
        } finally {
          cleanupTestFile(testFilePath);
        }
      }
    });
  });

  describe('POST /upload/avatar', () => {
    it('应该成功上传头像', async () => {
      const testFilePath = createTestFile('avatar.jpg', 'fake avatar content');
      
      try {
        const response = await request(app)
          .post('/upload/avatar')
          .attach('file', testFilePath)
          .expect(200);

        expect(response.body).toEqual({ message: 'File uploaded successfully' });
      } finally {
        cleanupTestFile(testFilePath);
      }
    });

    it('没有文件时应该返回400错误', async () => {
      const response = await request(app)
        .post('/upload/avatar')
        .expect(400);

      expect(response.body).toEqual({ message: '文件不能为空' });
    });

    it('应该处理不同格式的头像文件', async () => {
      const avatarFiles = ['avatar.jpg', 'avatar.png', 'profile.jpeg'];

      for (const fileName of avatarFiles) {
        const testFilePath = createTestFile(fileName, 'fake avatar content');
        
        try {
          const response = await request(app)
            .post('/upload/avatar')
            .attach('file', testFilePath)
            .expect(200);

          expect(response.body).toEqual({ message: 'File uploaded successfully' });
        } finally {
          cleanupTestFile(testFilePath);
        }
      }
    });
  });

  describe('文件字段名测试', () => {
    it('使用错误的字段名应该返回500错误', async () => {
      const testFilePath = createTestFile('test.txt');
      
      try {
        await request(app)
          .post('/upload/file')
          .attach('wrongFieldName', testFilePath)
          .expect(500);
      } finally {
        cleanupTestFile(testFilePath);
      }
    });
  });
});