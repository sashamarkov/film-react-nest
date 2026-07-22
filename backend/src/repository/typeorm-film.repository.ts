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

  async findAll(limit: number = 20, offset: number = 0): Promise<Film[]> {
    const films = await this.filmRepository.find({
      relations: {
        schedule: true,
      },
      skip: offset,
      take: limit,
    });

    return films;
  }

  async findOneById(id: string): Promise<Film | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: {
        schedule: true,
      },
    });

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
      const currentTaken = schedule.taken;
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
    return this.filmRepository.find({
      where: { id: In(ids) },
      relations: {
        schedule: true,
      },
    });
  }
}
