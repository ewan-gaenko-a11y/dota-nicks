FROM php:8.4-cli

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        unzip \
        libsqlite3-dev \
        sqlite3 \
        curl \
    && docker-php-ext-install pdo pdo_sqlite pcntl\

COPY . .

CMD ["php", "artisan", "serve", "--host", "0.0.0.0"]

