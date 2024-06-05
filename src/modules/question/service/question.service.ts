import { Inject, Injectable, Scope } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { QuestionDocument } from '../schema/question.schema'
import { Model } from 'mongoose'
import { REQUEST } from '@nestjs/core'
import { CreateQuestionDto } from '../dto/create-question.dto'

@Injectable({ scope: Scope.REQUEST })
export class QuestionService {
  constructor(
    @InjectModel('questions')
    private readonly QuestionModel: Model<QuestionDocument> | any,
    @Inject(REQUEST) private request: any
  ) {}

  async create(payload: CreateQuestionDto): Promise<QuestionDocument> {
    const document = new this.QuestionModel(payload)
    document?.setAuthor(this.request)

    return document.save()
  }

  getAll(
    condition: any,
    project?: any,
    options?: any
  ): Promise<QuestionDocument[] | any[]> {
    return this.QuestionModel.find(condition, project, options)
  }

  async createMany(payload: CreateQuestionDto[], options?: any) {
    return this.QuestionModel.insertMany(payload, options)
  }

  async resolveByUrl({ id }): Promise<QuestionDocument | any> {
    return this.QuestionModel.findById({ _id: id })
  }

  findOne(
    condition: any,
    project?: any,
    options?: any
  ): Promise<QuestionDocument> {
    return this.QuestionModel.findOne(condition, project, options)
  }

  findOneAndUpdate(condition, payload: any): Promise<any> {
    return this.QuestionModel.findOneAndUpdate(condition, payload, {
      new: true
    })
  }
}
