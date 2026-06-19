import { Film } from '../entities/film.entity';

export interface FilmRepositoryInterface {
  findAll(limit?: number, offset?: number): Promise<Film[]>;
  findOneById(id: string): Promise<Film | null>;
  updateSeats(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<void>;
  count(): Promise<number>;
  findByMultipleIds(ids: string[]): Promise<Film[]>;
}
