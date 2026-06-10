import { FilmDocument } from '../films/schemas/film.schema';

export interface FilmRepositoryInterface {
  findAll(limit?: number, offset?: number): Promise<FilmDocument[]>;
  findOneById(id: string): Promise<FilmDocument | null>;
  updateSeats(filmId: string, sessionId: string, seatKey: string): Promise<void>;
  count(): Promise<number>;
  findByMultipleIds(ids: string[]): Promise<FilmDocument[]>;
}
