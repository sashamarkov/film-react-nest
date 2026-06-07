export class FilmResponseDto {
  id: string;
  title: string;
  poster: string;
  description: string;
  duration: number;
  genre: string[];
  releaseYear: number;
  rating: number;
}

export class TicketDto {
  row: number;
  seat: number;
}

export class SessionDto {
  id: string;
  date: string;
  time: string;
  hall: string;
  price: number;
  taken: string[];
}

export class FilmScheduleResponseDto {
  id: string;
  title: string;
  poster: string;
  description: string;
  duration: number;
  genre: string[];
  releaseYear: number;
  rating: number;
  schedule: SessionDto[];
}
