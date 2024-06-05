import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'
import { UserLogic } from './logic/user.logic'
import { UserSchema } from './schema/user.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  providers: [UserService, UserLogic],
  controllers: [UserController],
  exports: [UserLogic, UserService]
})
export class UserModule {}
