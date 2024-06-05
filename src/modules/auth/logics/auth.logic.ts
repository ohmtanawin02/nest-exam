import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UserService } from 'src/modules/user/services/user.service'
import { ILogin } from '../interface/auth.interface'
import { LoginDto } from '../dto/login.dto'

@Injectable()
export class AuthLogic {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async userLogin(login: LoginDto) {
    const userData = await this.userService.findOne({
      email: login.email,
      status: StatusEnum.ACTIVE
    })

    const now = new Date()

    if (!userData) {
      throw new UnauthorizedException(`This email doesn't exist.`)
    }

    const validateUser = await bcrypt.compare(login.password, userData.password)

    if (!validateUser) {
      throw new UnauthorizedException(`This password is invalid.`)
    }

    const payload: ILogin = {
      id: userData.id,
      username: userData.username
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.SECRET_USER
    })

    return {
      ...payload,
      accessToken,
      tokenExpire: now.setDate(now.getDate() + 7)
    }
  }

  async tokenManual(username: string) {
    const payload: any = {
      username: username
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.SECRET_USER
    })

    const now = new Date()

    return {
      ...payload,
      accessToken,
      tokenExpire: now.setDate(now.getDate() + 7)
    }
  }
}
