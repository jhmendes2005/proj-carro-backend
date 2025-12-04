import { Module } from '@nestjs/common';
import { ConfigController } from './admin.controller'; // Se houver
import { ConfigService } from './admin.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ConfigController], // Se houver
  providers: [ConfigService, PrismaService],
  // ⚠️ CRUCIAL: Exporte o ConfigService para que outros módulos possam usá-lo
  exports: [ConfigService], 
})
export class AdminModule {}