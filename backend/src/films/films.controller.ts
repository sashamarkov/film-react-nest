import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { FilmResponseDto, SessionDto } from './dto/films.dto';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех фильмов' })
  @ApiResponse({
    status: 200,
    description: 'Список фильмов',
    type: [FilmResponseDto],
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Количество записей на странице (по умолчанию 20)',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Смещение для пагинации (по умолчанию 0)',
  })
  async getAllFilms(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;

    return this.filmsService.getAllFilms({
      limit: parsedLimit,
      offset: parsedOffset,
    });
  }

  @Get(':id/schedule')
  @ApiOperation({ summary: 'Получить расписание фильма по ID' })
  @ApiResponse({
    status: 200,
    description: 'Расписание сеансов',
    type: [SessionDto],
  })
  @ApiResponse({ status: 404, description: 'Фильм не найден' })
  async getFilmSchedule(@Param('id') id: string) {
    return this.filmsService.getFilmSchedule(id);
  }
}
