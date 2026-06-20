import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import * as path from 'node:path';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { validationSchema } from './config/validation.schema';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema,
      validationOptions: {
        abortEarly: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get<string>('DATABASE_DRIVER') as 'postgres',
          url: configService.get<string>('DATABASE_URL'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [Film, Schedule],
          synchronize: false,
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
      serveStaticOptions: {
        index: false,
        fallthrough: false,
      },
    }),
    RepositoryModule,
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
