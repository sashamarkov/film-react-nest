export const ERROR_MESSAGES = {
  FILM_NOT_FOUND: (id: string) => `Фильм с id ${id} не найден`,
  SESSION_NOT_FOUND: (id: string) => `Сеанс с id ${id} не найден`,
  SEAT_ALREADY_TAKEN: (row: number, seat: number) =>
    `Место ${row}:${seat} уже занято`,
  DATABASE_CONNECTION_ERROR: 'Ошибка подключения к базе данных',
  INTERNAL_SERVER_ERROR: 'Внутренняя ошибка сервера',
  BAD_REQUEST: 'Неверный запрос',
  INVALID_ORDER_DATA: 'Неверные данные для бронирования',
};
