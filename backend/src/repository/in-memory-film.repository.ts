import { FilmDocument } from '../films/schemas/film.schema';
import { FilmRepositoryInterface } from './film.repository.interface';

export class InMemoryFilmRepository implements FilmRepositoryInterface {
  private films: FilmDocument[] = [];

  async findAll(limit: number = 20, offset: number = 0): Promise<FilmDocument[]> {
    return this.films.slice(offset, offset + limit);
  }

  async findOneById(id: string): Promise<FilmDocument | null> {
    return this.films.find((film) => film.id === id) || null;
  }

  async updateSeats(filmId: string, sessionId: string, seatKey: string): Promise<void> {
    const film = this.films.find((f) => f.id === filmId);
    if (film) {
      const session = film.schedule.find((s) => s.id === sessionId);
      if (session) {
        session.taken.push(seatKey);
      }
    }
  }

  async count(): Promise<number> {
    return this.films.length;
  }

  async findByMultipleIds(ids: string[]): Promise<FilmDocument[]> {
    return this.films.filter((film) => ids.includes(film.id));
  }

  setFilms(films: FilmDocument[]): void {
    this.films = films;
  }
}