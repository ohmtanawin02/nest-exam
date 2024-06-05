import { ApiProperty } from '@nestjs/swagger'
import { ResponseObject } from './response.response'

export class SuccessField {
  @ApiProperty()
  success: boolean
}

class SuccessWithIdField extends SuccessField {
  @ApiProperty()
  id: string
}
export class SuccessObjectResponse extends ResponseObject<SuccessField> {
  @ApiProperty({ type: SuccessField, example: { success: true } })
  data: SuccessField
}

export class SuccessWithIdResponse extends ResponseObject<SuccessWithIdField> {
  @ApiProperty({
    type: SuccessWithIdField,
    example: { success: true, id: '63a0dabb4d8b0a61654c6d10' }
  })
  data: SuccessWithIdField
}
