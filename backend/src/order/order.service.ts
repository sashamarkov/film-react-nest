import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FilmRepositoryInterface } from '../repository/film.repository.interface';
import { ERROR_MESSAGES } from '../common/error-messages';
import { CreateOrderDto, OrderTicketDto, OrderResponseDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('FilmRepository') private readonly filmRepository: FilmRepositoryInterface,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto[]> {
    const { tickets } = createOrderDto;
    const results: OrderResponseDto[] = [];

    for (const ticket of tickets) {
      const result = await this.checkAndBookTicket(ticket);
      results.push(result);
    }

    return results;
  }

  private async checkAndBookTicket(ticket: OrderTicketDto): Promise<OrderResponseDto> {
    const { film: filmId, session: sessionId, row, seat } = ticket;
    const seatKey = `${row}:${seat}`;

    const film = await this.filmRepository.findOneById(filmId);
    if (!film) {
      throw new BadRequestException(ERROR_MESSAGES.FILM_NOT_FOUND(filmId));
    }

    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) {
      throw new BadRequestException(ERROR_MESSAGES.SESSION_NOT_FOUND(sessionId));
    }

    if (session.taken.includes(seatKey)) {
      throw new BadRequestException(ERROR_MESSAGES.SEAT_ALREADY_TAKEN(row, seat));
    }

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