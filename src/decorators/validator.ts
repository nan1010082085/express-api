// 验证装饰器 express-validator
import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validationResult } from 'express-validator';
import { ValidationChain } from 'express-validator';

// 验证装饰器（支持直接传入 ValidationChain 或字段名）
export function Validate(validations: ValidationChain[] | string[]) {
  return  (target: any, propertyKey: string) => {
    // 如果传入的是字段名，自动生成基础校验
    const chains = validations.map(v => 
      typeof v === 'string' ? check(v).notEmpty() : v
    );
    
    // 存储校验中间件（包含错误处理）
    Reflect.defineMetadata(
      'validations', 
      [createValidationMiddleware(chains)], // 核心转换逻辑
      target,
      target.name
    );
  };
}

// 创建校验中间件（含错误处理）
function createValidationMiddleware(chains: ValidationChain[]) {
  return [
    ...chains,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
}
