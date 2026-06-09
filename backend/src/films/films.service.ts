import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { FilmRepositoryInterface } from '../repository/film.repository.interface';
import { ERROR_MESSAGES } from '../common/error-messages';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FilmRepository') private readonly filmRepository: FilmRepositoryInterface,
  ) {}

  async getAllFilms() {
    const films = await this.filmRepository.findAll();
    return films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director || '',
      tags: film.tags || [],
      title: film.title,
      about: film.about || film.description,
      description: film.description,
      image: `/content/afisha${film.image}`,
      cover: `/content/afisha${film.cover}`,
    }));
  }

  async getFilmSchedule(id: string) {
    const film = await this.filmRepository.findOneById(id);
    if (!film) {
      throw new NotFoundException(ERROR_MESSAGES.FILM_NOT_FOUND(id));
    }
    return film.schedule.map((session) => ({
      id: session.id,
      film: film.id,
      daytime: session.daytime,
      hall: session.hall,
      rows: session.rows || 10,
      seats: session.seats || 10,
      price: session.price,
      taken: session.taken || [],
    }));
  }
}