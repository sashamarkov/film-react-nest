import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import { FilmRepositoryInterface } from './film.repository.interface';

@Injectable()
export class MongoFilmRepository implements FilmRepositoryInterface {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<FilmDocument>,
  ) {}

  async findAll(): Promise<FilmDocument[]> {
    return this.filmModel.find().exec();
  }

  async findOneById(id: string): Promise<FilmDocument | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async updateSeats(filmId: string, sessionId: string, seatKey: string): Promise<void> {
    await this.filmModel.updateOne(
      { id: filmId, 'schedule.id': sessionId },
      { $push: { 'schedule.$.taken': seatKey } },
    ).exec();
  }
}