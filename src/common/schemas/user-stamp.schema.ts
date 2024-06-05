import { Prop, Schema } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

@Schema({ strict: true, _id: false })
export class UserStampSchema {
  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  id: mongoose.Schema.Types.Mixed

  @Prop({ default: '' })
  username: string

  @Prop({ default: '' })
  firstName: string

  @Prop({ default: '' })
  lastName: string

  @Prop({ default: '' })
  email: string
}
