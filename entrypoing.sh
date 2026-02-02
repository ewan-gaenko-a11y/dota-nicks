#!/bin/sh

php artisan migrate
php artisan optimize
php artisan serve --host 0.0.0.0

