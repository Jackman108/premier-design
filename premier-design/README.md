# Premium Design (Next.js)

Сайт услуг по ремонту и дизайну интерьера на `Next.js`.

**Имена в репо:** этот проект в git лежит в каталоге **`premier-design/`** (так в CI и Husky). В `package.json` имя пакета — `premium-design`. В **`deploy/docker-compose.yml`** сервис и контейнер сайта называются **`premium-design`** (образ в GHCR рекомендуется `…/premium-design`); это не связано с именем папки в клоне.

## Требования

- Node.js `22.x` (см. `.nvmrc`)
- [Yarn](https://yarnpkg.com/) Classic `1.22+` (как в CI: `yarn.lock` + `yarn install --frozen-lockfile`)
- перед переустановкой зависимостей остановите `next dev` / `yarn dev`, иначе на Windows возможен `EPERM` при замене нативных бинарников в `node_modules` (в т.ч. `@next/swc-*`).
- **`package-lock.json` не коммитим** — только `yarn.lock`; см. [`docs/guides/YARN_PACKAGE_MANAGER_RU.md`](../docs/guides/YARN_PACKAGE_MANAGER_RU.md).

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

## Первый день (S4)

Минимальный маршрут для нового разработчика:

1. `cd premier-design`
2. `yarn install`
3. `yarn dev` (проверить, что главная открывается на `http://localhost:3000`)
4. `yarn check:static` (lint + typecheck + unit)

Если `check:static` зелёный, можно переходить к задачам из [`../docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](../docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md).

## Документация репозитория

- Оглавление: [`../docs/README.md`](../docs/README.md).
- Нормы для агента (Cursor): [`../.cursor/rules/agent-mempalace-bootstrap.mdc`](../.cursor/rules/agent-mempalace-bootstrap.mdc), [`../.cursor/rules/agent-quality-process.mdc`](../.cursor/rules/agent-quality-process.mdc); канон текстов — [`../docs/mempalace/rules/`](../docs/mempalace/rules/).
- Плейбук разработчика: [`../docs/DEVELOPMENT_PLAYBOOK_RU.md`](../docs/DEVELOPMENT_PLAYBOOK_RU.md).
- Скрипты и quality-gates: [`../docs/guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](../docs/guides/SCRIPTS_AND_QUALITY_GATES_RU.md).
- Перед деплоем: [`../docs/audit/DEPLOY_READINESS_2026_04_RU.md`](../docs/audit/DEPLOY_READINESS_2026_04_RU.md).

## Архитектура UI

- ADR по UI-стеку и токенам: [`../docs/adr/0001-ui-stack-and-design-tokens.md`](../docs/adr/0001-ui-stack-and-design-tokens.md).
- Дизайн-токены: `styles/tokens.css`; новые примитивы — `shared/ui/primitives/`.

## Основные команды

| Назначение | Команда |
|------------|---------|
| Разработка | `yarn dev` (Webpack, стабильный HMR) · `yarn dev:turbo` (Turbopack) |
| Сборка / запуск prod | `yarn build` · `yarn start` · `yarn analyze` (bundle analyzer) |
| Быстрый фидбек (lint + unit) | `yarn check:static` |
| Все project-gates без «релизной» цепочки | `yarn check:risk:local` |
| Как pre-commit: lint, unit, gates, build, initial JS | `yarn check:precommit:full` (= `check:deploy:local`) |
| E2E smoke | `yarn test:e2e` (см. `playwright.config.ts`, `baseURL`) |
| Storybook | `yarn storybook` · `yarn build-storybook` |

**Полный перечень** скриптов, CI, lint-staged: [`../docs/guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](../docs/guides/SCRIPTS_AND_QUALITY_GATES_RU.md).

**Git hooks:** `.husky/pre-commit` — `lint-staged` + `yarn check:precommit:full`; `.husky/pre-push` — `yarn test:e2e` (набор `@core`).

## Переменные окружения

Шаблон переменных находится в `.env.example`.

Обязательные для API обратной связи:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Для email (опционально, в **любой** среде при полном наборе переменных): если задан `EMAIL_HOST` вместе с `EMAIL_PORT`, `EMAIL_USERNAME`, `EMAIL_PASSWORD` и `FEEDBACK_EMAIL_TO`, use-case отправляет письмо; без `EMAIL_HOST` — только Telegram. См. `.env.example`.
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USERNAME`
- `EMAIL_PASSWORD`
- `FEEDBACK_EMAIL_TO` — получатель писем с формы (обязателен при отправке SMTP)
- `FEEDBACK_EMAIL_FROM` — поле `From` (если не задано, берётся `EMAIL_USERNAME`; имя клиента уходит в `Reply-To` при указанном email)

Системные:
- `NODE_ENV` (`development` или `production`)

Rate limit для `pages/api/*` (in-memory, см. ADR [`../docs/adr/0005-rate-limiting-storage-and-client-ip.md`](../docs/adr/0005-rate-limiting-storage-and-client-ip.md)):
- `RATE_LIMIT_TRUST_FORWARDED_FOR=1` — доверять `x-forwarded-for` (типично Vercel / reverse proxy). Без переменной используется только IP сокета, чтобы клиент не подменял себе лимит первым хопом заголовка.

Опциональные публичные:
- `NEXT_PUBLIC_YANDEX_MAPS_API_KEY`

## Версии и релизы

- Версия приложения — поле `version` в `package.json`; история изменений — `CHANGELOG.md`.
- Формат: [Semantic Versioning](https://semver.org/lang/ru/) и [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/).
- Коммиты: по возможности [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:` …) для предсказуемых нот релиза.

## Docker и деплой на VPS

Production-образ (`Dockerfile.prod`) собирает приложение с **`output: 'standalone'`** (Next.js) и запускает **`node server.js`** внутри контейнера; полный `node_modules` в рантайм-образ не копируется.

Образ публикуется в **GHCR** через CI (см. workflow в `.github/workflows/`). На VPS он только pull-ится — исходники приложения на сервер не клонируются.

Multi-site инфраструктура (`premium-design.pro` + `febcode.pro` на одном VPS):
- конфигурация: [`../deploy/`](../deploy/) (`docker-compose.yml`, `nginx/`, certbot);
- операционный гайд: [`../docs/operations/MULTISITE_VPS_DEPLOY_RU.md`](../docs/operations/MULTISITE_VPS_DEPLOY_RU.md);
- предыдущий вариант через GitHub Actions (SCP+SSH): [`../docs/guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md`](../docs/guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md).

## Лицензия

Проект распространяется на условиях проприетарной лицензии:
- [`../LICENSE`](../LICENSE) — английская версия;
- [`../LICENSE_RU.md`](../LICENSE_RU.md) — русская версия (преимущество для законодательства РБ);
- обоснование: [`../docs/adr/0011-proprietary-license.md`](../docs/adr/0011-proprietary-license.md).

## Типовые проблемы

- Ошибка `"next" не является ... командой` (или пустой `node_modules/.bin`):
  - остановите `yarn dev` / другие процессы Node, затем в `premier-design` выполните **`yarn install`** (при необходимости удалите `node_modules` и повторите). Скрипты в `package.json` вызывают CLI через `node ./node_modules/...`, чтобы команды работали даже без шимов в `.bin`.
- После установки при **`lockfileTryAcquireSync is not a function`** или **`EPERM` на `.node`**: полная переустановка (`удалить node_modules` → `yarn install` без `--ignore-scripts` локально), закрыть IDE/антивирус на время или исключить папку проекта из проверки в реальном времени.
- **Next.js 16:** сообщение *Another next dev server is already running* — уже запущен `next dev` в этом каталоге (часто на `:3000`). Остановите старый процесс (Ctrl+C в том терминале или `taskkill /PID <pid> /F` из вывода Next), затем снова `yarn dev`. Второй экземпляр для той же папки не поддерживается.
- Ошибка по переменным окружения:
  - проверьте, что `.env.local` создан из `.env.example` и заполнен.
- `yarn test` завершился без тестов:
  - проверьте, что тесты лежат в `**/__tests__/**` или `tests/**`, и что команда запускается из каталога приложения.
