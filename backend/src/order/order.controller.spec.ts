import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('должен создавать заказ и возвращать список билетов с общим количеством', async () => {
      const createOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+79261234567',
        tickets: [
          {
            film: 'film-id',
            session: 'session-id',
            row: 1,
            seat: 1,
            daytime: '2024-06-28T10:00:53+03:00',
            day: '2024-06-28',
            time: '10:00',
            price: 350,
          },
        ],
      };

      const expectedItems = [
        {
          id: 'order-id',
          film: 'film-id',
          session: 'session-id',
          row: 1,
          seat: 1,
          daytime: '2024-06-28T10:00:53+03:00',
          price: 350,
        },
      ];

      mockOrderService.createOrder.mockResolvedValue(expectedItems);

      const result = await controller.createOrder(createOrderDto);

      expect(service.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual({
        total: expectedItems.length,
        items: expectedItems,
      });
    });

    it('должен возвращать пустой список, если билетов нет', async () => {
      const createOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+79261234567',
        tickets: [],
      };

      mockOrderService.createOrder.mockResolvedValue([]);

      const result = await controller.createOrder(createOrderDto);

      expect(result).toEqual({
        total: 0,
        items: [],
      });
    });
  });
});
