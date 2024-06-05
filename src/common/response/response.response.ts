import { ApiProperty } from '@nestjs/swagger'

export abstract class ResponseObject<T> {
  abstract get data(): T

  @ApiProperty({ example: 'done' })
  message: string
}
