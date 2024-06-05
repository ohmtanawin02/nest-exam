import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { RoleUserEnum } from 'src/common/enum/role.enum'
import { StatusEnum } from 'src/common/enum/status.enum'

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: StatusEnum.ACTIVE,
    enum: Object.values(StatusEnum)
  })
  @IsEnum(StatusEnum)
  @IsString()
  @IsOptional()
  readonly status: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'firstName' })
  readonly username?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'admin@email.com' })
  readonly email?: string

  @ApiPropertyOptional({
    example: RoleUserEnum.SUPER_ADMIN,
    enum: Object.values(RoleUserEnum)
  })
  @IsEnum(RoleUserEnum)
  @IsString()
  @IsOptional()
  readonly role: string

  @ApiPropertyOptional({
    example: 1,
    required: true
  })
  @IsOptional()
  @IsNumber()
  readonly vehicleTypes: number
}
