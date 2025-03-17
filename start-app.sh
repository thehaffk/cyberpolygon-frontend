#!/bin/bash

# Остановить существующие контейнеры
docker-compose down

# Собрать и запустить контейнеры
docker-compose up --build

# Примечание: Чтобы запустить в фоновом режиме, используйте:
# docker-compose up --build -d 