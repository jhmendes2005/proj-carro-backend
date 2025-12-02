import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 Adicione esta linha
  //app.enableCors({
  //  origin: 'https://meu-site-de-carros.com', // Só permite seu site real
  //});
  app.enableCors();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();