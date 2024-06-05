import { Module } from '@nestjs/common'
import { MongooseProvider } from './providers/mongoose.provider'
import { MongooseModule } from '@nestjs/mongoose'
import { MongooseConfigService } from './config/mongoose.config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    })
  ],
  providers: [MongooseProvider],
  exports: [MongooseProvider]
})
export class DatabaseModule {}
