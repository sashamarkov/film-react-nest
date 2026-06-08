import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import { ERROR_MESSAGES } from '../common/error-messages';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async getAllFilms() {
    const films = await this.filmModel.find().exec();
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
    const film = await this.filmModel.findOne({ id }).exec();
    if (!film) {
      throw new NotFoundException(ERROR_MESSAGES.FILM_NOT_FOUND(id));
    }
    return film.schedule.map((session) => ({
      id: session.id,
      film: film.id,
      daytime: session.daytime,
      hall: session.hall.toString(),
      rows: session.rows || 10,
      seats: session.seats || 10,
      price: session.price,
      taken: session.taken || [],
    }));
  }
}
