import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthGuard } from 'src/modules/auth/guards/user-auth.guard'
import { LogPaginateDto } from '../dto/get-log.dto'
import { LogService } from '../services/log.service'
@ApiBearerAuth()
@ApiTags('logs')
@Controller('logs')
@UseGuards(UserAuthGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @ApiOperation({ summary: 'Get Log List' })
  async getAccessLog(@Query() query: LogPaginateDto) {
    return await this.logService.paginate(query.buildQuery(), query)
  }
}
