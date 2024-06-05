import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { QuestionDocument } from '../schema/question.schema'
import { Cron, CronExpression } from '@nestjs/schedule'

interface IQuestionSeed {
  question: string
  subQuestion: string
  isCoding: boolean
}

@Injectable()
export class QuestionSchedule {
  constructor(
    @InjectModel('questions')
    private readonly QuestionModel: Model<QuestionDocument>
  ) {}

  // @Cron(CronExpression.EVERY_10_SECONDS)
  async seedCronJob() {
    const data: any[] = [
      {
        question:
          '1. ผลลัพธ์ของสมการด้านล่าง คืออะไร? (อธิบายตามหลักคณิตศาสตร์)',
        subQuestion: ' var result =  (10 / 5 + 2 * 2 - 1) % 1;',
        isCoding: false
      },
      {
        question:
          '2. หากเราพิมพ์ https://www.sanook.com บน URL จะเกิดอะไรขึ้นบ้างที่ทำให้ Browsers แสดงเว็บ Sanook ขึ้นมา จงอธิบายตามความเข้าใจ',
        subQuestion: '',
        isCoding: false
      },
      {
        question: '3. สร้าง Code ตาม Class Diagram นี้',
        subImage: 'https://i.ibb.co/nsVKT0Q/3.png',
        isCoding: true
      },
      {
        question:
          '4. ช่วยอธิบายในมุมมองการสร้าง Software ให้สามารถดูแลได้ในระยะยาว',
        subQuestion: '###อธิบายตามความเข้าใจ',
        isCoding: false
      },
      {
        question:
          '5. คุณเคยอ่านเอกสาร เกี่ยวกับการพัฒนา Software เรื่องอะไรล่าสุด (ระหว่างเรียนหรือหลังจากเรียนก็ได้)',
        subQuestion:
          'และอธิบายตามความเข้าใจ ที่คุณได้อ่านเรื่องนั้นมาว่ามันเกี่ยวกับอะไร',
        isCoding: false
      },
      {
        question:
          '6. เขียน Function โปรแกรมจากโครงสร้างตัวอย่าง โดยใช้หลักการของ Linked List ในการหาผลรวมของ Value ในแต่ล่ะ Node.',
        subImage: 'https://i.ibb.co/kyMKDVC/6.png',
        isCoding: true
      },
      {
        question:
          '7. เขียนโปรแกรมเพื่อทำงานตาม Flowchart นี้เพื่อหามูลค่าของกำนัลที่ลูกค้าควรจะได้รับ และพนักงานสามารถแจ้ง มูลค่าของ Gift Voucher และ Special Offer ได้ (โดยใช้ หลักการใดหลักการหนึ่ง OOP, Functional, Procedural)',
        subImage: 'https://i.ibb.co/k17KZDK/7.png',
        isCoding: true
      },
      {
        question:
          '8. จากรูปตัวอย่างด้านล่างให้เขียน HTML และ CSS ให้เป็นตามรูปตัวอย่างโดยใช้ Flexbox หรือ Grid ในการจัดวาง',
        subImage: 'https://i.ibb.co/CMwtsdF/8.png',
        isCoding: true
      }
    ]
    const questions = data.map((item) => item.question)
    const existingQuestions = await this.QuestionModel.find({
      question: questions
    })

    const questionsToCreate = data.filter(
      (question) =>
        !existingQuestions.some(
          (existing) => existing.question === question.question
        )
    )

    if (questionsToCreate.length > 0) {
      for (const question of questionsToCreate) {
        const createdQuestion = await this.QuestionModel.create(question)
      }
    } else {
      console.log('No new questions to seed.')
    }
  }
}
