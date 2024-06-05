import { IAnswer } from '../interface/question.interface'
import { QuestionService } from '../service/question.service'

export class QuestionLogic {
  constructor(private readonly questionService: QuestionService) {}

  async submitAnswer(answers: IAnswer[]) {
    if (answers.length > 0) {
      for (const answer of answers) {
        await this.questionService.findOneAndUpdate(
          { _id: answer.id },
          {
            answer: answers,
            answerBy: answer.answerBy
          }
        )
      }
    }
    return { success: true }
  }

  async getQuestions() {
    const questions = await this.questionService.getAll({})
    const docs = []
    for (const question of questions) {
      docs.push({
        _id: question._id,
        question: question.question,
        subQuestion: question.subQuestion,
        answer: question.answer,
        answerBy: question.answerBy,
        isCoding: question.isCoding
      })
    }
    return docs
  }
}
