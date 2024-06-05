import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { StatusEnum } from 'src/common/enum/status.enum'
import { authorStampCreatePlugin } from 'src/database/plugins/author-stamp.plugin'

export type LogDocument = LogField & mongoose.Document

@Schema({
  timestamps: true,
  collection: 'accessLogs'
})
export class LogField {
  @Prop({ default: StatusEnum.ACTIVE, enum: Object.values(StatusEnum) })
  status: string

  @Prop()
  ip: string

  @Prop()
  baseUrl: string

  @Prop()
  originalUrl: string

  @Prop()
  headers: mongoose.Schema.Types.Mixed

  @Prop()
  body: mongoose.Schema.Types.Mixed

  @Prop()
  params: mongoose.Schema.Types.Mixed

  @Prop()
  query: mongoose.Schema.Types.Mixed

  @Prop()
  method: string

  @Prop()
  note: string

  @Prop()
  response: mongoose.Schema.Types.Mixed
}

export const LogSchema = SchemaFactory.createForClass(LogField)
LogSchema.plugin(mongoosePaginate)
LogSchema.plugin(authorStampCreatePlugin)
