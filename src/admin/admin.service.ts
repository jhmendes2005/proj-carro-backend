import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ConfigService {
  constructor(private prisma: PrismaService) {}

  // Busca a configuração atual (assumindo que só existe uma)
  async getConfig() {
    return this.prisma.configsite.findFirst();
  }

  // Cria a configuração inicial
  async create(data: any) {
    return this.prisma.configsite.create({ data });
  }

  // Atualiza a configuração existente
  async update(id: number, data: any) {
    return this.prisma.configsite.update({
      where: { id },
      data,
    });
  }
}