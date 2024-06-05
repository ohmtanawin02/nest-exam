import { ApiProperty } from '@nestjs/swagger'
import { StatusEnum } from '../enum/status.enum'

class AuthorStampFields {
  @ApiProperty({ example: 'superadmin' })
  username: string

  @ApiProperty({ example: 1 })
  id: number
}

export class TimestampResponseObject {
  @ApiProperty({ example: '2022-10-11T03:56:46.826Z' })
  created_at: string

  @ApiProperty({ example: '2022-10-11T03:56:46.826Z' })
  updated_at: string

  @ApiProperty({ type: () => AuthorStampFields })
  created_by: AuthorStampFields

  @ApiProperty({ type: () => AuthorStampFields })
  updated_by: AuthorStampFields

  @ApiProperty({ enum: Object.values(StatusEnum), example: StatusEnum.ACTIVE })
  status: string
}
