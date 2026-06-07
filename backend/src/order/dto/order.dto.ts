export class OrderItemDto {
  filmId: string;
  sessionId: string;
  row: number;
  seat: number;
}

export class CreateOrderDto {
  items: OrderItemDto[];
}

export class OrderResponseDto {
  id: string;
  items: OrderItemDto[];
  createdAt: Date;
  status: string;
}
