import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { CreateUserDto } from '../dto/create-user.dto'
import { UserLogic } from '../logic/user.logic'
import { GetUserDto } from '../dto/get-user.dto'
import { UserService } from '../services/user.service'
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetUserByIdResponse,
  GetUsersResponse,
  UpdateUserResponse
} from '../response/get-user.response'
import { SuccessObjectResponse } from 'src/common/response/success.response'
import { UpdateUserDto } from '../dto/update-user.dto'
import { ChangePwdUserDto } from '../dto/change-pwd.dto'
import { routesV1 } from 'src/configs/app.routes'
import { UserAuthGuard } from 'src/modules/auth/guards/user-auth.guard'

@ApiBearerAuth()
@ApiTags(routesV1.user.settingTag)
@Controller(routesV1.version)
@UseGuards(UserAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userLogic: UserLogic
  ) {}

  @Get(routesV1.user.settingRoot)
  @ApiOkResponse({ type: GetUsersResponse })
  @ApiOperation({ summary: 'Get User List' })
  async getUsers(@Query() query: GetUserDto) {
    return this.userService.paginate(query.buildQuery(), query, {
      select: { password: 0 }
    })
  }

  @Post(routesV1.user.settingRoot)
  @ApiCreatedResponse({ type: CreateUserResponse })
  @ApiOperation({ summary: 'Create a User' })
  async createUser(@Body() payload: CreateUserDto) {
    return this.userLogic.createUserLogic(payload)
  }

  @Get(`${routesV1.user.settingRoot}/:id`)
  @ApiOkResponse({ type: GetUserByIdResponse })
  @ApiOperation({ summary: 'Get User by ID' })
  async getUser(@Param('id') id: number) {
    return this.userLogic.getUserLogic(id)
  }

  @Put(`${routesV1.user.settingRoot}/:id`)
  @ApiOkResponse({ type: UpdateUserResponse })
  @ApiOperation({ summary: 'Update User by ID' })
  async updateUser(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.userLogic.updateUserLogic(id, payload)
  }

  @Patch(`${routesV1.user.settingRoot}/:id/change-pwd`)
  @ApiOkResponse({ type: SuccessObjectResponse })
  @ApiOperation({ summary: 'Change user password' })
  async changePwdUser(
    @Param('id') id: number,
    @Body() payload: ChangePwdUserDto
  ) {
    return this.userLogic.changePwdUserLogic(id, payload)
  }

  @Delete(`${routesV1.user.settingRoot}/:id`)
  @ApiOkResponse({ type: DeleteUserResponse })
  @ApiOperation({ summary: 'Delete User by ID' })
  async deleteUser(@Param('id') id: number) {
    return this.userLogic.deleteUserLogic(id)
  }
}
