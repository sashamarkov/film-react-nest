import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import {
  FilmResponseDto,
  FilmScheduleResponseDto,
  SessionDto,
} from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async getAllFilms(): Promise<FilmResponseDto[]> {
    const films = await this.filmModel.find().exec();
    return films.map((film) => ({
      id: film.id,
      title: film.title,
      poster: film.poster,
      description: film.description,
      duration: film.duration,
      genre: film.genre,
      releaseYear: film.releaseYear,
      rating: film.rating,
    }));
  }

  async getFilmSchedule(id: string): Promise<FilmScheduleResponseDto> {
    const film = await this.filmModel.findOne({ id }).exec();
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }
    const schedule: SessionDto[] = film.schedule.map((session) => ({
      id: session.id,
      date: session.date,
      time: session.time,
      hall: session.hall,
      price: session.price,
      taken: session.taken,
    }));
    return {
      id: film.id,
      title: film.title,
      poster: film.poster,
      description: film.description,
      duration: film.duration,
      genre: film.genre,
      releaseYear: film.releaseYear,
      rating: film.rating,
      schedule,
    };
  }
}
