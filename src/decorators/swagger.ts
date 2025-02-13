import { OpenAPIV3 } from 'openapi-types'

// Swagger 装饰器
export function ApiOperation(summary: string) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata('operation', summary, target, target.name)
  }
}

/**
 * url 路径
 * @description 路径 /get/{id} 
 */
export function ApiPath(path: string) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata('pathParam', path, target, target.name)
  }
}

/**
 * url 参数
 * @description :id
 */
export function ApiParam(params: OpenAPIV3.ParameterObject[]) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata('param', params, target, target.name)
  }
}

/**
 * url 对象
 * @description query
 */
export function ApiQuery(params: OpenAPIV3.ParameterObject[]) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata('query', params, target, target.name)
  }
}

/**
 * body 对象
 * @description
 */
export function ApiBody(schema: OpenAPIV3.RequestBodyObject) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata('body', schema, target, target.name)
  }
}

export function ApiResponse(status: number, description: string, schema?: OpenAPIV3.SchemaObject) {
  return (target: any, propertyKey: string) => {
    const existingResponses = Reflect.getMetadata('responses', target, target.name) || {}
    existingResponses[status] = { description, content: schema ? { 'application/json': { schema } } : undefined }
    Reflect.defineMetadata('responses', existingResponses, target, target.name)
  }
}
