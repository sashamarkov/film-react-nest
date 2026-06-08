import { ApiProperty } from '@nestjs/swagger';

export class FilmResponseDto {
  @ApiProperty({ example: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf' })
  id: string;

  @ApiProperty({ example: 'Архитекторы общества' })
  title: string;

  @ApiProperty({ example: 2.9 })
  rating: number;

  @ApiProperty({ example: 'Итан Райт' })
  director: string;

  @ApiProperty({ example: ['Документальный'] })
  tags: string[];

  @ApiProperty({
    example:
      'Документальный фильм, исследующий влияние искусственного интеллекта...',
  })
  about: string;

  @ApiProperty({ example: 'Полное описание фильма...' })
  description: string;

  @ApiProperty({ example: '/content/afisha/bg1s.jpg' })
  image: string;

  @ApiProperty({ example: '/content/afisha/bg1c.jpg' })
  cover: string;
}

export class SessionDto {
  @ApiProperty({ example: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce' })
  id: string;

  @ApiProperty({ example: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf' })
  film: string;

  @ApiProperty({ example: '2024-06-28T10:00:53+03:00' })
  daytime: string;

  @ApiProperty({ example: '0' })
  hall: string;

  @ApiProperty({ example: 10 })
  rows: number;

  @ApiProperty({ example: 10 })
  seats: number;

  @ApiProperty({ example: 350 })
  price: number;

  @ApiProperty({ example: ['1:1', '2:3'] })
  taken: string[];
}
