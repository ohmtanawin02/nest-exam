import { ApiProperty } from '@nestjs/swagger'

export abstract class PaginateResponseObject<T> {
  abstract get results(): T

  @ApiProperty({ example: 1 })
  total_docs: number

  @ApiProperty({ example: 25 })
  limit: number

  @ApiProperty({ example: 1 })
  total_pages: number

  @ApiProperty({ example: 1 })
  page: number

  @ApiProperty({ example: 1 })
  paging_counter: number

  @ApiProperty({ example: false })
  has_prev_page: boolean

  @ApiProperty({ example: false })
  has_next_page: boolean

  @ApiProperty({ example: null })
  prev_page: number

  @ApiProperty({ example: null })
  next_page: number
}
