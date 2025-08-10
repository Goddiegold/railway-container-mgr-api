/* eslint-disable @typescript-eslint/no-unsafe-call */
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(morgan('dev'));
  app.enableCors({
    credentials: true,
    origin: Config.ALLOWED_ORIGINS?.split(','),
    allowedHeaders: ['content-type', 'Accept', 'Origin', 'Authorization'],
    exposedHeaders: ['Authorization'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE', 'PATCH'],
  });
  await app.listen(Config.WEB_SERVER_PORT);

  console.log(`✅ Application is running on: ${await app.getUrl()}`);
}

bootstrap();
