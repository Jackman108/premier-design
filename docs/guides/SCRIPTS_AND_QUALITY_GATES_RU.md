# Скрипты и quality‑gates (`package.json`)

**Каталог:** всегда `premier-design/` (как в CI и в Husky).
**Источник правды** — поле `scripts` в `premier-design/package.json`. Этот документ — **навигатор**: назначение, частота, связь с CI и pre‑commit.

> Скрипты сгруппированы по назначению. Группы: **prepare → dev/build → lint/typecheck/test → check:* (атомарные) → check:risk:local / precommit → perf → e2e → reports → storybook/panda**. Соответствует порядку в `package.json`.

## Быстрые маршруты

| Ситуация | Команда |
|----------|---------|
| Локальная разработка | `yarn dev` (Webpack, стабильный HMR) или `yarn dev:turbo` (Turbopack) |
| Быстрая проверка кода (lint + typecheck + unit) | `yarn check:static` |
| Все project‑gates без полной «релизной» цепочки | `yarn check:risk:local` |
| Как перед merge / как в pre‑commit (lint, typecheck, unit, gates, build, initial JS) | `yarn check:precommit:full` |
| То же для ожиданий «готово к деплою» | `yarn check:deploy:local` (алиас) |
| Аналог perf‑части CI (Lighthouse + initial JS) | `yarn check:perf:ci` (на Windows Lighthouse может пропускаться — см. [PERF_AND_SEO_CHECKLIST_RU](PERF_AND_SEO_CHECKLIST_RU.md)) |
| E2E smoke (`@core`) | `yarn test:e2e` (нужен сервер; см. `playwright.config.ts`) |
| Каталог UI | `yarn storybook` / `yarn build-storybook` |
| Стили Panda CSS после смены рецептов/темы | `yarn panda:codegen` или `yarn panda:watch` |

## 1. Подготовка и dev‑сервер

| Скрипт | Назначение |
|--------|------------|
| `prepare` | Husky (установка git hooks) — выполняется автоматически после `yarn install`. |
| `dev` | `next dev` с **Webpack**: стабильный HMR с Pages Router. |
| `dev:turbo` | `next dev` с **Turbopack**; при сбоях HMR — вернуться на `dev`. |
| `build` | Production‑сборка (`next build` с Webpack). |
| `start` | Запуск production‑сборки. |
| `server` | Кастомный `server.js` (`output: 'standalone'`). |
| `analyze` | Сборка с `@next/bundle-analyzer` (`ANALYZE=true`). |

## 2. Линтер, типы, unit‑тесты

| Скрипт | Назначение |
|--------|------------|
| `lint` | ESLint по проекту (`styled-system/**` игнорируется). |
| `lint:fix` | То же с `--fix`. |
| `typecheck` | `tsc --noEmit --pretty` — строгая типизация всего проекта (стрицее, чем `next build` для `*.test.ts(x)`). |
| `test` | Jest (по умолчанию интерактивный). |
| `test:coverage` | Jest с coverage и без watch (как в CI). |
| **`check:static`** | **`lint` → `typecheck` → `test --watch=false`:** быстрый минимум перед `check:risk:local` или PR. |

## 3. Атомарные project‑gates

| Скрипт | Назначение |
|--------|------------|
| `check:architecture` | Границы слоёв (полный проход). В `lint-staged` тот же скрипт вызывается **по списку изменённых файлов** без `--all`. |
| `check:architecture:progress` | План сокращения allowlist (`maxAllowedCount`). |
| `check:ui-purity` | Чистота UI‑слоя. |
| `check:feature-structure` | Структура `features/*` (см. [FEATURE_STRUCTURE_ROADMAP_RU](FEATURE_STRUCTURE_ROADMAP_RU.md)). |
| `check:regressions` | Регрессии P2 (стили, картинки и т.д.). |
| `check:noise` | Следы шумовых артефактов в репозитории. |
| `check:slo:feedback` | SLO для воронки feedback (`p95`, error/timeout rate). |
| `check:ci-sla` | Соответствие SLA трендам CI. |
| `check:perf:initial-js` | Бюджет initial JS главной после `yarn build`. |
| `check:perf:lighthouse` | Бюджет Lighthouse (`PERF_BUDGET_*`). |
| `check:perf:ci` | Lighthouse + initial JS (как в CI). |

## 4. Составные quality‑gates

| Скрипт | Состав (упрощённо) |
|--------|---------------------|
| `check:risk:local` | `check:architecture` → `architecture:progress` → `report:architecture-allowlist` → `ui-purity` → `regressions` → `noise` → `feature-structure` → `slo:feedback` → `ci-sla` |
| `check:precommit:full` | `lint` → `typecheck` → `test --watch=false` → `check:risk:local` → `build` → `check:perf:initial-js` |
| `check:deploy:local` | Алиас `check:precommit:full` (ожидания «перед релизом»). |

## 5. Отчёты

| Скрипт | Назначение |
|--------|------------|
| `report:architecture-allowlist` | Разбивка allowlist по owner / near‑expiry / candidate‑to‑remove. |
| `report:audit:high` | Отчёт по `yarn audit` (high/critical) для weekly триаджа (см. [SUPPLY_CHAIN](../audit/SUPPLY_CHAIN_RU.md)). |

## 6. E2E (Playwright)

| Скрипт | Назначение |
|--------|------------|
| `test:e2e:install` | Установка Chromium (используется в workflow). |
| `test:e2e` | Тесты с меткой `@core` (smoke; CI). |
| `test:e2e:full` | Все e2e‑тесты. |
| `test:e2e:extended` | `@extended` (nightly через `e2e-extended.yml`). |
| `test:e2e:visual` | `e2e/visual-regression.spec.ts` (карточки, dark‑overlay). |

**Заметка:** pre‑push в репозитории запускает `yarn test:e2e` — см. `.husky/pre-push`.

## 7. Дизайн‑система и стили

| Скрипт | Назначение |
|--------|------------|
| `storybook` | Dev Storybook (порт 6006). |
| `build-storybook` | Статическая сборка (артефакт CI). |
| `panda:codegen` | Генерация styled‑system. |
| `panda:watch` | `codegen` в watch. |

## Соответствие CI (GitHub Actions)

- **`ci.yml`:** `yarn lint` → `yarn typecheck`, отдельные `check:*` (architecture, ui‑purity, regressions, noise, feature‑structure), `yarn test:coverage`, `yarn build`, `yarn test:e2e:install` + `yarn test:e2e`, `check:perf:ci`, `check:slo:feedback`, `build-storybook`.
- **`e2e-extended.yml`:** `build` + `test:e2e:extended`.
- **`ci-trends.yml`:** `report-ci-trends.mjs` + `check-ci-sla.mjs`.
- **`security-high-weekly.yml`:** `report:audit:high` + автосоздание issue при high/critical > 0 (в issue добавляются ссылка на workflow run и имя artifact `security-high-weekly`).

Полные шаги — в `.github/workflows/`. При изменении скриптов обновляйте этот файл и [`QUALITY_GATES_SYNC_RU.md`](../audit/QUALITY_GATES_SYNC_RU.md).

## Lint‑staged (pre‑commit)

Файл `package.json` → `lint-staged`:

- `*.{js,jsx,ts,tsx}` → ESLint `--fix` + `check-architecture-boundaries.mjs` + `check-ui-purity.mjs`;
- `*.css` → `check-p2-regressions.mjs`;
- `features/**` → `check-feature-structure.mjs`;
- `*` → `check-noise-artifacts.mjs`.

Покрытие слоёв (`shared/`, `widgets/`, `app/`, `pages/`, `lib/`) закрывается паттерном `*.{js,jsx,ts,tsx}`: для всех staged TS/JS файлов выполняются ESLint + `check-architecture-boundaries` + `check-ui-purity`.

Сразу после `lint-staged` Husky `pre-commit` вызывает **`yarn check:precommit:full`** (полный проход).

## Связанные документы

- [PERF_AND_SEO_CHECKLIST_RU](PERF_AND_SEO_CHECKLIST_RU.md)
- [YARN_PACKAGE_MANAGER_RU](YARN_PACKAGE_MANAGER_RU.md)
- [API_AND_STORYBOOK_RU](API_AND_STORYBOOK_RU.md)
- [ADR 0010: без Prettier](../adr/0010-formatting-policy-no-prettier.md)
- [DEPLOY_READINESS_2026_04_RU](../audit/DEPLOY_READINESS_2026_04_RU.md)
- [QUALITY_GATES_SYNC_RU](../audit/QUALITY_GATES_SYNC_RU.md)
