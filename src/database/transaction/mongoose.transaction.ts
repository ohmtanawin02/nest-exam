import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  BadGatewayException
} from '@nestjs/common'
import * as mongoose from 'mongoose'
import { MongooseProvider } from '../providers/mongoose.provider'

export async function runTransaction<T>(
  transactionActivity: (session: mongoose.ClientSession) => Promise<T>,
  fallbackActivity?: (errors: any) => Promise<T | void>,
  onCommitted?: (result?: T) => any
): Promise<T> {
  let result: T
  let rerun = true

  while (rerun) {
    const session = await MongooseProvider.startSession()
    session.startTransaction()

    try {
      result = await transactionActivity(session)
      await session.commitTransaction()

      rerun = false
    } catch (error) {
      await session.abortTransaction()
      const caseWriteConflict =
        error?.name === 'MongoError' && error?.code === 112
      const caseVersionError =
        error?.name === 'VersionError' && typeof error?.version === 'number'
      const isInExpectedErrorCase = caseWriteConflict || caseVersionError

      if (!isInExpectedErrorCase) {
        rerun = false

        if (!fallbackActivity) {
          if (error.status) {
            errorHandle(error)
          } else {
            throw error
          }
        }

        await fallbackActivity(error)
      }
    } finally {
      session.endSession()
    }
  }

  await onCommitted?.(result)

  return result
}
interface ErrorInterface {
  status: number
  message: string
  optional?: any
}

const errorHandle = (error: ErrorInterface) => {
  switch (error.status) {
    case 400:
      throw new BadRequestException(error.message)
    case 401:
      throw new UnauthorizedException(error.message)
    case 403:
      throw new ForbiddenException(error.message)
    case 404:
      throw new NotFoundException(error.message)
    case 502:
      throw new BadGatewayException(error.message)
    default:
      throw new InternalServerErrorException(error.message)
  }
}
