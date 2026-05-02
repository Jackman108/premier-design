# Premium Design (Next.js)

Сайт услуг по ремонту и дизайну интерьера на `Next.js`.

**Имена в репо:** репозиторий git обычно клонируют в папку **`premier-design/`** (имя на GitHub). **`package.json`** и **`yarn.lock`** — в **корне** клона (как в **febcode**); исходники приложения — в **`src/`**. В `package.json` имя пакета — `premium-design`. В Docker Compose репозитория **`lendings-vps-infra`** сервис и контейнер сайта называются **`premium-design`** (образ в GHCR рекомендуется `…/premium-design`).

## Требования

- **Node.js:** целевая версия для разработки и Docker — **`24.x`** (см. **`.nvmrc`** в корне репо и образ `node:24-alpine` в `Dockerfile.prod`). Диапазон, который объявлен в **`package.json` → `engines.node`** (минимум для devdeps вроде Lighthouse и совместимости с CI), — см. [`docs/guides/scripts-and-quality-gates-ru.md`](../docs/guides/scripts-and-quality-gates-ru.md); при несовпадении версии `yarn install` может завершиться ошибкой engine.
- [Yarn](https://yarnpkg.com/) Classic `1.22+` (как в CI: `yarn.lock` + `yarn install --frozen-lockfile`)
- перед переустановкой зависимостей остановите `next dev` / `yarn dev`, иначе на Windows возможен `EPERM` при замене нативных бинарников в `node_modules` (в т.ч. `@next/swc-*`).
- **`package-lock.json` не коммитим** — только `yarn.lock`; см. [`docs/guides/yarn-package-manager-ru.md`](../docs/guides/yarn-package-manager-ru.md).

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

1. Откройте корень репозитория
2. `yarn install`
3. `yarn dev` (проверить, что главная открывается на `http://localhost:3000`)
4. `yarn check:static` (lint + typecheck + unit)

Если `check:static` зелёный — можно брать задачи; открытые пункты (если есть) — [`../docs/audit/audit-and-improvement-plan-ru.md`](../docs/audit/audit-and-improvement-plan-ru.md).

## Документация репозитория

**Карта всех разделов** — [`../docs/README.md`](../docs/README.md). Кратко: плейбук [`../docs/development-playbook-ru.md`](../docs/development-playbook-ru.md), скрипты и гейты [`../docs/guides/scripts-and-quality-gates-ru.md`](../docs/guides/scripts-and-quality-gates-ru.md), деплой [`../docs/audit/deploy-readiness-ru.md`](../docs/audit/deploy-readiness-ru.md), Feb Code [`../docs/audit/cross-repo-alignment-ru.md`](../docs/audit/cross-repo-alignment-ru.md). Правила агента: [`../.cursor/rules/`](../.cursor/rules/), нормы — [`../docs/mempalace/rules/`](../docs/mempalace/rules/).

## Архитектура UI

- ADR по UI-стеку и токенам: [`../docs/adr/0001-ui-stack-and-design-tokens.md`](../docs/adr/0001-ui-stack-and-design-tokens.md).
- Дизайн-токены: `styles/tokens.css`; новые примитивы — `shared/ui/primitives/`.

## Основные команды

| Назначение                                      | Команда                                                        |
| ----------------------------------------------- | -------------------------------------------------------------- |
| Разработка                                      | `yarn dev` (Turbopack) · `yarn dev:webpack` (Webpack)          |
| Сборка / запуск prod                            | `yarn build` · `yarn start` · `yarn analyze` (bundle analyzer) |
| Быстрый фидбек (lint + unit)                    | `yarn check:static`                                            |
| Все project-gates без «релизной» цепочки        | `yarn check:risk:local`                                        |
| Уровень **B** / перед merge (как в **febcode**) | **`yarn ci:quality`**                                          |
| E2E smoke                                       | `yarn test:e2e` (см. `playwright.config.ts`, `baseURL`)        |
| Storybook                                       | `yarn storybook` · `yarn build-storybook`                      |

**Полный перечень** скриптов, CI, lint-staged: [`../docs/guides/scripts-and-quality-gates-ru.md`](../docs/guides/scripts-and-quality-gates-ru.md).

**Git hooks:** `.husky/pre-commit` — **`lint-staged`** + **`yarn typecheck`** (уровень A); полная цепочка **`yarn ci:quality`** — вручную или в CI. `.husky/pre-push` — **`yarn test:e2e`** (`@core`).

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

Rate limit для `app/api/*` (Route Handlers, in-memory, см. ADR [`../docs/adr/0005-rate-limiting-storage-and-client-ip.md`](../docs/adr/0005-rate-limiting-storage-and-client-ip.md)):

- `RATE_LIMIT_TRUST_FORWARDED_FOR=1` — доверять `x-forwarded-for` (типично Vercel / reverse proxy). Без переменной используется только IP сокета, чтобы клиент не подменял себе лимит первым хопом заголовка.

Опциональные публичные:

- `NEXT_PUBLIC_YANDEX_MAPS_API_KEY`

## Версии и релизы

- Версия приложения — поле `version` в `package.json`; история изменений — [`docs/changelog.md`](../docs/changelog.md).
- Формат: [Semantic Versioning](https://semver.org/lang/ru/) и [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/).
- Коммиты: по возможности [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:` …) для предсказуемых нот релиза.

## Docker и деплой на VPS

Production-образ (`Dockerfile.prod`) собирает приложение с **`output: 'standalone'`** (Next.js) и запускает **`node server.js`** внутри контейнера; полный `node_modules` в рантайм-образ не копируется.

Образ публикуется в **GHCR** через CI (см. workflow в `.github/workflows/`). На VPS он только pull-ится — исходники приложения на сервер не клонируются.

Multi-site инфраструктура (`premium-design.pro` + `febcode.pro` на одном VPS):

- отдельный репозиторий **`lendings-vps-infra`**: `docker-compose.yml`, `nginx/`, certbot в **корне** клона;
- контур деплоя из этого репо: [`../docs/guides/deploy-vercel-and-vps-ru.md`](../docs/guides/deploy-vercel-and-vps-ru.md);
- операционный гайд: [`multisite-vps-deploy-ru.md`](https://github.com/Jackman108/lendings-vps-infra/blob/master/docs/operations/multisite-vps-deploy-ru.md);
- деплой через GitHub Actions (SSH + `docker compose pull`): [`../docs/guides/deploy-ssh-github-actions-ru.md`](../docs/guides/deploy-ssh-github-actions-ru.md).

Локальная сборка образа (из каталога приложения, где лежит `Dockerfile.prod`):

```bash
docker build -f Dockerfile.prod -t local/premium-design:dev .
```

### Диагностика медленной Docker-сборки (Windows / Docker Desktop)

1. **Память движка.** Выполните `docker info` и найдите **Total Memory**. Для `next build` + проверки TypeScript разумно **не меньше ~4 GiB** у Docker (в репозитории уже отмечено, что шаг сборки Next может занимать порядка 2–3.5 GiB RAM). Если у движка **~2 GiB** (частый дефолт), сборка может идти **часами** из‑за нехватки памяти и thrashing.  
   **Settings → Resources → Memory** в Docker Desktop — увеличьте лимит (и при необходимости **Swap**), перезапустите Docker.

2. **Контекст сборки.** В каталоге приложения должен быть **`.dockerignore`**: без него в образ при `COPY . .` попадает локальный **`node_modules`** и **`.next`** — лишние сотни МБ и тысячи файлов в виртуализацию, что на том же Desktop заметно тормозит и копирование, и TypeScript.

3. **Путь к проекту.** Файлы на `C:\Users\...` в Docker Desktop читаются через слой совместимости; при очень медленной сборке имеет смысл держать репозиторий во **файловой системе WSL2** (`\\wsl$\Ubuntu\home\...`) и собирать оттуда.

4. **Проверка без Docker.** Если `yarn build` на хосте завершается за минуты, а в контейнере — нет, после пунктов 1–2 пересоберите образ.

## Лицензия

Проект распространяется на условиях проприетарной лицензии:

- [`../LICENSE`](../LICENSE) — английская версия;
- [`../LICENSE_RU.md`](../LICENSE_RU.md) — русская версия (преимущество для законодательства РБ);
- обоснование: [`../docs/adr/0011-proprietary-license.md`](../docs/adr/0011-proprietary-license.md).

## Типовые проблемы

- Ошибка `"next" не является ... командой` (или пустой `node_modules/.bin`):
    - остановите `yarn dev` / другие процессы Node, затем в **корне репозитория** выполните **`yarn install`** (при необходимости удалите `node_modules` и повторите). Скрипты в `package.json` вызывают CLI через `node ./node_modules/...`, чтобы команды работали даже без шимов в `.bin`.
- После установки при **`lockfileTryAcquireSync is not a function`** или **`EPERM` на `.node`**: полная переустановка (`удалить node_modules` → `yarn install` без `--ignore-scripts` локально), закрыть IDE/антивирус на время или исключить папку проекта из проверки в реальном времени.
- **Next.js 16:** сообщение _Another next dev server is already running_ — уже запущен `next dev` в этом каталоге (часто на `:3000`). Остановите старый процесс (Ctrl+C в том терминале или `taskkill /PID <pid> /F` из вывода Next), затем снова `yarn dev`. Второй экземпляр для той же папки не поддерживается.
- Ошибка по переменным окружения:
    - проверьте, что `.env.local` создан из `.env.example` и заполнен.
- `yarn test` завершился без тестов:
    - проверьте, что тесты лежат в `src/**/__tests__/**` или `src/tests/**`, и что команда запускается из **корня** репозитория (где `package.json`).
- Дубликат **`src/node_modules`** после старых установок: удалите каталог **`src/node_modules`** — зависимости ставятся только в корневой **`node_modules`**.
