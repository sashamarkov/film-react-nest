import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import { ERROR_MESSAGES } from '../common/error-messages';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async createOrder(createOrderDto: any) {
    const { tickets } = createOrderDto;
    const results = [];

    for (const ticket of tickets) {
      const result = await this.checkAndBookTicket(ticket);
      results.push(result);
    }

    return results;
  }

  private async checkAndBookTicket(ticket: any) {
    const { film: filmId, session: sessionId, row, seat } = ticket;
    const seatKey = `${row}:${seat}`;

    const film = await this.filmModel.findOne({ id: filmId }).exec();
    if (!film) {
      throw new BadRequestException(ERROR_MESSAGES.FILM_NOT_FOUND(filmId));
    }

    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) {
      throw new BadRequestException(
        ERROR_MESSAGES.SESSION_NOT_FOUND(sessionId),
      );
    }

    if (session.taken.includes(seatKey)) {
      throw new BadRequestException(
        ERROR_MESSAGES.SEAT_ALREADY_TAKEN(row, seat),
      );
    }

    await this.filmModel
      .updateOne(
        { id: filmId, 'schedule.id': sessionId },
        { $push: { 'schedule.$.taken': seatKey } },
      )
      .exec();

    const orderId = Math.random().toString(36).substring(2, 15);
    return {
      id: orderId,
      film: filmId,
      session: sessionId,
      row,
      seat,
      daytime: session.daytime,
      price: session.price,
    };
  }
}
