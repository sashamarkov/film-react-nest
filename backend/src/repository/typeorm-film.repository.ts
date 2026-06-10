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

  async findAll(limit: number = 20, offset: number = 0): Promise<any[]> {
    return this.filmRepository.find({
      relations: {
        schedule: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOneById(id: string): Promise<any | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: {
        schedule: true,
      },
    });
  }

  async updateSeats(filmId: string, sessionId: string, seatKey: string): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId, film_id: filmId },
    });
    if (schedule) {
      const taken = [...schedule.taken, seatKey];
      await this.scheduleRepository.update(schedule.id, { taken });
    }
  }

  async count(): Promise<number> {
    return this.filmRepository.count();
  }

  async findByMultipleIds(ids: string[]): Promise<any[]> {
    return this.filmRepository.find({
      where: { id: In(ids) },
      relations: {
        schedule: true,
      },
    });
  }
}