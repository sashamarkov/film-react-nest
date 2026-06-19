CREATE TABLE IF NOT EXISTS films (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    cover VARCHAR(255),
    description TEXT,
    about TEXT,
    rating FLOAT,
    director VARCHAR(255),
    tags TEXT[]
);

CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    daytime VARCHAR(50) NOT NULL,
    hall INTEGER NOT NULL,
    rows INTEGER NOT NULL,
    seats INTEGER NOT NULL,
    price INTEGER NOT NULL,
    taken TEXT[] DEFAULT '{}',
    film_id UUID NOT NULL REFERENCES films(id) ON DELETE CASCADE
);

CREATE INDEX idx_schedules_film_id ON schedules(film_id);