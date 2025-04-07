# Cyberpolygon API Reference

## 🔐 Авторизация

### Регистрация
```http
POST /cyberpolygon/v1/auth/signup/
```
**Запрос:**
```json
{
  "username": "string",
  "email": "user@example.com",
  "password": "string"
}
```
**Ответ:** `201 Created`
```json
{
  "id": 123,
  "username": "string",
  "email": "string",
  "token": "string"
}
```

### Вход
```http
POST /cyberpolygon/v1/auth/login/
```
**Запрос:**
```json
{
  "username": "string",
  "password": "string"
}
```
**Ответ:** `200 OK`
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### Выход
```http
POST /cyberpolygon/v1/auth/logout/
```
**Заголовки:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```
**Ответ:** `200 OK`

**Формат токена:** JWT
**Хранение токена:** `Authorization: Bearer <token>`

**Коды ошибок:**
- `400` - Некорректные данные
- `401` - Неверные учетные данные
- `403` - Доступ запрещен
- `429` - Слишком много запросов

## 👤 Профиль

### Получить профиль текущего пользователя
```http
GET /cyberpolygon/v1/profile/
```
**Заголовки:**
```
Authorization: Bearer <token>
```
**Ответ:** `200 OK`
```json
{
  "id": 123,
  "username": "string",
  "email": "string",
  "telegram_id": "string",
  "roles": ["string"],
  "teams": [
    {
      "id": 1,
      "name": "string",
      "role": "string"
    }
  ],
  "bio": "string"
}
```

### Обновить профиль
```http
PATCH /cyberpolygon/v1/profile/
```
**Заголовки:**
```
Authorization: Bearer <token>
```
**Запрос:**
```json
{
  "email": "string",
  "telegram_id": "string",
  "bio": "string"
}
```
**Ответ:** `200 OK`
```json
{
  "id": 123,
  "username": "string",
  "email": "string",
  "telegram_id": "string",
  "bio": "string"
}
```

## 📚 Курсы и статьи

### Список курсов
```http
GET /cyberpolygon/v1/courses/
```
**Параметры запроса:**
- `category` (опционально): Фильтр по категории
- `page` (опционально): Номер страницы (пагинация)
- `size` (опционально): Размер страницы

**Ответ:** `200 OK`
```json
{
  "count": 42,
  "next": "/cyberpolygon/v1/courses/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "slug": "intro-to-cybersecurity",
      "title": "Введение в кибербезопасность",
      "short_description": "string",
      "author": "string",
      "created_at": "2025-03-01T12:00:00Z",
      "updated_at": "2025-03-10T15:30:00Z",
      "category": "string"
    }
  ]
}
```

### Получить курс по slug
```http
GET /cyberpolygon/v1/courses/{slug}/
```
**Ответ:** `200 OK`
```json
{
  "id": 1,
  "slug": "intro-to-cybersecurity",
  "title": "Введение в кибербезопасность",
  "content": "# Заголовок\n\nМаркдаун контент курса...",
  "author": {
    "username": "string",
    "id": 123
  },
  "created_at": "2025-03-01T12:00:00Z",
  "updated_at": "2025-03-10T15:30:00Z",
  "category": "string",
  "media": [
    {
      "type": "image",
      "url": "/media/courses/intro-to-cybersecurity/image.jpg"
    }
  ]
}
```

### Создать курс (требуются права)
```http
POST /cyberpolygon/v1/courses/
```
**Заголовки:**
```
Authorization: Bearer <token>
```
**Запрос:**
```json
{
  "title": "string",
  "content": "# Markdown Content",
  "category": "string",
  "slug": "string" 
}
```
**Ответ:** `201 Created`
```json
{
  "id": 42,
  "slug": "string",
  "title": "string",
  "content": "string",
  "author": {
    "username": "string",
    "id": 123
  },
  "created_at": "2025-04-07T12:00:00Z",
  "updated_at": "2025-04-07T12:00:00Z",
  "category": "string"
}
```

## 🧠 Тесты знаний

### Список доступных тестов
```http
GET /cyberpolygon/v1/tests/
```
**Ответ:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Основы криптографии",
    "description": "Тест на знание основ криптографии",
    "questions_count": 10
  }
]
```

### Получить тест
```http
GET /cyberpolygon/v1/tests/{id}/
```
**Ответ:** `200 OK`
```json
{
  "id": 1,
  "title": "Основы криптографии",
  "description": "Тест на знание основ криптографии",
  "questions": [
    {
      "id": 1,
      "text": "Что такое симметричное шифрование?",
      "is_multiple_choice": false,
      "answers": [
        {
          "id": 1,
          "text": "Шифрование с одним ключом для шифрования и дешифрования"
        },
        {
          "id": 2,
          "text": "Шифрование с разными ключами для шифрования и дешифрования"
        }
      ]
    }
  ]
}
```

### Отправить ответы на тест
```http
POST /cyberpolygon/v1/tests/{id}/submit/
```
**Заголовки:**
```
Authorization: Bearer <token>
```
**Запрос:**
```json
{
  "answers": [
    {
      "question_id": 1,
      "selected_answers": [1]
    },
    {
      "question_id": 2,
      "selected_answers": [3, 4]
    }
  ]
}
```
**Ответ:** `200 OK`
```json
{
  "score": 8.5,
  "max_score": 10.0,
  "percentage": 85.0,
  "correct_answers": 9,
  "partial_answers": 1,
  "total_questions": 10
}
```

## 🧩 Таски

### Список тасков
```http
GET /cyberpolygon/v1/tasks/
```
**Параметры запроса:**
- `category` (опционально): Фильтр по категории
- `difficulty` (опционально): Фильтр по сложности

**Ответ:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Find the Flag",
    "description": "Краткое описание",
    "points": 100,
    "category": "Stegano",
    "difficulty": "easy",
    "is_solved": false
  }
]
```

### Получить таск
```http
GET /cyberpolygon/v1/task/{id}/
```
**Ответ:** `200 OK`
```json
{
  "id": 1,
  "title": "Find the Flag",
  "description": "Найди флаг в изображении",
  "points": 100,
  "category": "Stegano",
  "difficulty": "easy",
  "media": [
    {
      "type": "image",
      "url": "/media/stegano/task_123.png"
    }
  ],
  "hint": "Проверь младшие биты изображения"
}
```

### Отправить флаг
```http
POST /cyberpolygon/v1/task/{id}/submit/
```
**Заголовки:**
```
Authorization: Bearer <token>
```
**Запрос:**
```json
{
  "flag": "CTF{hidden_message_123}"
}
```
**Ответ (верный флаг):** `200 OK`
```json
{
  "status": "correct",
  "message": "Поздравляем! Флаг верный.",
  "points": 100
}
```
**Ответ (неверный флаг):** `400 Bad Request`
```json
{
  "status": "incorrect",
  "message": "Неверный флаг. Попробуйте еще раз."
}
```
**Ответ (уже решено):** `403 Forbidden`
```json
{
  "status": "already_solved",
  "message": "Вы уже решили это задание."
}
```

## 💻 Терминал / WebSocket

### WebSocket соединение
```
ws://localhost:8000/ws/ssh/?token={jwt_token}
```

**Авторизация:** Передача JWT токена в query параметре `token`

**Подключение к таску:**
```json
{
  "type": "connect",
  "task_id": 1
}
```

**Отправка команды:**
```json
{
  "type": "command",
  "command": "ls -la"
}
```

**Получение вывода:**
```json
{
  "type": "output",
  "output": "total 12\ndrwxr-xr-x 2 user user 4096 Apr  7 03:10 .\ndrwxr-xr-x 3 user user 4096 Apr  7 03:00 ..\n-rw-r--r-- 1 user user   26 Apr  7 03:05 flag.txt\n"
}
```

**Ошибка:**
```json
{
  "type": "error",
  "message": "Ошибка выполнения команды"
}
```

## 🖼️ Медиа-файлы

### URL для медиа-файлов
- Базовый URL: `/media/`
- Изображения в курсах: `/media/courses/{course_slug}/{filename}`
- Изображения в тасках: `/media/tasks/{task_id}/{filename}`
- Стеганография: `/media/stegano/{filename}`

### Доступ к медиа-файлам
- Публичные файлы: Прямой доступ
- Защищенные файлы: Требуется JWT токен в заголовке
```
Authorization: Bearer <token>
```

### Загрузка медиа
```http
POST /cyberpolygon/v1/media/upload/
```
**Заголовки:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
**Форма:**
```
file: (файл)
type: "avatar|task|course"
related_id: 123  # ID связанного объекта (курс, таск и т.д.)
```
**Ответ:** `201 Created`
```json
{
  "id": 42,
  "url": "/media/courses/intro-to-cybersecurity/image.jpg",
  "type": "image/jpeg"
}
```