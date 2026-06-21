import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncPayloadDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('sync')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post()
  @ApiOperation({ summary: 'Push offline events to be synchronized' })
  pushEvents(@Request() req: any, @Body() syncPayload: SyncPayloadDto) {
    return this.syncService.processSync(req.user.userId, syncPayload);
  }

  @Get('status')
  @ApiOperation({ summary: 'Get status of synchronized events' })
  getStatus(@Request() req: any) {
    return this.syncService.getSyncStatus(req.user.userId);
  }
}
