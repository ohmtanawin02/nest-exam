import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { routesV1 } from 'src/configs/app.routes'
import { SubmitService } from '../service/submit.service'
import { SubmitLogic } from '../logic/submit.logic'
import { GetSubmitDto } from '../dto/get-submit.dto'
import { SubmitDto } from '../dto/create-submit.dto'

@ApiBearerAuth()
@ApiTags(routesV1.submit.settingTag)
@Controller(routesV1.version)
// @UseGuards(UserAuthGuard)
export class SubmitController {
  constructor(
    private readonly submitService: SubmitService,
    private readonly submitLogic: SubmitLogic
  ) {}

  @Get(`${routesV1.submit.settingRoot}`)
  @ApiOperation({ summary: 'Get answer' })
  async getAnswer(@Query() query: GetSubmitDto) {
    return this.submitService.paginate(query.buildQuery(), query)
  }

  @Post(routesV1.submit.settingRoot)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Submit answer' })
  async submitAnswer(@Body() body: SubmitDto) {
    return this.submitLogic.submitAnswer(body)
  }
}
