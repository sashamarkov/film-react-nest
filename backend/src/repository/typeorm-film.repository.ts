import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
import { FilmRepositoryInterface } from './film.repository.interface';

@Injectable()
export class TypeOrmFilmRepository implements FilmRepositoryInterface {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  private parseTakenValue(taken: any): string[] {
    if (Array.isArray(taken)) {
      return taken;
    }
    if (typeof taken === 'string') {
      try {
        const parsed = JSON.parse(taken);
        if (Array.isArray(parsed)) {
          return parsed;
        }
        return [];
      } catch {
        return [];
      }
    }
    return [];
  }

  async findAll(limit: number = 20, offset: number = 0): Promise<Film[]> {
    const films = await this.filmRepository.find({
      relations: {
        schedule: true,
      },
      skip: offset,
      take: limit,
    });

    return films.map((film) => ({
      ...film,
      schedule: film.schedule.map((session) => ({
        ...session,
        taken: this.parseTakenValue(session.taken),
      })),
    }));
  }

  async findOneById(id: string): Promise<Film | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: {
        schedule: true,
      },
    });

    if (film) {
      film.schedule = film.schedule.map((session) => ({
        ...session,
        taken: this.parseTakenValue(session.taken),
      }));
    }

    return film;
  }

  async updateSeats(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId, film_id: filmId },
    });
    if (schedule) {
      const currentTaken = this.parseTakenValue(schedule.taken);
      const updatedTaken = [...currentTaken, seatKey];
      await this.scheduleRepository.update(
        { id: sessionId },
        { taken: updatedTaken },
      );
    }
  }

  async count(): Promise<number> {
    return this.filmRepository.count();
  }

  async findByMultipleIds(ids: string[]): Promise<Film[]> {
    const films = await this.filmRepository.find({
      where: { id: In(ids) },
      relations: {
        schedule: true,
      },
    });

    return films.map((film) => ({
      ...film,
      schedule: film.schedule.map((session) => ({
        ...session,
        taken: this.parseTakenValue(session.taken),
      })),
    }));
  }
}
