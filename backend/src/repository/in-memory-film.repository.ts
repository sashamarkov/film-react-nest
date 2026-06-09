import { FilmDocument } from '../films/schemas/film.schema';
import { FilmRepositoryInterface } from './film.repository.interface';

export class InMemoryFilmRepository implements FilmRepositoryInterface {
  private films: FilmDocument[] = [];

  async findAll(): Promise<FilmDocument[]> {
    return this.films;
  }

  async findOneById(id: string): Promise<FilmDocument | null> {
    return this.films.find(film => film.id === id) || null;
  }

  async updateSeats(filmId: string, sessionId: string, seatKey: string): Promise<void> {
    const film = this.films.find(f => f.id === filmId);
    if (film) {
      const session = film.schedule.find(s => s.id === sessionId);
      if (session) {
        session.taken.push(seatKey);
      }
    }
  }

  setFilms(films: FilmDocument[]): void {
    this.films = films;
  }
}