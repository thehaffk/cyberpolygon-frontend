# CyberPolygon Frontend

Фронтенд для проекта CyberPolygon, написанный на React

## Что сделано

- Базовая структура приложения (компоненты, страницы, стили)
- Маршрутизация через React Router
- Формы логина и регистрации
- API клиенты для работы с бэкендом
- Терминал с WebSocket поддержкой

## Запуск проекта

```
npm install
npm start
```

Откроется на http://localhost:3000

## Сборка

```
npm run build
```

## API

API бэкенда работает на localhost:8000

```
// Пример использования
import { login } from './api/auth'

login(username, password)
  .then(response => console.log(response))
  .catch(error => console.error(error))
```

## Структура

```
cyberpolygon/
├── public/          # Статика
├── src/
│   ├── api/         # API клиент
│   ├── components/  # Компоненты React
│   ├── config/      # Настройки
│   ├── pages/       # Страницы
│   ├── styles/      # CSS
│   ├── App.js       # Основной компонент
│   └── index.js     # Вход
└── package.json     # Зависимости
``` 