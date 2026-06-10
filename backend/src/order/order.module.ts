import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
import { TypeOrmFilmRepository } from '../repository/typeorm-film.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'FilmRepository',
      useClass: TypeOrmFilmRepository,
    },
  ],
})
export class OrderModule {}