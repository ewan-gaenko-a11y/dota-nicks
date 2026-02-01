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
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY . .

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN npm install \
    && npm run build \
    && composer install \
    && composer update \
    && php artisan key:generate \
    && php artisan optimize \
    && php artisan migrate --force

CMD ["php", "artisan", "serve", "--host", "0.0.0.0"]

