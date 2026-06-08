import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  async getAllFilms() {
    const items = await this.filmsService.getAllFilms();
    return { total: items.length, items };
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
    const items = await this.filmsService.getFilmSchedule(id);
    return { total: items.length, items };
  }
}
