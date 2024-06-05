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
import { GetUserDto } from '../dto/get-user.dto'
import { UserDocument } from '../schema/user.schema'

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly UserModel:
      | Model<UserDocument>
      | PaginateModel<UserDocument>
      | any,
    @Inject(REQUEST) private request: any
  ) {}

  async resolveByUrl({ id }): Promise<UserDocument | any> {
    return this.UserModel.findById({ _id: id })
  }

  getModel(): Model<UserDocument> {
    return this.UserModel
  }

  async getSession(): Promise<ClientSession> {
    await this.UserModel.createCollection()

    return await this.UserModel.startSession()
  }

  async isExists(condition: any): Promise<boolean> {
    const result = await this.UserModel.findOne(condition)

    return !!result
  }

  async transactionCreateMany(
    payload: any[],
    session: ClientSession,
    options?: any
  ): Promise<UserDocument[]> {
    return this.UserModel.insertMany(payload, {
      session,
      ...options
    })
  }

  async createMany(payload: any[], options?: any) {
    return this.UserModel.insertMany(payload, options)
  }
  updateMany(
    condition: any,
    payload: any,
    options?: any
  ): Promise<UserDocument[]> {
    return this.UserModel.updateMany(condition, { $set: payload }, options)
  }

  async transactionUpdatePayload(
    condition: any,
    payload: any,
    session: ClientSession,
    options?: any
  ): Promise<UserDocument> {
    return this.UserModel.findOneAndUpdate(condition, payload, {
      session,
      ...options
    })
  }
  async transactionUpdate(
    condition: any,
    payload: any,
    session: ClientSession
  ): Promise<UserDocument> {
    return this.UserModel.updateOne(condition, { $set: payload }, { session })
  }

  async transactionUpdateMany(
    condition: any,
    payload: any,
    session: ClientSession
  ): Promise<UserDocument[]> {
    return this.UserModel.updateMany(condition, { $set: payload }, { session })
  }

  async transactionCreate(
    payload: any,
    session: ClientSession
  ): Promise<UserDocument> {
    const document = new this.UserModel(payload)
    document?.setAuthor(this.request)

    return document.save({ session })
  }

  async create(payload: any): Promise<UserDocument> {
    const document = new this.UserModel(payload)
    document?.setAuthor(this.request)

    return document.save()
  }

  async update(id: string, payload: any): Promise<UserDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ ...payload }).save()
  }

  findOneAndUpdate(condition, payload: any): Promise<any> {
    return this.UserModel.findOneAndUpdate(condition, payload, {
      new: true
    })
  }

  async delete(id: string): Promise<UserDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }

  getAll(
    condition,
    project?: any,
    options?: any
  ): Promise<UserDocument[] | any[]> {
    return this.UserModel.find(condition, project, options)
  }

  findById(id): Promise<UserDocument> {
    return this.UserModel.findById(id)
  }

  findOne(condition: any, project?: any, options?: any): Promise<UserDocument> {
    return this.UserModel.findOne(condition, project, options).populate(
      'vehicleTypes',
      'name logoImage'
    )
  }

  paginate(
    query: any,
    queryParam: GetUserDto,
    options?: PaginateOptions
  ): Promise<PaginateResult<UserDocument>> {
    const paginateOptions = {
      page: +queryParam.page,
      limit: +queryParam.limit,
      sort: { [queryParam.sortBy]: queryParam.sortOrder },
      ...options,
      populate: { path: 'vehicleTypes', select: 'name logoImage' }
    }

    return this.UserModel.paginate(query, paginateOptions)
  }
}
