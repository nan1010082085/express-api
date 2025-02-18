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

interface ApiBodySchema {
  name: string
  type: string
  description: string
  required?: boolean
}

export function ApiBody(schema: ApiBodySchema[]) {
  return (target: any, propertyKey: string) => {
    if (Object.prototype.toString.call(schema) !== '[object Array]') return
    const properties = {}
    schema.forEach((item) => {
      properties[item.name] = {
        type: item.type,
        description: item.description,
        required: item?.required || false
      }
    })

    let SchemaObject: OpenAPIV3.RequestBodyObject = {
      description: '用户信息',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: properties
          }
        }
      },
      required: true
    }
    Reflect.defineMetadata('body', SchemaObject, target, target.name)
  }
}

export function ApiFile(fieldName: string, required: boolean = true, description: string = '文件上传') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 存储文件元数据
    const files = Reflect.getMetadata('fileParams', target, target.name) || []
    files.push({
      name: fieldName,
      required,
      description
    })
    Reflect.defineMetadata('fileParams', files, target, target.name)
  }
}

export function ApiResponse(status: number, description: string, schema?: OpenAPIV3.SchemaObject) {
  return (target: any, propertyKey: string) => {
    const existingResponses = Reflect.getMetadata('responses', target, target.name) || {}
    existingResponses[status] = { description, content: schema ? { 'application/json': { schema } } : undefined }
    Reflect.defineMetadata('responses', existingResponses, target, target.name)
  }
}
