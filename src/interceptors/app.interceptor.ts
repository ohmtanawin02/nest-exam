import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AppTransformers } from './app.transformer'
import { MongooseTransformers } from './mongoose.transformer'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(
    private readonly appTransformers: AppTransformers,
    private readonly mongooseTransformers: MongooseTransformers
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data?.isInAppRedirect) {
          return data
        }

        let response: any
        const objectKey = data ? Object.keys(data) : []
        if (data && data.docs) {
          response = this.mongooseTransformers.paginationTransformer(data)
        } else if (data && data._id) {
          response = this.mongooseTransformers.documentTransformer(data)
        } else if (data && Array.isArray(data)) {
          response = this.mongooseTransformers.arrayTransformer(data)
        } else if (data && data.accessToken) {
          response = this.mongooseTransformers.tokenTransformer(data)
        } else if (data && data.results) {
          response = this.mongooseTransformers.arrayAggregateTransformer(data)
        } else if (data && Array.isArray(data[objectKey[0]])) {
          response = this.mongooseTransformers.objectArrayTransformer(data)
        } else {
          response = this.appTransformers.defaultTransformer(data)
        }

        return response
      })
    )
  }
}
