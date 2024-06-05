import { Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { routesV1 } from 'src/configs/app.routes'
import { UserAuthGuard } from '../guards/user-auth.guard'
import { AuthLogic } from '../logics/auth.logic'

@ApiBearerAuth()
@ApiTags(routesV1.auth.settingTag)
@Controller(routesV1.version)
@UseGuards(UserAuthGuard)
export class AuthController {
  constructor(private readonly authLogic: AuthLogic) {}

  @Post(routesV1.auth.settingRoot)
  @ApiOperation({ summary: 'Manual get token' })
  async manualToken(username: string) {
    return this.authLogic.tokenManual(username)
  }
}
