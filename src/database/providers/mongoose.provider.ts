import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection, ClientSession, Model, Document } from 'mongoose'

@Injectable()
export class MongooseProvider {
  private static _this: MongooseProvider

  constructor(@InjectConnection() public readonly connection: Connection) {
    MongooseProvider._this = this
  }

  static getModel<T extends Document = any>(modelName): Model<T> {
    return MongooseProvider._this.connection.models[modelName]
  }

  static async startSession(): Promise<ClientSession> {
    return MongooseProvider._this.connection.startSession()
  }
}
