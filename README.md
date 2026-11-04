# JUST FOR NASTYA ♡

Романтическое мини-приложение-приглашение на React, TypeScript и Vite. Котик нарисован в SVG, поэтому для него не нужны отдельные изображения.

## Запуск локально

Рекомендуется Node.js 20+.

```bash
npm install
npm run dev
```

Vite покажет локальный адрес, обычно `http://localhost:5173`. Для проверки Telegram WebView можно временно открыть этот адрес через HTTPS-туннель и указать его в настройках Web App у бота. В обычном браузере приложение также работает.

## Сборка

```bash
npm run build
npm run preview
```

Готовые статические файлы появятся в `dist/`.

## Деплой

**Vercel:** импортируйте папку проекта или Git-репозиторий в Vercel. Framework preset: Vite, Build command: `npm run build`, Output directory: `dist`.

**Cloudflare Pages:** подключите Git-репозиторий; Build command: `npm run build`, Build output directory: `dist`. Для этого одностраничного приложения дополнительных rewrite-правил не требуется.

После публикации укажите HTTPS URL приложения в BotFather: `/mybots` → ваш бот → **Bot Settings** → **Menu Button** или **Configure Mini App**. Для открытия приложения по ссылке используйте Telegram Mini App link, настроенный для бота.

## Telegram

SDK `@tma.js/sdk` и Telegram Web Apps bridge инициализируются при старте. `ready()` и `expand()` вызываются при наличии Telegram WebView; в браузере SDK-инициализация безопасно пропускается. Выбор на экране приглашения сохраняется в `localStorage` под ключом `nastya-answer`.

