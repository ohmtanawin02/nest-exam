import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UserStampSchema } from 'src/common/schemas/user-stamp.schema'
import { incrementPlugin } from 'src/database/plugins/increment.plugin'
import * as mongoosePaginate from 'mongoose-paginate-v2'
import * as mongoose from 'mongoose'
import { authorStampCreatePlugin } from 'src/database/plugins/author-stamp.plugin'

export type SubmitDocument = SubmitFields & mongoose.Document

@Schema({
  timestamps: true,
  strict: true,
  collection: 'submit',
  versionKey: false
})
export class SubmitFields {
  @Prop({ default: 0 })
  _id: number

  @Prop({ ref: 'questions', required: true })
  question: number

  @Prop({ default: '' })
  answer: string

  @Prop({ default: '' })
  submitBy: string

  @Prop({ default: StatusEnum.ACTIVE, enum: Object.values(StatusEnum) })
  status: string

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createdBy: UserStampSchema
}

export const SubmitSchema = SchemaFactory.createForClass(SubmitFields)
SubmitSchema.plugin(incrementPlugin, {
  id: 'submit_seq',
  inc_field: '_id'
})
SubmitSchema.plugin(mongoosePaginate)
SubmitSchema.plugin(authorStampCreatePlugin)
