import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { FilmRepositoryInterface } from '../repository/film.repository.interface';
import { ERROR_MESSAGES } from '../common/error-messages';

interface GetAllFilmsOptions {
  limit: number;
  offset: number;
}

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FilmRepository')
    private readonly filmRepository: FilmRepositoryInterface,
  ) {}

  async getAllFilms(options: GetAllFilmsOptions) {
    const { limit, offset } = options;
    const films = await this.filmRepository.findAll(limit, offset);
    const total = await this.filmRepository.count();

    const items = films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director || '',
      tags: film.tags || [],
      title: film.title,
      about: film.about || film.description,
      description: film.description,
      image: film.image,
      cover: film.cover,
    }));

    return {
      total,
      limit,
      offset,
      items,
    };
  }

  async getFilmSchedule(id: string) {
    const film = await this.filmRepository.findOneById(id);
    if (!film) {
      throw new NotFoundException(ERROR_MESSAGES.FILM_NOT_FOUND(id));
    }

    const items = film.schedule.map((session) => ({
      id: session.id,
      film: film.id,
      daytime: session.daytime,
      hall: session.hall,
      rows: session.rows || 10,
      seats: session.seats || 10,
      price: session.price,
      taken: session.taken || [],
    }));

    return {
      total: items.length,
      items,
    };
  }

  async getTotalCount(): Promise<number> {
    return this.filmRepository.count();
  }
}
