import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import {
  CreateOrderDto,
  OrderResponseDto,
  OrderItemDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const { items } = createOrderDto;

    for (const item of items) {
      await this.checkAndBookSeat(item);
    }

    const orderId = Math.random().toString(36).substring(2, 15);
    return {
      id: orderId,
      items: items,
      createdAt: new Date(),
      status: 'confirmed',
    };
  }

  private async checkAndBookSeat(item: OrderItemDto): Promise<void> {
    const { filmId, sessionId, row, seat } = item;
    const seatKey = `${row}:${seat}`;

    const film = await this.filmModel.findOne({ id: filmId }).exec();
    if (!film) {
      throw new BadRequestException(`Film with id ${filmId} not found`);
    }

    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) {
      throw new BadRequestException(`Session with id ${sessionId} not found`);
    }

    if (session.taken.includes(seatKey)) {
      throw new BadRequestException(`Seat ${row}:${seat} is already taken`);
    }

    await this.filmModel
      .updateOne(
        { id: filmId, 'schedule.id': sessionId },
        { $push: { 'schedule.$.taken': seatKey } },
      )
      .exec();
  }
}
