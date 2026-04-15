# Premier Design (Next.js)

Сайт услуг по ремонту и дизайну интерьера на `Next.js`.

## Требования

- Node.js `22.x` (см. `.nvmrc`)
- [Yarn](https://yarnpkg.com/) Classic `1.22+` (как в CI: `yarn.lock` + `yarn install --frozen-lockfile`)
- перед переустановкой зависимостей остановите `next dev` / `yarn dev`, иначе на Windows возможен `EPERM` при замене нативных бинарников в `node_modules` (в т.ч. `@next/swc-*`).
- после изменения `package.json` / `yarn.lock` выполните **`yarn sync:npm-lock`** и закоммитьте обновлённый **`package-lock.json`** (нужен для `npm audit` в CI).

## Быстрый старт (локально)

1. Перейдите в директорию приложения:
   - `cd premier-design`
2. Установите зависимости:
   - `yarn install`
3. Создайте файл окружения:
   - скопируйте `.env.example` в `.env.local`
4. Запустите дев-сервер:
   - `yarn dev`
5. Откройте:
   - `http://localhost:3000`

## Документация репозитория

- Оглавление всех документов: [`../docs/README.md`](../docs/README.md) (аудит, гайды, ADR, деплой).

## Архитектура UI

- ADR по UI-стеку и токенам: [`../docs/adr/0001-ui-stack-and-design-tokens.md`](../docs/adr/0001-ui-stack-and-design-tokens.md).
- Дизайн-токены: `styles/tokens.css`; новые примитивы — `shared/ui/primitives/`.

## Основные команды

- `yarn dev` — режим разработки (Next 16: **Webpack** по умолчанию, стабильнее HMR с Pages Router)
- `yarn dev:turbo` — то же с **Turbopack** (быстрее, но при сбоях HMR вернитесь на `yarn dev`)
- `yarn build` — production-сборка
- `yarn start` — запуск production-сборки
- `yarn lint` — проверка ESLint
- `yarn lint:fix` — автоисправление ESLint
- `yarn test` — тесты (Jest)
- `yarn storybook` — каталог UI (Storybook)
- `yarn build-storybook` — статическая сборка Storybook (артефакт в CI)
- `yarn analyze` — сборка с отчётом `@next/bundle-analyzer`

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

Production-образ (`Dockerfile.prod`) собирает приложение с **`output: 'standalone'`** (Next.js) и запускает **`node server.js`** внутри контейнера; полный `node_modules` в рантайм-образ не копируется.

Из корня репозитория доступны:
- `docker-compose.development.yaml` - dev окружение
- `docker-compose.yaml` - production-like окружение

Пример запуска development-стека:
- `docker compose -f docker-compose.development.yaml up --build`

## Типовые проблемы

- Ошибка `"next" не является ... командой` (или пустой `node_modules/.bin`):
  - остановите `yarn dev` / другие процессы Node, затем в `premier-design` выполните **`yarn install`** (при необходимости удалите `node_modules` и повторите). Скрипты в `package.json` вызывают CLI через `node ./node_modules/...`, чтобы команды работали даже без шимов в `.bin`.
- После установки при **`lockfileTryAcquireSync is not a function`** или **`EPERM` на `.node`**: полная переустановка (`удалить node_modules` → `yarn install` без `--ignore-scripts` локально), закрыть IDE/антивирус на время или исключить папку проекта из проверки в реальном времени.
- **Next.js 16:** сообщение *Another next dev server is already running* — уже запущен `next dev` в этом каталоге (часто на `:3000`). Остановите старый процесс (Ctrl+C в том терминале или `taskkill /PID <pid> /F` из вывода Next), затем снова `yarn dev`. Второй экземпляр для той же папки не поддерживается.
- Ошибка по переменным окружения:
  - проверьте, что `.env.local` создан из `.env.example` и заполнен.
- `yarn test` завершился без тестов:
  - проверьте, что тесты лежат в `**/__tests__/**` или `tests/**`, и что команда запускается из каталога приложения.