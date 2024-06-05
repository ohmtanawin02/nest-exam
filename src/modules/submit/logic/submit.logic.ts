import { Injectable } from '@nestjs/common'
import { SubmitService } from '../service/submit.service'
import { SubmitDto } from '../dto/create-submit.dto'

@Injectable()
export class SubmitLogic {
  constructor(private readonly submitService: SubmitService) {}

  async submitAnswer(body: SubmitDto) {
    for (const answer of body.answers) {
      await this.submitService.create({
        question: answer.question,
        answer: answer.answer,
        submitBy: answer.submitBy
      })
    }
    return { success: true }
  }
}
