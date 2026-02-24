# Na Kawkę

Landing page — autonomiczny biznes kawowy (Vite + React).

## Локальный запуск

```bash
npm install
npm run dev
```

Или:

```bash
npm start
```

Откройте http://localhost:5173

## Сборка

```bash
npm run build
```

Статика собирается в папку **dist/**.

Проверка продакшен-сборки локально:

```bash
npm run preview
```

## Деплой на Coolify

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Start command:** не нужен для статики; выберите тип приложения «Static» и укажите корень `dist`.

Nixpacks распознаёт проект по `package.json` и Vite как Node.js приложение. Для статического хостинга после сборки раздаётся содержимое `dist/`.

### SPA и React Router

В проекте используется React Router (маршруты `/`, `/pakiet-standard`, `/pakiet-premium`). Чтобы при прямом переходе и обновлении страницы не было 404:

- В Coolify для статики включите опцию **SPA / History fallback**, если она есть, или
- Используйте `public/_redirects` (формат Netlify): при деплое на Netlify-like хостинг файл копируется в `dist/` и обрабатывается автоматически.
- Для своего nginx добавьте в конфиг: `try_files $uri $uri/ /index.html;`
- Пример полного конфига nginx для Docker: см. `nginx.conf.example` в корне проекта.

## Ассеты из Figma

Импорты `figma:asset/...` при сборке подменяются прозрачным плейсхолдером. Для продакшена замените их на реальные URL или положите файлы в `public/` и укажите пути вида `/имя-файла.png`.
