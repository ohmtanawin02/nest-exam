import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from 'src/common/dto/paginate.dto'
import { StatusEnum } from 'src/common/enum/status.enum'

export class GetUserDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'createdAt' })
  readonly sortBy: string = 'createdAt'

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'desc' })
  readonly sortOrder: 'asc' | 'desc' = 'desc'

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'test' })
  readonly search: string = ''

  public buildQuery(): any {
    const query = {
      $or: [
        { username: { $regex: this.search, $options: 'i' } },
        { email: { $regex: this.search, $options: 'i' } }
      ],
      status: { $ne: StatusEnum.DELETED }
    }
    return query
  }
}
