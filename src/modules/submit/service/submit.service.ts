import { REQUEST } from '@nestjs/core'
import { Inject, Injectable, Scope } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  Model,
  ClientSession,
  PaginateModel,
  PaginateResult,
  PaginateOptions
} from 'mongoose'
import { StatusEnum } from 'src/common/enum/status.enum'
import { GetSubmitDto } from '../dto/get-submit.dto'
import { SubmitDocument } from '../schema/submit.schema'

@Injectable({ scope: Scope.REQUEST })
export class SubmitService {
  constructor(
    @InjectModel('submit')
    private readonly SubmitModel:
      | Model<SubmitDocument>
      | PaginateModel<SubmitDocument>
      | any,
    @Inject(REQUEST) private request: any
  ) {}

  async resolveByUrl({ id }): Promise<SubmitDocument | any> {
    return this.SubmitModel.findById({ _id: id })
  }

  getModel(): Model<SubmitDocument> {
    return this.SubmitModel
  }

  async getSession(): Promise<ClientSession> {
    await this.SubmitModel.createCollection()

    return await this.SubmitModel.startSession()
  }

  async isExists(condition: any): Promise<boolean> {
    const result = await this.SubmitModel.findOne(condition)

    return !!result
  }

  async transactionCreateMany(
    payload: any[],
    session: ClientSession,
    options?: any
  ): Promise<SubmitDocument[]> {
    return this.SubmitModel.insertMany(payload, {
      session,
      ...options
    })
  }

  async createMany(payload: any[], options?: any) {
    return this.SubmitModel.insertMany(payload, options)
  }
  updateMany(
    condition: any,
    payload: any,
    options?: any
  ): Promise<SubmitDocument[]> {
    return this.SubmitModel.updateMany(condition, { $set: payload }, options)
  }

  async transactionUpdatePayload(
    condition: any,
    payload: any,
    session: ClientSession,
    options?: any
  ): Promise<SubmitDocument> {
    return this.SubmitModel.findOneAndUpdate(condition, payload, {
      session,
      ...options
    })
  }
  async transactionUpdate(
    condition: any,
    payload: any,
    session: ClientSession
  ): Promise<SubmitDocument> {
    return this.SubmitModel.updateOne(condition, { $set: payload }, { session })
  }

  async transactionUpdateMany(
    condition: any,
    payload: any,
    session: ClientSession
  ): Promise<SubmitDocument[]> {
    return this.SubmitModel.updateMany(
      condition,
      { $set: payload },
      { session }
    )
  }

  async transactionCreate(
    payload: any,
    session: ClientSession
  ): Promise<SubmitDocument> {
    const document = new this.SubmitModel(payload)
    document?.setAuthor(this.request)

    return document.save({ session })
  }

  async create(payload: any): Promise<SubmitDocument> {
    const document = new this.SubmitModel(payload)
    document?.setAuthor(this.request)

    return document.save()
  }

  async update(id: string, payload: any): Promise<SubmitDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ ...payload }).save()
  }

  findOneAndUpdate(condition, payload: any): Promise<any> {
    return this.SubmitModel.findOneAndUpdate(condition, payload, {
      new: true
    })
  }

  async delete(id: string): Promise<SubmitDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }

  getAll(
    condition,
    project?: any,
    options?: any
  ): Promise<SubmitDocument[] | any[]> {
    return this.SubmitModel.find(condition, project, options)
  }

  findById(id): Promise<SubmitDocument> {
    return this.SubmitModel.findById(id)
  }

  findOne(
    condition: any,
    project?: any,
    options?: any
  ): Promise<SubmitDocument> {
    return this.SubmitModel.findOne(condition, project, options)
  }

  paginate(
    query: any,
    queryParam: GetSubmitDto,
    options?: PaginateOptions
  ): Promise<PaginateResult<SubmitDocument>> {
    const paginateOptions = {
      page: +queryParam.page,
      limit: +queryParam.limit,
      sort: { [queryParam.sortBy]: queryParam.sortOrder },
      ...options
    }

    return this.SubmitModel.paginate(query, paginateOptions)
  }
}
