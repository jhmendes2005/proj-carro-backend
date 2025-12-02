import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ConfigService } from './admin.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async getConfig() {
    const config = await this.configService.getConfig();
    return config || null; // Retorna null se não houver config ainda
  }

  @Post()
  create(@Body() data: any) {
    return this.configService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.configService.update(Number(id), data);
  }
}