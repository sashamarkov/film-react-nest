import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms() {
    const items = await this.filmsService.getAllFilms();
    return { total: items.length, items };
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    const items = await this.filmsService.getFilmSchedule(id);
    return { total: items.length, items };
  }
}
