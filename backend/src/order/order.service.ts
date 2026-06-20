import {
  Injectable,
  BadRequestException,
  Inject,
  Logger,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FilmRepositoryInterface } from '../repository/film.repository.interface';
import { ERROR_MESSAGES } from '../common/error-messages';
import {
  CreateOrderDto,
  OrderTicketDto,
  OrderResponseDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject('FilmRepository')
    private readonly filmRepository: FilmRepositoryInterface,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto[]> {
    const { tickets } = createOrderDto;
    const results: OrderResponseDto[] = [];

    const uniqueFilmIds = [...new Set(tickets.map((t) => t.film))];
    const films = await this.filmRepository.findByMultipleIds(uniqueFilmIds);
    const filmsMap = new Map(films.map((film) => [film.id, film]));

    for (const ticket of tickets) {
      const result = await this.checkAndBookTicketWithCache(ticket, filmsMap);
      results.push(result);
    }

    return results;
  }

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

  private async checkAndBookTicketWithCache(
    ticket: OrderTicketDto,
    filmsMap: Map<string, any>,
  ): Promise<OrderResponseDto> {
    const { film: filmId, session: sessionId, row, seat } = ticket;
    const seatKey = `${row}:${seat}`;

    const film = filmsMap.get(filmId);
    if (!film) {
      throw new BadRequestException(ERROR_MESSAGES.FILM_NOT_FOUND(filmId));
    }

    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) {
      throw new BadRequestException(
        ERROR_MESSAGES.SESSION_NOT_FOUND(sessionId),
      );
    }

    const takenArray = this.parseTakenValue(session.taken);

    if (takenArray.includes(seatKey)) {
      throw new BadRequestException(
        ERROR_MESSAGES.SEAT_ALREADY_TAKEN(row, seat),
      );
    }

    takenArray.push(seatKey);
    await this.filmRepository.updateSeats(filmId, sessionId, seatKey);

    return {
      id: randomUUID(),
      film: filmId,
      session: sessionId,
      row,
      seat,
      daytime: session.daytime,
      price: session.price,
    };
  }
}
