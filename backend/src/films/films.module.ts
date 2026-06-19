import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { RepositoryModule } from '../repository/repository.module';
import { TypeOrmFilmRepository } from '../repository/typeorm-film.repository';

@Module({
  imports: [RepositoryModule],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: 'FilmRepository',
      useExisting: TypeOrmFilmRepository,
    },
  ],
  exports: ['FilmRepository'],
})
export class FilmsModule {}
