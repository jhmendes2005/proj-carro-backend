import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();

    // Log para depuração — confirma se o .env foi carregado corretamente
    console.log(
      '✅ DATABASE_URL detectado no PrismaService:',
      process.env.DATABASE_URL,
    );
  }

  async onModuleInit() {
    await this.$connect();
    console.log('🚀 Prisma conectado ao banco de dados com sucesso!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🧹 Prisma desconectado do banco de dados.');
  }
}
