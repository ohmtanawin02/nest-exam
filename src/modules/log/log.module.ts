import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LogController } from './controllers/log.controller'
import { LogLogic } from './logic/log.logic'
import { LogSchema } from './schemas/log.schema'
import { LogService } from './services/log.service'

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: 'log', schema: LogSchema }])],
  providers: [LogService, LogLogic],
  controllers: [LogController],
  exports: [LogLogic]
})
export class LogModule {}
