import { OpenAPIV3 } from 'openapi-types'

export function generateSwaggerPaths(controllers: any[]): OpenAPIV3.PathsObject {
  const paths: OpenAPIV3.PathsObject = {}

  controllers.forEach((Controller) => {
    const instance = new Controller()
    const methods = Object.getOwnPropertyNames(Controller.prototype)
    const basePath = Reflect.getMetadata('basePath', Controller.prototype) || '';
    const proto = Object.getPrototypeOf(instance)

    methods.forEach((methodName) => {
      if (methodName === 'constructor') return
      const target = proto[methodName]
      const path = Reflect.getMetadata('pathParam', target, methodName)
      const httpMethod = Reflect.getMetadata('method', target, methodName)?.toLowerCase()
      if (!path || !httpMethod) return
      
      const operation = Reflect.getMetadata('operation', target, methodName)
      const paramParams = Reflect.getMetadata('param', target, methodName)
      const queryParams = Reflect.getMetadata('query', target, methodName)
      const requestBody = Reflect.getMetadata('body', target, methodName)
      const responses = Reflect.getMetadata('responses', target, methodName)

      const parameters: OpenAPIV3.ParameterObject[] = [
        ...(paramParams?.map((p: OpenAPIV3.ParameterObject) => ({ ...p, in: 'path' })) || []),
        ...(queryParams?.map((p: OpenAPIV3.ParameterObject) => ({ ...p, in: 'query' })) || []),
      ]

      // 创建api对象
      const pathObj: OpenAPIV3.OperationObject = {
        tags: [basePath], // 标签
        summary: operation, // 描述
        externalDocs: {
          description: operation,
          url: path
        },
        parameters, // 参数
        requestBody, // body
        responses: responses || {}
      }

      if (!paths[path]) paths[path] = {}
      paths[path][httpMethod] = pathObj
    })
  })


  return paths
}
