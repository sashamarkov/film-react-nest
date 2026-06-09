## Документация API сервиса бронирования билетов Film!

### Обзор

RESTful API для онлайн-сервиса бронирования билетов в кинотеатр. Позволяет получать информацию о фильмах, расписании сеансов и бронировать места.

### Технологический стек

- **Фреймворк:** Nest.js 10.x
- **Язык:** TypeScript 5.x
- **База данных:** MongoDB 4.4
- **ODM:** Mongoose 8.x
- **Валидация:** class-validator + class-transformer
- **Документация:** Swagger (OpenAPI 3.0)
- **Логирование:** Morgan

### Системные требования

- Node.js 18+
- MongoDB 4.4+
- Docker (опционально)

### Установка и запуск

#### 1. Клонирование репозитория

```bash
git clone https://github.com/sashamarkov/film-react-nest.git
cd film-react-nest/backend
```

#### 2. Установка зависимостей

```bash
npm install
```

#### 3. Настройка переменных окружения

Создайте файл `.env` на основе `.env.example`:

```env
DATABASE_DRIVER=mongodb
DATABASE_URL=mongodb://localhost:27017/prac
NODE_ENV=development
PORT=3000
```

#### 4. Запуск MongoDB

**С использованием Docker:**

```bash
docker run -d --name mongodb -p 27017:27017 mongo:4.4
```

**Или через Docker Compose:**

```bash
docker compose up -d
```

#### 5. Импорт начальных данных

```bash
docker cp test/mongodb_initial_stub.js mongodb:/tmp/
docker exec -it mongodb mongo prac --eval "load('/tmp/mongodb_initial_stub.js')"
```

#### 6. Запуск приложения

```bash
# Режим разработки с горячей перезагрузкой
npm run start:dev

# Режим отладки
npm run start:debug

# Продакшн режим
npm run build
npm run start:prod
```

#### 7. Доступ к документации API

После запуска откройте в браузере: `http://localhost:3000/api/docs`

---

### API Эндпоинты

Базовый URL: `http://localhost:3000/api/afisha`

#### Фильмы

| Метод | Эндпоинт              | Описание                          |
| ----- | --------------------- | --------------------------------- |
| GET   | `/films`              | Получение списка всех фильмов     |
| GET   | `/films/:id/schedule` | Получение расписания фильма по ID |

**Пример ответа GET /films:**

```json
{
  "total": 6,
  "items": [
    {
      "id": "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
      "title": "Архитекторы общества",
      "rating": 2.9,
      "director": "Итан Райт",
      "tags": ["Документальный"],
      "about": "Краткое описание...",
      "description": "Полное описание...",
      "image": "/content/afisha/bg1s.jpg",
      "cover": "/content/afisha/bg1c.jpg"
    }
  ]
}
```

**Пример ответа GET /films/:id/schedule:**

```json
{
  "total": 9,
  "items": [
    {
      "id": "f2e429b0-685d-41f8-a8cd-1d8cb63b99ce",
      "film": "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
      "daytime": "2024-06-28T10:00:53+03:00",
      "hall": 0,
      "rows": 5,
      "seats": 10,
      "price": 350,
      "taken": ["1:1", "2:3"]
    }
  ]
}
```

---

#### Бронирование

| Метод | Эндпоинт | Описание                      |
| ----- | -------- | ----------------------------- |
| POST  | `/order` | Создание бронирования билетов |

**Пример запроса:**

```json
{
  "email": "user@example.com",
  "phone": "+7 999 123-45-67",
  "tickets": [
    {
      "film": "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
      "session": "f2e429b0-685d-41f8-a8cd-1d8cb63b99ce",
      "row": 3,
      "seat": 1
    }
  ]
}
```

**Пример ответа:**

```json
{
  "total": 1,
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "film": "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
      "session": "f2e429b0-685d-41f8-a8cd-1d8cb63b99ce",
      "row": 3,
      "seat": 1,
      "daytime": "2024-06-28T10:00:53+03:00",
      "price": 350
    }
  ]
}
```

**Коды ответа:**

- `201` — успешное бронирование
- `400` — ошибка валидации или место уже занято
- `404` — фильм или сеанс не найден

---

#### Статический контент

| Метод | Эндпоинт            | Описание                     |
| ----- | ------------------- | ---------------------------- |
| GET   | `/content/afisha/*` | Раздача изображений постеров |

---

### Обработка ошибок

Все ошибки возвращаются в едином формате:

```json
{
  "statusCode": 400,
  "timestamp": "2026-06-09T08:00:00.000Z",
  "path": "/api/afisha/order",
  "message": "Место 3:1 уже занято"
}
```

**Возможные ошибки:**

- `400` — `Фильм с id ${id} не найден`
- `400` — `Сеанс с id ${id} не найден`
- `400` — `Место ${row}:${seat} уже занято`
- `500` — `Внутренняя ошибка сервера`

---

### Валидация входных данных

- **Email** — валидный email формат
- **Телефон** — поддерживаются российские номера в различных форматах:
  - `+79261234567`
  - `89261234567`
  - `79261234567`
  - `+7 926 123-45-67`
  - `8(926)123-45-67`
  - `123-45-67` (городской без кода)
  - `(495)1234567`
  - `8-926-123-45-67`
- **Ряд/место** — числа от 1 до 10

---

### Запуск тестов

```bash
# Линтинг
npm run lint

# E2E тесты
npm run test:e2e
```

---

### Структура проекта

```
backend/
├── src/
│   ├── common/           # Общие модули (фильтры, сообщения об ошибках)
│   ├── config/           # Конфигурация и валидация переменных окружения
│   ├── films/            # Модуль фильмов
│   │   ├── dto/          # DTO для фильмов
│   │   ├── schemas/      # Mongoose схема фильма
│   │   ├── films.controller.ts
│   │   ├── films.service.ts
│   │   └── films.module.ts
│   ├── order/            # Модуль бронирования
│   │   ├── dto/          # DTO для заказов
│   │   ├── order.controller.ts
│   │   ├── order.service.ts
│   │   └── order.module.ts
│   ├── app.module.ts     # Главный модуль
│   └── main.ts           # Точка входа
├── public/               # Статические файлы (постеры)
├── test/                 # E2E тесты
├── .env.example          # Пример переменных окружения
└── package.json
```

---

### Автор

**Александр Марков**

---

### Лицензия

MIT

---
