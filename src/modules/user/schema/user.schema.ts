import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate-v2'
import { StatusEnum } from 'src/common/enum/status.enum'
import { authorStampCreatePlugin } from 'src/database/plugins/author-stamp.plugin'
import { RoleUserEnum } from 'src/common/enum/role.enum'
import { incrementPlugin } from 'src/database/plugins/increment.plugin'
import { UserStampSchema } from 'src/common/schemas/user-stamp.schema'

export type UserDocument = UserFields & mongoose.Document

@Schema({ timestamps: true, strict: true, collection: 'users' })
export class UserFields {
  @Prop({ default: 0 })
  _id: number

  @Prop({ required: true, index: true })
  username: string

  @Prop({ index: true })
  password: string

  @Prop({ default: RoleUserEnum.ADMIN, enum: Object.values(RoleUserEnum) })
  role: string

  @Prop({ default: StatusEnum.ACTIVE, enum: Object.values(StatusEnum) })
  status: string

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createdBy: UserStampSchema
}

export const UserSchema = SchemaFactory.createForClass(UserFields)
UserSchema.plugin(incrementPlugin, {
  id: 'user_seq',
  inc_field: '_id'
})
UserSchema.plugin(mongoosePaginate)
UserSchema.plugin(authorStampCreatePlugin)
