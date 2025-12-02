import { Controller, Get, Post, Body } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // Rota para o frontend enviar dados: POST /analytics/log
  @Post('log')
  logEvent(@Body() data: any) {
    return this.analyticsService.logEvent(data);
  }

  // Rota para o admin pegar o resumo: GET /analytics/summary
  @Get('summary')
  getSummary() {
    return this.analyticsService.getSummary();
  }
}