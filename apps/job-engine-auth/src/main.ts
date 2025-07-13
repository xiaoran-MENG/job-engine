import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from 'types/proto/auth';
import { join } from 'path';
import { init } from '@job-engine/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await init(app);
  // GRPC
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/auth.proto')
    }
  });
  await app.startAllMicroservices();
}

bootstrap();
