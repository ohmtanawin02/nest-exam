import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { QuestionSchema } from './schema/question.schema'
import { QuestionService } from './service/question.service'
import { QuestionSchedule } from './schedule/question.schedule'
import { QuestionController } from './controller/question.controller'
import { QuestionLogic } from './logic/question.logic'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'questions', schema: QuestionSchema }])
  ],
  providers: [QuestionService, QuestionSchedule, QuestionLogic],
  controllers: [QuestionController],
  exports: [QuestionService, QuestionSchedule]
})
export class QuestionModule {}
