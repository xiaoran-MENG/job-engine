import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { init } from '@job-engine/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await init(app);
}

bootstrap();
