import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsNumberString } from 'class-validator'

export class PaginateDto {
  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ example: '1' })
  readonly page: string = '1'

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ example: '25' })
  readonly limit: string = '25'
}
