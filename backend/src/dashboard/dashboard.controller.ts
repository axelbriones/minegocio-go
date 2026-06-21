import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('critical-stock')
  @ApiOperation({ summary: 'Get critical stock' })
  getCriticalStock(@Request() req: any) {
    // Note: Assuming auth guard sets companyId or user object has access
    // For MVP/Demo purposes, we will assume req.user has companyId or we use userId to fetch
    return this.dashboardService.getCriticalStock(req.user.companyId || req.user.userId);
  }

  @Get('slow-moving')
  @ApiOperation({ summary: 'Get slow moving products' })
  getSlowMovingProducts(@Request() req: any) {
    return this.dashboardService.getSlowMovingProducts(req.user.companyId || req.user.userId);
  }

  @Get('top-selling')
  @ApiOperation({ summary: 'Get top selling products' })
  getTopSellingProducts(@Request() req: any) {
    return this.dashboardService.getTopSellingProducts(req.user.companyId || req.user.userId);
  }

  @Get('recent-movements')
  @ApiOperation({ summary: 'Get recent movements' })
  getRecentMovements(@Request() req: any) {
    return this.dashboardService.getRecentMovements(req.user.companyId || req.user.userId);
  }

  @Get('valued-inventory')
  @ApiOperation({ summary: 'Get valued inventory summary' })
  getValuedInventory(@Request() req: any) {
    return this.dashboardService.getValuedInventory(req.user.companyId || req.user.userId);
  }

  @Get('alerts')
  @ApiOperation({ summary: 'Get recent system and AI alerts' })
  getAlerts(@Request() req: any) {
    return this.dashboardService.getAlerts(req.user.companyId || req.user.userId);
  }
}
