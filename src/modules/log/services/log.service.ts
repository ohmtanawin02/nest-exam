/* eslint-disable prettier/prettier */
import { Inject, Injectable, Scope } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { LogPaginateDto } from '../dto/get-log.dto'
import { LogDocument } from '../schemas/log.schema'
import { PaginateModel, PaginateResult } from 'mongoose-paginate'
import { REQUEST } from '@nestjs/core'

@Injectable({ scope: Scope.REQUEST })
export class LogService {
  constructor(
    @InjectModel('log')
    private accessLogModel: PaginateModel<LogDocument>,
    @Inject(REQUEST) private request: any
  ) {}

  async create(createAccessLogDto: any): Promise<LogDocument> {
    const created = new this.accessLogModel(createAccessLogDto)
    created?.setAuthor(this.request)
    return created.save()
  }

  paginate(
    query: any,
    queryParam: LogPaginateDto
  ): Promise<PaginateResult<LogDocument>> {
    const options = {
      page: Number(queryParam.page),
      limit: Number(queryParam.limit),
      sort: { [queryParam.sortBy]: queryParam.sortOrder }
    }

    return this.accessLogModel.paginate(query, options)
  }
}
