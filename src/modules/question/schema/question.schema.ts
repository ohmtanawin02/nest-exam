import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UserStampSchema } from 'src/common/schemas/user-stamp.schema'
import { incrementPlugin } from 'src/database/plugins/increment.plugin'
import * as mongoosePaginate from 'mongoose-paginate-v2'
import * as mongoose from 'mongoose'
import { authorStampCreatePlugin } from 'src/database/plugins/author-stamp.plugin'

export type QuestionDocument = QuestionFields & mongoose.Document

@Schema({
  timestamps: true,
  strict: true,
  collection: 'question',
  versionKey: false
})
export class QuestionFields {
  @Prop({ default: 0 })
  _id: number

  @Prop({ required: true })
  question: string

  @Prop({ default: '' })
  subImage: string

  @Prop({ default: '' })
  subQuestion: string

  @Prop({ default: '' })
  answer: string

  @Prop({ default: '' })
  answerBy: string

  @Prop({ default: false })
  isCoding: boolean

  @Prop({ default: StatusEnum.ACTIVE, enum: Object.values(StatusEnum) })
  status: string

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createdBy: UserStampSchema
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionFields)
QuestionSchema.plugin(incrementPlugin, {
  id: 'question_seq',
  inc_field: '_id'
})
QuestionSchema.plugin(mongoosePaginate)
QuestionSchema.plugin(authorStampCreatePlugin)
