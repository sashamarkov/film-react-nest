import { FilmDocument } from '../films/schemas/film.schema';

export interface FilmRepositoryInterface {
  findAll(): Promise<FilmDocument[]>;
  findOneById(id: string): Promise<FilmDocument | null>;
  updateSeats(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<void>;
}
