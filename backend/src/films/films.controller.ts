import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmResponseDto, FilmScheduleResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<FilmResponseDto[]> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getFilmSchedule(
    @Param('id') id: string,
  ): Promise<FilmScheduleResponseDto> {
    return this.filmsService.getFilmSchedule(id);
  }
}
