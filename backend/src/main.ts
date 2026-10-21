import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown fields
      forbidNonWhitelisted: true, // reject requests that contain them
      transform: true, // turn plain objects into DTO instances
    })
  )
  await app.listen(process.env.PORT ?? 8000);
}
await bootstrap();
