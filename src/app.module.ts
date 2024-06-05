import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ErrorFilter } from './exception-filter/error.filter'
import { HttpExceptionFilter } from './exception-filter/http-exception.filter'
import { CamelizeKeysPipe } from './pipes/camelize-keys.pipe'
import { CustomValidationPipe } from './pipes/validation.pipe'
import { TransformInterceptor } from './interceptors/app.interceptor'
import { AppTransformers } from './interceptors/app.transformer'
import { MongooseTransformers } from './interceptors/mongoose.transformer'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { LogModule } from './modules/log/log.module'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { QuestionModule } from './modules/question/question.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CounterSchema } from './modules/counter/counter.schema'
import { SubmitModule } from './modules/submit/submit.module'

const AppProvider = [
  {
    provide: APP_FILTER,
    useClass: ErrorFilter
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  },
  {
    provide: APP_PIPE,
    useClass: CamelizeKeysPipe
  },
  {
    provide: APP_PIPE,
    useClass: CustomValidationPipe
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  },
  AppTransformers,
  MongooseTransformers,
  AppService
]

const AppModules = [
  DatabaseModule,
  LogModule,
  AuthModule,
  QuestionModule,
  SubmitModule
]

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Counter', schema: CounterSchema }]),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    ...AppModules
  ],
  controllers: [AppController],
  providers: [...AppProvider]
})
export class AppModule {}
