import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Забронировать билеты' })
  @ApiResponse({
    status: 201,
    description: 'Билеты успешно забронированы',
    type: [OrderResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка валидации или место уже занято',
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const items = await this.orderService.createOrder(createOrderDto);
    return { total: items.length, items };
  }
}
