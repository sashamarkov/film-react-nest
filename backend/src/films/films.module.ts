import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
import { TypeOrmFilmRepository } from '../repository/typeorm-film.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: 'FilmRepository',
      useClass: TypeOrmFilmRepository,
    },
  ],
  exports: ['FilmRepository'],
})
export class FilmsModule {}