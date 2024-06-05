import { Module, Global } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserStrategy } from './passport/user-strategy'
import { PassportModule } from '@nestjs/passport'
import { AuthLogic } from './logics/auth.logic'
import { ConfigModule } from '@nestjs/config'
import { AdminStrategy } from './passport/admin-strategy'
import { UserModule } from '../user/user.module'
import { AuthController } from './controller/auth.controller'

@Global()
@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_USER,
      signOptions: {
        expiresIn: '7d'
      }
    })
  ],
  controllers: [AuthController],
  providers: [UserStrategy, AuthLogic, AdminStrategy],
  exports: [AuthLogic]
})
export class AuthModule {}
