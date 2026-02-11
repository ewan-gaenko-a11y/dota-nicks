#!/bin/bash

php artisan key:generate
php artisan migrate
php artisan optimize
composer dev

