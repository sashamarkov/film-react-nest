import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    getAllFilms: jest.fn(),
    getFilmSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllFilms', () => {
    it('должен возвращать список фильмов с пагинацией по умолчанию', async () => {
      const expectedResult = {
        total: 10,
        limit: 20,
        offset: 0,
        items: [],
      };
      mockFilmsService.getAllFilms.mockResolvedValue(expectedResult);

      const result = await controller.getAllFilms(undefined, undefined);

      expect(service.getAllFilms).toHaveBeenCalledWith({
        limit: 20,
        offset: 0,
      });
      expect(result).toBe(expectedResult);
    });

    it('должен возвращать список фильмов с кастомной пагинацией', async () => {
      const expectedResult = {
        total: 10,
        limit: 5,
        offset: 10,
        items: [],
      };
      mockFilmsService.getAllFilms.mockResolvedValue(expectedResult);

      const result = await controller.getAllFilms('5', '10');

      expect(service.getAllFilms).toHaveBeenCalledWith({
        limit: 5,
        offset: 10,
      });
      expect(result).toBe(expectedResult);
    });
  });

  describe('getFilmSchedule', () => {
    it('должен возвращать расписание фильма по id', async () => {
      const filmId = 'test-id';
      const expectedResult = {
        total: 2,
        items: [],
      };
      mockFilmsService.getFilmSchedule.mockResolvedValue(expectedResult);

      const result = await controller.getFilmSchedule(filmId);

      expect(service.getFilmSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toBe(expectedResult);
    });
  });
});
