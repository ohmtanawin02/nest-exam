import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SubmitSchema } from './schema/submit.schema'
import { SubmitService } from './service/submit.service'
import { SubmitLogic } from './logic/submit.logic'
import { SubmitController } from './controller/submit.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'submit', schema: SubmitSchema }])
  ],
  providers: [SubmitService, SubmitLogic],
  controllers: [SubmitController],
  exports: [SubmitService, SubmitLogic]
})
export class SubmitModule {}
