import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3030);
}
bootstrap();
