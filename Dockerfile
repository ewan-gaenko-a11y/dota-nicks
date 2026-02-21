FROM php:8.4-cli AS dev

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libsqlite3-dev \
        sqlite3 \
        curl \
        git \
        unzip \
    && docker-php-ext-install pdo pdo_sqlite pcntl

COPY --from=node:25-slim /usr/local/bin /usr/local/bin
COPY --from=node:25-slim /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]


FROM dunglas/frankenphp AS prod

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libsqlite3-dev \
        sqlite3 \
        curl \
        git \
        unzip \
    && docker-php-ext-install pdo pdo_sqlite pcntl

COPY . .
COPY Caddyfile /etc/frankenphp/Caddyfile

COPY --from=node:25-slim /usr/local/bin /usr/local/bin
COPY --from=node:25-slim /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

RUN composer install --no-dev --no-progress --prefer-dist \
    && npm install \
    && npm run build:ssr \
    && rm -rf node_modules \
    && php artisan key:generate

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
