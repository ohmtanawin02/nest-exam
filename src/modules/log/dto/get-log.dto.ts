import { IsString, IsOptional } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { StatusEnum } from 'src/common/enum/status.enum'
import { PaginateDto } from 'src/common/dto/paginate.dto'

export class LogPaginateDto extends PaginateDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'createdAt' })
  readonly sortBy: string = 'createdAt'

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'desc' })
  readonly sortOrder: string = 'desc'

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '' })
  readonly search: string = ''

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: StatusEnum.ACTIVE })
  readonly status: string

  public buildQuery() {
    return {
      $or: [
        {
          'createdBy.username': {
            $regex: this.search,
            $options: 'i'
          }
        },
        {
          'body.order.id': +this.search
        }
      ],
      status: this.status || { $ne: StatusEnum.DELETED }
    }
  }
}
