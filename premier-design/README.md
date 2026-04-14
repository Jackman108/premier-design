# Premier Design (Next.js)

Сайт услуг по ремонту и дизайну интерьера на `Next.js`.

## Требования

- Node.js `22.x` (см. `.nvmrc`)
- npm `10+`

## Быстрый старт (локально)

1. Перейдите в директорию приложения:
   - `cd premier-design`
2. Установите зависимости:
   - `npm install`
3. Создайте файл окружения:
   - скопируйте `.env.example` в `.env.local`
4. Запустите дев-сервер:
   - `npm run dev`
5. Откройте:
   - `http://localhost:3000`

## Документация репозитория

- Оглавление всех документов: [`../docs/README.md`](../docs/README.md) (аудит, гайды, ADR, деплой).

## Архитектура UI

- ADR по UI-стеку и токенам: [`../docs/adr/0001-ui-stack-and-design-tokens.md`](../docs/adr/0001-ui-stack-and-design-tokens.md).
- Дизайн-токены: `styles/tokens.css`; новые примитивы — `components/ui/`.

## Основные команды

- `npm run dev` - запуск в режиме разработки
- `npm run build` - production-сборка
- `npm run start` - запуск production-сборки
- `npm run lint` - проверка ESLint
- `npm run lint:fix` - автоисправление ESLint проблем
- `npm test` - запуск тестов (Jest)
- `npm run storybook` - каталог UI-компонентов (Storybook)
- `npm run build-storybook` - статическая сборка Storybook (артефакт в CI)
- `npm run analyze` - сборка с отчётом `@next/bundle-analyzer` (размер чанков)

## Переменные окружения

Шаблон переменных находится в `.env.example`.

Обязательные для API обратной связи:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Для email (используются в development-режиме):
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USERNAME`
- `EMAIL_PASSWORD`

Системные:
- `NODE_ENV` (`development` или `production`)

Опциональные публичные:
- `NEXT_PUBLIC_YANDEX_MAPS_API_KEY`

## Версии и релизы

- Версия приложения — поле `version` в `package.json`; история изменений — `CHANGELOG.md`.
- Формат: [Semantic Versioning](https://semver.org/lang/ru/) и [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/).
- Коммиты: по возможности [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:` …) для предсказуемых нот релиза.

## Docker

Из корня репозитория доступны:
- `docker-compose.development.yaml` - dev окружение
- `docker-compose.yaml` - production-like окружение

Пример запуска development-стека:
- `docker compose -f docker-compose.development.yaml up --build`

## Типовые проблемы

- Ошибка `"next" не является ... командой`:
  - выполните `npm install` в директории `premier-design`.
- Ошибка по переменным окружения:
  - проверьте, что `.env.local` создан из `.env.example` и заполнен.
- `npm test` завершился без тестов:
  - проверьте, что тесты лежат в `**/__tests__/**` или `tests/**`, и что команда запускается из каталога приложения.