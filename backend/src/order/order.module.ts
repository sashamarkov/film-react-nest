import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { RepositoryModule } from '../repository/repository.module';
import { TypeOrmFilmRepository } from '../repository/typeorm-film.repository';

@Module({
  imports: [RepositoryModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'FilmRepository',
      useExisting: TypeOrmFilmRepository,
    },
  ],
})
export class OrderModule {}
