import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { RoleUserEnum } from 'src/common/enum/role.enum'
import { StatusEnum } from 'src/common/enum/status.enum'

export class CreateUserDto {
  @ApiProperty({
    example: StatusEnum.ACTIVE,
    enum: Object.values(StatusEnum)
  })
  @IsEnum(StatusEnum)
  @IsString()
  @IsNotEmpty()
  readonly status: string

  @IsString()
  @ApiProperty({ example: 'username' })
  readonly username: string

  @IsString()
  @ApiProperty({ example: 'admin@email.com' })
  readonly email: string

  @IsString()
  @ApiProperty({ example: 'your_super_secret_password' })
  password: string

  @ApiProperty({
    example: RoleUserEnum.SUPER_ADMIN,
    enum: Object.values(RoleUserEnum)
  })
  @IsEnum(RoleUserEnum)
  @IsString()
  @IsNotEmpty()
  readonly role: string

  @ApiProperty({
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  readonly vehicleTypes: number
}
