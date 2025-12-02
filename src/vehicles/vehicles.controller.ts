import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  // ... (outros métodos search, featured, filters mantidos) ...
  @Get('search')
  searchVehicles(@Query('q') query: string) { return this.vehiclesService.search(query); }

  @Get('featured')
  getFeaturedVehicles(@Query('count') count?: string) {
    return this.vehiclesService.findFeatured(Number(count) || 6);
  }

  @Get('filters/brands')
  getFilterBrands() { return this.vehiclesService.getFilterBrands(); }

  @Get('filters/models')
  getFilterModels(@Query('brand') brand: string) { return this.vehiclesService.getFilterModels(brand); }

  @Get('filters/years')
  getFilterYears() { return this.vehiclesService.getFilterYears(); }

  // --- ATUALIZAÇÃO AQUI: ADICIONADO 'TIPO' ---
  @Get()
  findAll(
    @Query('q') q?: string,
    @Query('marca') marca?: string,
    @Query('modelo') modelo?: string,
    @Query('tipo') tipo?: string, // <--- Novo parâmetro
    @Query('ano_min') anoMin?: string,
    @Query('ano_max') anoMax?: string,
    @Query('preco_min') precoMin?: string,
    @Query('preco_max') precoMax?: string,
    @Query('sort') sort?: string,
  ) {
    return this.vehiclesService.findAll({
      q,
      marca,
      modelo,
      tipo, // <--- Passando para o serviço
      anoMin: anoMin ? Number(anoMin) : undefined,
      anoMax: anoMax ? Number(anoMax) : undefined,
      precoMin: precoMin ? Number(precoMin) : undefined,
      precoMax: precoMax ? Number(precoMax) : undefined,
      sort,
    });
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) { return this.vehiclesService.findOne(slug); }

  @Post()
  create(@Body() data: any) { return this.vehiclesService.create(data); }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) { return this.vehiclesService.update(Number(id), data); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.vehiclesService.remove(Number(id)); }

  @Post('process')
  async processJson(@Query('url') url: string, @Query('type') type: string) {
    if (!url) return { message: 'Parâmetro "url" é obrigatório.' };
    return this.vehiclesService.processFromJson(url, type || 'ALTIMUS');
  }
}