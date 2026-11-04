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

## Приветствие бота при `/start`

В проекте есть Vercel Function `api/telegram-webhook.ts`. Чтобы бот присылал приветствие, в настройках Vercel добавьте переменные окружения `TELEGRAM_BOT_TOKEN` (токен от BotFather) и `TELEGRAM_WEBHOOK_SECRET` (случайная строка из латинских букв и цифр длиной 32+ символа), затем выполните Redeploy. Не добавляйте токен в исходники или GitHub.

Скопируйте URL проекта Vercel и задайте webhook, подставив значения локально в адресную строку браузера: `https://api.telegram.org/bot<TOKEN>/setWebhook?url=<VERCEL_URL>/api/telegram-webhook&secret_token=<SECRET>`. Замените `<TOKEN>`, `<VERCEL_URL>` и `<SECRET>` своими значениями. В BotFather настройте Menu Button с названием `Приложение` и тем же URL сайта. После этого `/start` отправит приветствие с подсказкой открыть приложение снизу.

## Telegram

SDK `@tma.js/sdk` и Telegram Web Apps bridge инициализируются при старте. `ready()` и `expand()` вызываются при наличии Telegram WebView; в браузере SDK-инициализация безопасно пропускается. Выбор на экране приглашения сохраняется в `localStorage` под ключом `nastya-answer`.

