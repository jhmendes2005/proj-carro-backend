import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AuthModule } from './auth/auth.module';

import { ConfigController } from './admin/admin.controller';
import { ConfigService } from './admin/admin.service';
import { AnalyticsController } from './analytics/analytics.controller';
import { AnalyticsService } from './analytics/analytics.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VehiclesModule,
    AuthModule,
  ],
  // 2. Registrar os Controllers aqui para expor as rotas (/config e /analytics)
  controllers: [
    ConfigController,
    AnalyticsController,
  ],
  // 3. Registrar os Services aqui para que a lógica funcione
  providers: [
    PrismaService,
    ConfigService,
    AnalyticsService,
  ],
})
export class AppModule {}