import { Injectable } from '@nestjs/common'
import * as humps from 'humps'

@Injectable()
export class AppTransformers {
  defaultTransformer(data: any): any {
    const response = {
      message: 'done',
      data: humps.decamelizeKeys(data)
    }

    return response
  }
}
