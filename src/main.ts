import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import * as compression from 'compression'
import { urlencoded, json } from 'express'
import { LogLogic } from './modules/log/logic/log.logic'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ErrorFilter } from './exception-filter/error.filter'
import { HttpExceptionFilter } from './exception-filter/http-exception.filter'

async function bootstrap() {
  const port = process.env.PORT || 3030
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.use(compression())
  app.enableCors()
  app.use(json({ limit: '100mb' }))
  const logLogic = await app.resolve<LogLogic>(LogLogic)
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('EXAM FULL STACK API')
      .setDescription('EXAM FULL STACK API Document')
      .setVersion('1.0')
      .setExternalDoc('Postman Collection', '/api/docs-json')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'alpha'
      }
    })
  }
  app.useGlobalFilters(new ErrorFilter(logLogic))
  app.useGlobalFilters(new HttpExceptionFilter(logLogic))
  app.use(urlencoded({ extended: true, limit: '100mb' }))

  await app.listen(port)
}
bootstrap()
