import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
import { TypeOrmFilmRepository } from './typeorm-film.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  providers: [TypeOrmFilmRepository],
  exports: [TypeOrmFilmRepository],
})
export class RepositoryModule {}
