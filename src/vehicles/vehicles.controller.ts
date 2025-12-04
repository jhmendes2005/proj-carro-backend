import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
// Ajuste o caminho do import conforme a estrutura das suas pastas (ex: ../config/admin.service)
import { ConfigService } from '../admin/admin.service'; 

@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly configService: ConfigService // <--- 1. Injeção do ConfigService
  ) {}

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

  @Get()
  findAll(
    @Query('q') q?: string,
    @Query('marca') marca?: string,
    @Query('modelo') modelo?: string,
    @Query('tipo') tipo?: string,
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
      tipo,
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

  // --- 2. Endpoint de Processamento Inteligente ---
  // Usei @Get para facilitar o uso em Crons simples (wget/curl/navegador)
  @Post('process')
  async processJson(@Query('url') url?: string, @Query('type') type?: string) {
    let targetUrl = url;
    // Não definimos o padrão 'ALTIMUS' imediatamente para dar chance de pegar do banco
    let targetType = type; 

    // Se a URL não foi passada via parâmetro, busca no banco de dados
    if (!targetUrl) {
      console.log('🔄 [Cron] URL não fornecida. Buscando configuração no banco de dados...');
      const config = await this.configService.getConfig();
      
      if (config) {
        // 1. Busca URL (apiUrl)
        if (config.apiUrl) {
          targetUrl = config.apiUrl;
          console.log(`✅ [Cron] Configuração encontrada: ${targetUrl}`);
        } else {
          console.error('❌ [Cron] Configuração existe, mas campo "apiUrl" está vazio.');
        }

        // 2. Busca Tipo (apiType) se não foi passado na query
        if (!targetType && config.apiType) {
            targetType = config.apiType;
            console.log(`✅ [Cron] Tipo de API encontrado no banco: ${targetType}`);
        }
      } else {
        console.error('❌ [Cron] Nenhuma configuração encontrada no banco.');
      }
    }

    // Se ainda não tiver tipo definido (nem query nem banco), usa o padrão
    const finalType = targetType || 'ALTIMUS';

    if (!targetUrl) {
      return { 
        status: 'error', 
        message: 'Parâmetro "url" é obrigatório via Query ou deve estar salvo em Configurações (campo: apiUrl).' 
      };
    }

    // Chama o serviço com a URL e TIPO definidos
    return this.vehiclesService.processFromJson(targetUrl, finalType);
  }
}