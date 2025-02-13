import { RequestHandler } from 'express'

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

// 控制器装饰器
export function Controller(basePath: string = '') {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    Reflect.defineMetadata('basePath', basePath, constructor.prototype)
    return constructor
  }
}

// 路由装饰器
export function Route(method: HttpMethod, path: string = '', ...middlewares: RequestHandler[]) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata('httpMethod', method.toLowerCase(), target, target.name)
    Reflect.defineMetadata('method', method, target, target.name)
    Reflect.defineMetadata('path', path, target, target.name)
    Reflect.defineMetadata('middlewares', middlewares, target, target.name)
  }
}

// Get
export const Get = (path?: string, ...middlewares: RequestHandler[]) => Route(HttpMethod.GET, path, ...middlewares)
// Post
export const Post = (path?: string, ...middlewares: RequestHandler[]) => Route(HttpMethod.POST, path, ...middlewares)
// PUT
export const Put = (path?: string, ...middlewares: RequestHandler[]) => Route(HttpMethod.POST, path, ...middlewares)
// Delete
export const Delete = (path?: string, ...middlewares: RequestHandler[]) =>
  Route(HttpMethod.DELETE, path, ...middlewares)
