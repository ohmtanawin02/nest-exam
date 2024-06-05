/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { globalMethodPlugin } from '../plugins/global-method.plugin'
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    mongoose.plugin(globalMethodPlugin)
    mongoose.set('toObject', {
      transform(doc: any, { _id, __v, id, ...filter }: any, options: any) {
        const filterId = _id || id

        if (!filterId) {
          return filter
        }

        filter.id = typeof filterId === 'object' ? String(filterId) : filterId

        return filter
      }
    })

    return {
      uri: process.env.MONGODB_URI
    }
  }
}
