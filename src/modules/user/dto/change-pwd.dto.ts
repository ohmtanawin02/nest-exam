import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ChangePwdUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'your_super_secret_password' })
  password: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'your_new_super_secret_password' })
  readonly newPassword: string
}
