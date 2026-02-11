

## Edge Function `openai_chat` через Lovable AI Gateway

Вместо прямого вызова `api.openai.com` используем Lovable AI Gateway (`ai.gateway.lovable.dev`), который уже поддерживает модель `openai/gpt-5.2` и не требует дополнительного API-ключа.

### Что будет создано

**Файл:** `supabase/functions/openai_chat/index.ts`

Функция принимает `POST { "message": "..." }` и возвращает `{ "text": "..." }`.

### Логика работы

1. CORS-обработка (preflight OPTIONS)
2. Валидация: проверка метода (только POST), наличие и тип поля `message` (строка, непустая, до 4000 символов)
3. Вызов `https://ai.gateway.lovable.dev/v1/chat/completions` с моделью `openai/gpt-5.2`, авторизация через `LOVABLE_API_KEY` (уже есть в секретах)
4. Обработка ошибок: 429 (rate limit), 402 (оплата), 5xx
5. Возврат `{ "text": "..." }`

### Конфигурация

Добавить в `supabase/config.toml`:

```text
[functions.openai_chat]
verify_jwt = false
```

### Структура ответов

- Успех: `200 { "text": "ответ модели" }`
- Ошибки валидации: `400 { "error": "описание" }`
- Rate limit: `429 { "error": "Too many requests" }`
- Оплата: `402 { "error": "Payment required" }`
- Серверная ошибка: `500 { "error": "описание" }`

### Почему Gateway, а не прямой OpenAI

- `LOVABLE_API_KEY` уже настроен, не нужен отдельный `OPENAI_API_KEY`
- Модель `openai/gpt-5.2` доступна через Gateway
- Единый биллинг и мониторинг через Lovable

