import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//import * as morgan from 'morgan';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(morgan('dev'));
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
