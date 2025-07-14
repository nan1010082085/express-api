import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestUtils } from './setup';

/**
 * 示例测试文件
 * 展示vitest的基本用法和最佳实践
 */
describe('Vitest 示例测试', () => {
  
  describe('基础断言测试', () => {
    it('应该测试基本的相等性', () => {
      expect(1 + 1).toBe(2);
      expect('hello').toBe('hello');
      expect(true).toBe(true);
    });

    it('应该测试对象和数组', () => {
      const obj = { name: 'test', age: 25 };
      const arr = [1, 2, 3];

      expect(obj).toEqual({ name: 'test', age: 25 });
      expect(arr).toEqual([1, 2, 3]);
      expect(arr).toHaveLength(3);
    });

    it('应该测试字符串匹配', () => {
      const text = 'Hello World';
      
      expect(text).toContain('World');
      expect(text).toMatch(/Hello/);
      expect(text).toMatch(/^Hello/);
    });

    it('应该测试数字比较', () => {
      const num = 10;
      
      expect(num).toBeGreaterThan(5);
      expect(num).toBeLessThan(20);
      expect(num).toBeGreaterThanOrEqual(10);
      expect(num).toBeLessThanOrEqual(10);
    });

    it('应该测试真假值', () => {
      expect(true).toBeTruthy();
      expect(false).toBeFalsy();
      expect(null).toBeFalsy();
      expect(undefined).toBeFalsy();
      expect('').toBeFalsy();
      expect(0).toBeFalsy();
      expect('hello').toBeTruthy();
      expect(1).toBeTruthy();
    });
  });

  describe('异步测试', () => {
    it('应该测试Promise', async () => {
      const promise = Promise.resolve('success');
      await expect(promise).resolves.toBe('success');
    });

    it('应该测试Promise拒绝', async () => {
      const promise = Promise.reject(new Error('failed'));
      await expect(promise).rejects.toThrow('failed');
    });

    it('应该测试延迟函数', async () => {
      const start = Date.now();
      await TestUtils.delay(100);
      const end = Date.now();
      
      expect(end - start).toBeGreaterThanOrEqual(100);
    });
  });

  describe('Mock 测试', () => {
    it('应该测试函数Mock', () => {
      const mockFn = vi.fn();
      mockFn('arg1', 'arg2');
      
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该测试Mock返回值', () => {
      const mockFn = vi.fn();
      mockFn.mockReturnValue('mocked result');
      
      const result = mockFn();
      expect(result).toBe('mocked result');
    });

    it('应该测试Mock实现', () => {
      const mockFn = vi.fn((x: number, y: number) => x + y);
      
      const result = mockFn(2, 3);
      expect(result).toBe(5);
      expect(mockFn).toHaveBeenCalledWith(2, 3);
    });
  });

  describe('生命周期钩子测试', () => {
    let testData: string[];

    beforeEach(() => {
      testData = [];
      testData.push('setup');
    });

    afterEach(() => {
      testData = [];
    });

    it('应该在每个测试前设置数据', () => {
      expect(testData).toContain('setup');
      testData.push('test1');
      expect(testData).toHaveLength(2);
    });

    it('应该在每个测试前重新设置数据', () => {
      expect(testData).toContain('setup');
      expect(testData).toHaveLength(1); // 上一个测试的数据已被清理
      testData.push('test2');
      expect(testData).toHaveLength(2);
    });
  });

  describe('工具函数测试', () => {
    it('应该测试随机字符串生成', () => {
      const str1 = TestUtils.randomString(8);
      const str2 = TestUtils.randomString(8);
      
      expect(str1).toHaveLength(8);
      expect(str2).toHaveLength(8);
      expect(str1).not.toBe(str2); // 随机字符串应该不同
    });

    it('应该测试不同长度的随机字符串', () => {
      const lengths = [5, 10, 15, 20];
      
      lengths.forEach(length => {
        const str = TestUtils.randomString(length);
        expect(str).toHaveLength(length);
        expect(str).toMatch(/^[A-Za-z0-9]+$/); // 只包含字母和数字
      });
    });
  });

  describe('错误处理测试', () => {
    it('应该测试抛出错误', () => {
      const throwError = () => {
        throw new Error('Test error');
      };
      
      expect(throwError).toThrow('Test error');
      expect(throwError).toThrow(Error);
    });

    it('应该测试异步错误', async () => {
      const asyncThrowError = async () => {
        throw new Error('Async error');
      };
      
      await expect(asyncThrowError()).rejects.toThrow('Async error');
    });
  });

  describe('条件测试', () => {
    it.skipIf(process.env.NODE_ENV === 'production')('应该在非生产环境运行', () => {
      expect(process.env.NODE_ENV).not.toBe('production');
    });

    it.runIf(process.platform === 'win32')('应该在Windows上运行', () => {
      expect(process.platform).toBe('win32');
    });
  });
});