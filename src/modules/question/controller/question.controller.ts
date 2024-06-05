import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { routesV1 } from 'src/configs/app.routes'
import { UserAuthGuard } from 'src/modules/auth/guards/user-auth.guard'
import { QuestionService } from '../service/question.service'
import { QuestionLogic } from '../logic/question.logic'
import { IAnswer } from '../interface/question.interface'

@ApiBearerAuth()
@ApiTags(routesV1.question.settingTag)
@Controller(routesV1.version)
// @UseGuards(UserAuthGuard)
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly questionLogic: QuestionLogic
  ) {}

  @Get(`${routesV1.question.settingRoot}`)
  @ApiOperation({ summary: 'Get questions' })
  async getQuestions() {
    return this.questionLogic.getQuestions()
  }

  @Patch(`${routesV1.question.settingRoot}`)
  @ApiOperation({ summary: 'Submit Answer' })
  async updateUser(@Body() payload: IAnswer[]) {
    return this.questionLogic.submitAnswer(payload)
  }

  @Get(`${routesV1.question.settingRoot}/:id`)
  @ApiOperation({ summary: 'Get Question by ID' })
  async getUser(@Param('id') id: number) {
    return this.questionService.findOne({ _id: +id })
  }
}
