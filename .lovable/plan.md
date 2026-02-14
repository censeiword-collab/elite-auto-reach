

## Подключение Яндекс.Метрики (счётчик 106818205)

Два файла, два изменения — никаких новых зависимостей.

### 1. index.html

- **В `<head>`**: вставить скрипт счётчика сразу после `<meta charset="UTF-8" />` (до viewport и остальных мета-тегов).
- **В `<body>`**: вставить `<noscript>` с пиксель-трекером сразу после открывающего `<body>`, перед `<div id="root">`.

### 2. src/components/SEOHead.tsx

- Добавить `useRef` для дедупликации хитов.
- Добавить константу `COUNTER_ID = 106818205`.
- В конце существующего `useEffect` — отложенный вызов `ym(COUNTER_ID, 'hit', url, ...)` с защитой:
  - проверка `typeof window.ym === 'function'` (блокировщики)
  - пропуск если URL не изменился (`lastHitUrlRef`)
  - передача `referer` для корректной цепочки переходов в SPA

### Что НЕ меняется

- App.tsx, роутер, Layout — без изменений.
- Никаких новых файлов или зависимостей.

### Техническая деталь

```text
index.html
  <head>
    <meta charset="UTF-8" />
    <!-- Yandex.Metrika counter -->   <-- NEW
    <script>...</script>              <-- NEW
    <!-- /Yandex.Metrika counter -->  <-- NEW
    <meta name="viewport" .../>
    ...
  </head>
  <body>
    <noscript>...</noscript>          <-- NEW
    <div id="root"></div>
    ...
  </body>

SEOHead.tsx
  useEffect → в конце:
    setTimeout(() => {
      if (typeof ym !== 'function') return;
      if (lastHitUrlRef.current === url) return;
      ym(106818205, 'hit', url, { title, referer });
      lastHitUrlRef.current = url;
    }, 0);
```

