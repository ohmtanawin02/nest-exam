import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({ example: 'email' })
  @IsString()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({ example: 'your_super_secret_password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string
}
