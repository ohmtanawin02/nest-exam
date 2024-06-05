import { ApiProperty } from '@nestjs/swagger'
import { RoleUserEnum } from 'src/common/enum/role.enum'
import { StatusEnum } from 'src/common/enum/status.enum'
import { PaginateResponseObject } from 'src/common/response/paginate-response.response'
import { ResponseObject } from 'src/common/response/response.response'
import { TimestampResponseObject } from 'src/common/response/timestamp.response'

class GetVehicleTypeObject {
  @ApiProperty({ example: 'CHL' })
  name: string

  @ApiProperty({
    example:
      'https://storage.googleapis.com/chl-env-bucket/upload/170954862986958350.png'
  })
  logo_image: string

  @ApiProperty({ example: 1 })
  id: number
}

class GetUserPopulateObject extends TimestampResponseObject {
  @ApiProperty({ type: GetVehicleTypeObject })
  vehicleTypes: GetVehicleTypeObject
  @ApiProperty({ example: 'username' })
  username: string
  @ApiProperty({ example: 'example@mail.com' })
  email: string
  @ApiProperty({ example: StatusEnum.ACTIVE })
  status: string
  @ApiProperty({ example: RoleUserEnum.SUPER_ADMIN })
  role: string
  @ApiProperty({ example: 1 })
  id: string
}

class GetUsersPaginateObject extends PaginateResponseObject<
  GetUserPopulateObject[]
> {
  @ApiProperty({ type: [GetUserPopulateObject] })
  results: GetUserPopulateObject[]
}

export class GetUsersResponse extends ResponseObject<GetUsersPaginateObject> {
  @ApiProperty({ type: GetUsersPaginateObject })
  data: GetUsersPaginateObject
}

export class GetUserByIdResponse extends ResponseObject<GetUserPopulateObject> {
  @ApiProperty({ type: GetUserPopulateObject })
  data: GetUserPopulateObject
}

export class CreateUserResponse extends ResponseObject<GetUserPopulateObject> {
  @ApiProperty({ example: 'done' })
  message: string

  @ApiProperty({ type: GetUserPopulateObject })
  data: GetUserPopulateObject
}

export class UpdateUserResponse extends ResponseObject<GetUserPopulateObject> {
  @ApiProperty({ example: 'done' })
  message: string

  @ApiProperty({ type: GetUserPopulateObject })
  data: GetUserPopulateObject
}

export class DeleteUserResponse {
  @ApiProperty({ example: 'done' })
  message: string

  @ApiProperty({ example: true })
  data: boolean
}
