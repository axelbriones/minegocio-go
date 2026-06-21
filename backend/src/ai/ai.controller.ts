import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  @ApiOperation({ summary: 'AI Chat interaction (Placeholder)' })
  async chat(@Body() payload: any) {
    return {
      message: 'MIGO: Entiendo tu solicitud. Esta funcionalidad estará disponible próximamente.',
      status: 'pending_implementation'
    };
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'Get AI generated recommendations (Placeholder)' })
  async getRecommendations() {
    return [];
  }

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze image or data (Placeholder)' })
  async analyze(@Body() payload: any) {
    return {
      status: 'pending_implementation'
    };
  }
}
