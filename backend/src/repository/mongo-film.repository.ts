import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import { FilmRepositoryInterface } from './film.repository.interface';

@Injectable()
export class MongoFilmRepository implements FilmRepositoryInterface {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(limit: number = 20, offset: number = 0): Promise<FilmDocument[]> {
    return this.filmModel.find().skip(offset).limit(limit).exec();
  }

  async findOneById(id: string): Promise<FilmDocument | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async updateSeats(filmId: string, sessionId: string, seatKey: string): Promise<void> {
    await this.filmModel
      .updateOne(
        { id: filmId, 'schedule.id': sessionId },
        { $push: { 'schedule.$.taken': seatKey } },
      )
      .exec();
  }

  async count(): Promise<number> {
    return this.filmModel.countDocuments().exec();
  }

  async findByMultipleIds(ids: string[]): Promise<FilmDocument[]> {
    return this.filmModel.find({ id: { $in: ids } }).exec();
  }
}