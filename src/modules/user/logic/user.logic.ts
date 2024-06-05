import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserService } from '../services/user.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UpdateUserDto } from '../dto/update-user.dto'
import { ChangePwdUserDto } from '../dto/change-pwd.dto'
import { UserDocument } from '../schema/user.schema'

@Injectable()
export class UserLogic {
  constructor(private readonly userService: UserService) {}

  async createUserLogic(user: CreateUserDto): Promise<any> {
    const isExists = await this.userService.findOne({
      username: user.username,
      status: { $ne: StatusEnum.DELETED }
    })

    if (isExists) {
      throw new BadRequestException(
        `อีเมล "${user.email}" ได้มีในระบบแล้ว กรุณาใช้อีเมลอื่น.`
      )
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(user.password, salt)
    const result = await this.userService.create({
      status: user?.status,
      username: user?.username,
      email: user?.email,
      password: hashedPassword,
      role: user?.role,
      vehicleTypes: user?.vehicleTypes
    })

    const id = result._id
    return this.userService.findOne({ _id: id }, { password: 0 })
  }

  async getUserLogic(id: number) {
    const user = await this.userService.findOne(
      {
        _id: Number(id),
        status: { $ne: StatusEnum.DELETED }
      },
      { password: 0 }
    )

    if (!user) {
      throw new NotFoundException('ไม่พบข้อมูลผู้ใช้งาน')
    }
    return user
  }

  async updateUserLogic(id: number, payload: UpdateUserDto) {
    const user = await this.userService.findOne({
      _id: id,
      status: { $ne: StatusEnum.DELETED }
    })

    if (!user) {
      throw new NotFoundException('ไม่พบข้อมูลผู้ใช้งาน')
    }

    if (payload?.email) {
      const isExists = await this.userService.findOne({
        _id: { $ne: user.id },
        username: payload.username,
        status: { $ne: StatusEnum.DELETED }
      })
      if (isExists) {
        throw new BadRequestException(
          `ยูซเซอร์ ${user.username} ได้มีในระบบแล้ว.`
        )
      }
    }

    await this.userService.findOneAndUpdate(
      {
        _id: id,
        status: { $ne: StatusEnum.DELETED }
      },
      {
        status: payload?.status,
        username: payload?.username,
        email: payload?.email,
        role: payload?.role,
        vehicleTypes: payload?.vehicleTypes
      }
    )
    return this.userService.findOne({ _id: id }, { password: 0 })
  }

  async deleteUserLogic(id: number) {
    const user = await this.userService.findOne({
      _id: id,
      status: { $ne: StatusEnum.DELETED }
    })

    if (!user) {
      throw new NotFoundException('ไม่พบข้อมูลผู้ใช้งาน')
    }

    await this.userService.findOneAndUpdate(
      {
        _id: id,
        status: { $ne: StatusEnum.DELETED }
      },
      {
        status: StatusEnum.DELETED
      }
    )
    return { success: true }
  }

  async changePwdUserLogic(id: number, pwd: ChangePwdUserDto) {
    const user = await this.userService.findOne({
      _id: id,
      status: { $ne: StatusEnum.DELETED }
    })

    if (!user) {
      throw new NotFoundException('ไม่พบข้อมูลผู้ใช้งาน')
    }

    const validatePassword = await bcrypt.compare(pwd.password, user.password)

    if (!validatePassword) {
      throw new BadRequestException('รหัสผ่านไม่ถูกต้อง')
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(pwd.newPassword, salt)

    await this.userService.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword }
    )

    return { success: true }
  }

  async validateUserLogic(
    email: string,
    password: string
  ): Promise<UserDocument> {
    const user = await this.userService.findOne({
      email,
      status: { $ne: StatusEnum.DELETED }
    })
    if (!user) {
      throw new UnauthorizedException('อีเมลไม่ถูกต้อง')
    }
    const validateUser = await bcrypt.compare(password, user.password)
    if (!validateUser) {
      throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง')
    }
    return user
  }
}
