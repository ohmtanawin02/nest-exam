import { Injectable } from '@nestjs/common'
import { LogService } from '../services/log.service'

@Injectable()
export class LogLogic {
  constructor(private readonly accessLogService: LogService) {}

  async createLogic(request, note, response) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const requestIp = require('request-ip')

    const reqIp = request.clientIp
      ? request.clientIp
      : requestIp.getClientIp(request)
    const payload = {
      ip: reqIp,
      baseUrl: request.baseUrl,
      originalUrl: request.originalUrl,
      headers: request.headers,
      body: request.body,
      params: request.params,
      query: request.query,
      method: request.method,
      note,
      response
    }

    return await this.accessLogService.create(payload)
  }
}
