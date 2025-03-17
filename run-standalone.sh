#!/bin/bash

# Собираем Docker образ
docker build -t cyberpolygon-standalone -f dockerfile-standalone .

# Запускаем контейнер
docker run --rm -p 3000:3000 cyberpolygon-standalone

# Примечание: Чтобы запустить в фоновом режиме, используйте:
# docker run -d --rm -p 3000:3000 cyberpolygon-standalone 