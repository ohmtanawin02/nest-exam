/* eslint-disable @typescript-eslint/ban-types */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: object, metadata: ArgumentMetadata) {
    const { metatype, type } = metadata
    if (type === 'body' && !value) {
      throw new BadRequestException('No body submitted')
    }
    if (type === 'body' && value instanceof Object && this.isEmpty(value)) {
      throw new BadRequestException('No body submitted')
    }
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    const errors = await validate(object, { whitelist: true })
    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors))
    }

    return object
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]

    return !types.includes(metatype)
  }

  private formatErrors(errors: any[]) {
    return errors.map((err) => {
      const lastChild = this.checkChild(err)
      for (const property in lastChild.constraints) {
        if (lastChild.constraints.hasOwnProperty(property)) {
          return lastChild.constraints[property]
        }
      }
    })
  }

  private checkChild(obj: any) {
    if ((obj.children && obj.children.length === 0) || !obj.children) {
      return obj
    }

    return this.checkChild(obj.children[0])
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) {
      return false
    }

    return true
  }
}
