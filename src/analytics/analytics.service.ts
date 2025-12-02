import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  // Salva um novo evento (clique ou visualização)
  async logEvent(data: { tipo: string; url?: string; metadata?: any }) {
    return this.prisma.analytics_log.create({
      data: {
        tipo: data.tipo,
        url: data.url,
        metadata: data.metadata || {},
      },
    });
  }

  // Gera os números para o Dashboard
  async getSummary() {
    // Conta quantos registros existem de cada tipo
    const views = await this.prisma.analytics_log.count({
      where: { tipo: 'page_view' },
    });

    const whatsapp = await this.prisma.analytics_log.count({
      where: { tipo: 'whatsapp_click' },
    });

    const shares = await this.prisma.analytics_log.count({
      where: { tipo: 'share_click' },
    });

    return {
      views,
      whatsapp,
      shares,
    };
  }
}