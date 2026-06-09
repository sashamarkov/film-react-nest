import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Film, FilmSchema } from '../films/schemas/film.schema';
import { MongoFilmRepository } from '../repository/mongo-film.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'FilmRepository',
      useClass: MongoFilmRepository,
    },
  ],
})
export class OrderModule {}
