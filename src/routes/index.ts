import { Express, Router } from 'express'
import { UserController } from '../controllers/user.controllers'
// import 'reflect-metadata'


// 注册控制器
function registerControllers(controllers: any[], app: Express) {
  controllers.forEach(ControllerClass => {
    const instance = new ControllerClass();
    const router = Router();
    // 从 metadata 获取 basePath
    const basePath = Reflect.getMetadata('basePath', ControllerClass.prototype) || '';
    const proto = Object.getPrototypeOf(instance);

    Object.getOwnPropertyNames(proto).forEach(propertyKey => {
      if (propertyKey === 'constructor') return;
      const target = proto[propertyKey];
      const path: string = Reflect.getMetadata('path', target, propertyKey);
      const method: string = Reflect.getMetadata('method', target, propertyKey);
      const validations = Reflect.getMetadata('validations', target, propertyKey) || [];
      const middlewares: any[] = Reflect.getMetadata('middlewares', target, propertyKey) || [];
      const handler = instance[propertyKey].bind(instance);
      
      if (method && path !== undefined) {
        router[method](path, ...validations ,...middlewares, handler);
        console.log(`✅ 路由 ${method.toUpperCase()} ${basePath}${path} 已注册验证`);
      }
    });

    app.use(basePath, router);
  });
}

export const controllers = [
  UserController
]


export default (app: Express) => registerControllers(controllers, app)
