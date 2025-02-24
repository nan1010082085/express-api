import { Express, Router } from 'express'
import { LoginController } from '../controllers/login.controller';
import { UserController } from '../controllers/user.controller'
import { UploadController } from '../controllers/upload.controller';
import { LogsController } from '../controllers/logs.controller';
import { StatisticsController } from '../controllers/statistics.controller';
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
        console.log(`✅ 路由 ${method.length == 3 ? method.toUpperCase() + ' ' : method.toUpperCase()} 已注册 --> ${basePath}${path}`);
      }
    });

    app.use(basePath, router);
  });
}

export const controllers = [
  LoginController,
  UserController,
  UploadController,
  LogsController,
  StatisticsController
]


export default (app: Express) => registerControllers(controllers, app)
