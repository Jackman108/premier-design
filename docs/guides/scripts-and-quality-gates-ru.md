# Скрипты и quality‑gates (`package.json`)

**Каталог:** всегда `premier-design/` (как в CI и в Husky).
**Источник правды** — поле `scripts` в `premier-design/package.json`. Этот документ — **навигатор**: назначение, частота, связь с CI и pre‑commit.

> Скрипты сгруппированы по назначению. Группы: **prepare → dev/build → lint/typecheck/test → check:* (атомарные) → check:risk:local / precommit → perf → e2e → reports → storybook/panda**. Соответствует порядку в `package.json`.

## Node.js и поле `engines`

| Артефакт | Назначение |
|----------|------------|
| `premier-design/package.json` → **`engines.node`** | Диапазон поддерживаемых версий Node для `yarn install` (Yarn v1 проверяет совместимость и может завершить установку с ошибкой при несоответствии). |
| **`premier-design/.nvmrc`** | Рекомендуемая версия для разработки (**24**) — `nvm use` / `fnm use` перед работой. |
| **`premier-design/Dockerfile.prod`** | Образ **`node:24-alpine`** — целевой рантайм прод-сборки; локально допустим Node **≥22.19** (например для devdeps вроде Lighthouse), см. комментарий в Dockerfile. |

При обновлении **`engines`** или образа Docker обновляйте этот блок и [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md) при необходимости; процесс синхронизации — [`quality-gates-sync-ru.md`](../audit/quality-gates-sync-ru.md).

## Политика форматирования (кросс-репо)

**Prettier + ESLint** (`yarn format` / `yarn format:check`, **`eslint-config-prettier`**) — [**ADR 0013**](../adr/0013-shared-lib-react-query-prettier.md); исторический контекст — [**ADR 0010**](../adr/0010-formatting-policy-no-prettier.md). Кросс-репо — [`prettier-and-formatting-cross-repo-ru.md`](prettier-and-formatting-cross-repo-ru.md). Сводки в **`premier-design/.audit/`** не проходят через Prettier — каталог в **`.prettierignore`** (генерируется скриптами аудита локально/в CI).

## Быстрые маршруты

| Ситуация | Команда |
|----------|---------|
| Локальная разработка | **`yarn dev`** — по умолчанию **Turbopack** (стабильный HMR); **`yarn dev:webpack`** — **Webpack** (если нужен классический bundler или обход проблем Turbo) |
| Быстрая проверка кода (lint + typecheck + unit) | `yarn check:static` |
| Все project‑gates без полной «релизной» цепочки | `yarn check:risk:local` |
| Как перед merge / как в pre‑commit (lint, typecheck, unit, gates, build, initial JS) | `yarn check:precommit:full` |
| То же для ожиданий «готово к деплою» | `yarn check:deploy:local` (алиас) |
| Аналог perf‑части CI (Lighthouse + initial JS) | `yarn check:perf:ci` (на Windows Lighthouse может пропускаться — см. [PERF_AND_SEO_CHECKLIST_RU](perf-and-seo-checklist-ru.md)) |
| E2E smoke (`@core`) | `yarn test:e2e` (нужен сервер; см. `playwright.config.ts`) |
| Каталог UI | `yarn storybook` / `yarn build-storybook` |
| Стили Panda CSS после смены рецептов/темы | `yarn panda:codegen` или `yarn panda:watch` |

## 1. Подготовка и dev‑сервер

| Скрипт | Назначение |
|--------|------------|
| `prepare` | Husky (установка git hooks) — выполняется автоматически после `yarn install`. |
| `dev` | **Канон по умолчанию:** `next dev` с **Turbopack** (быстрый dev / HMR). |
| `dev:webpack` | **Webpack:** `next dev --webpack`; второй сценарий рядом с Turbopack по умолчанию. |
| `build` | Production‑сборка (`next build`; см. вывод CLI по bundler). |
| `start` | Запуск production‑сборки. |
| `server` | Кастомный `server.js` (`output: 'standalone'`). |
| `analyze` | Сборка с `@next/bundle-analyzer` (`ANALYZE=true`). |

## 2. Линтер, типы, unit‑тесты

| Скрипт | Назначение |
|--------|------------|
| `lint` | ESLint по проекту (`styled-system/**` игнорируется). |
| `lint:fix` | То же с `--fix`. |
| `format` | Prettier `--write` по маске в `package.json` (учитывает `.prettierignore`). |
| `format:check` | Prettier `--check` — без изменения файлов (CI / `check:static`). |
| `typecheck` | `tsc --noEmit --pretty` — строгая типизация всего проекта (стрицее, чем `next build` для `*.test.ts(x)`). |
| `test` | Jest (по умолчанию интерактивный). |
| `test:coverage` | Jest с coverage и без watch (как в CI). |
| **`check:static`** | **`format:check` → `lint` → `typecheck` → `test --watch=false`:** быстрый минимум перед `check:risk:local` или PR. |

## 3. Атомарные project‑gates

| Скрипт | Назначение |
|--------|------------|
| `check:architecture` | Границы слоёв (полный проход). В `lint-staged` тот же скрипт вызывается **по списку изменённых файлов** без `--all`. |
| `check:architecture:progress` | План сокращения allowlist (`maxAllowedCount`). |
| `check:ui-purity` | Чистота UI‑слоя. |
| `check:feature-structure` | Структура `features/*` (см. [FEATURE_STRUCTURE_ROADMAP_RU](feature-structure-roadmap-ru.md)). |
| `check:regressions` | Регрессии P2 (стили, картинки и т.д.). |
| `check:noise` | Следы шумовых артефактов в репозитории. |
| `check:slo:feedback` | SLO для воронки feedback (`p95`, error/timeout rate). |
| `check:ci-sla` | Соответствие SLA трендам CI. |
| `check:perf:initial-js` | Бюджет initial JS после `yarn build` (`build-manifest.json`): при **App Router** Next 15+ — сумма `.js` из **`polyfillFiles` + `rootMainFiles`** (оболочка первой загрузки); при Pages Router — чанки маршрута `/`, если они есть в манифесте. |
| `check:perf:lighthouse` | Бюджет Lighthouse (`PERF_BUDGET_*`). |
| `check:perf:ci` | Lighthouse + initial JS (как в CI). |

## 4. Составные quality‑gates

| Скрипт | Состав (упрощённо) |
|--------|---------------------|
| `check:risk:local` | `check:architecture` → `architecture:progress` → `report:architecture-allowlist` → `ui-purity` → `regressions` → `noise` → `feature-structure` → `slo:feedback` → `ci-sla` |
| `check:precommit:full` | `format:check` → `lint` → `typecheck` → `test --watch=false` → `check:risk:local` → `build` → `check:perf:initial-js` (паритет с «статикой» + релизной цепочкой; Lighthouse в этот скрипт не входит — см. `check:perf:ci`) |
| `check:deploy:local` | Алиас `check:precommit:full` (ожидания «перед релизом»). |

`check:risk:local` начинает прогон с `clean:test-artifacts`, чтобы старые e2e-артефакты не ломали `check:noise`.

## 5. Отчёты

| Скрипт | Назначение |
|--------|------------|
| `report:architecture-allowlist` | Разбивка allowlist по owner / near‑expiry / candidate‑to‑remove. |
| `report:audit:high` | Отчёт по `yarn audit` (high/critical) для weekly триаджа (см. [SUPPLY_CHAIN](../audit/supply-chain-ru.md)). |

## 6. E2E (Playwright)

| Скрипт | Назначение |
|--------|------------|
| `test:e2e:install` | Установка Chromium (используется в workflow). |
| `test:e2e` | Тесты с меткой `@core` (smoke; CI). |
| `test:e2e:full` | Все e2e‑тесты. |
| `test:e2e:extended` | `@extended` (nightly через `e2e-extended.yml`). |
| `test:e2e:visual` | `e2e/visual-regression.spec.ts` (карточки, dark‑overlay). |
| `clean:test-artifacts` | Очистка локальных e2e-артефактов (`test-results`, `playwright-report`, `blob-report`) перед noise-gate. |

**Заметки:** при **`CI=true`** Playwright поднимает **`node .next/standalone/server.js`** (проект с **`output: 'standalone'`**; не `next start`) — см. `playwright.config.ts`. Локально без `CI` — `yarn dev` и **`reuseExistingServer`**: освободите порт **3000** перед прогоном с **`CI=true`**, иначе standalone не поднимется (`EADDRINUSE`). Если в логе webServer **`The requested resource isn't a valid image … received null`** для многих путей — в **`public/`** не хватает медиа (полный репозиторий содержит каталоги вроде `banners/`, `news/`); smoke обычно проходит, но страница визуально неполная. **Pre‑push:** **`yarn test:e2e`** — см. `.husky/pre-push` (полный прогон **`yarn check:precommit:full`** — в CI или вручную).

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
- **`codeql.yml`:** CodeQL **JavaScript/TypeScript** (`security-extended`) после `yarn build` в `premier-design/` (§9 этап 4.2 / BP-07).
- **`ghcr-premium-design.yml`:** сборка `Dockerfile.prod` → **Trivy** (HIGH/CRITICAL, `ignore-unfixed`) до push в GHCR → **SBOM** CycloneDX (artifact) → push (§9 этап 4.3–4.4).
- **`docs-markdown-links.yml`:** `markdown-link-check` по всем tracked **`*.md`** (§9 этап 7 / BP-28); конфиг **`.markdown-link-check.json`** в корне репозитория.
- **`.github/dependabot.yml`:** **npm** (`/premier-design`) + **github-actions** еженедельно (§9 этап 4.1 / BP-06).

Полные шаги — в `.github/workflows/`. При изменении скриптов обновляйте этот файл и [`quality-gates-sync-ru.md`](../audit/quality-gates-sync-ru.md).

## Lint‑staged (pre‑commit)

Файл `package.json` → `lint-staged`:

- `*.{js,jsx,ts,tsx}` → ESLint `--fix` + `check-architecture-boundaries.mjs` + `check-ui-purity.mjs`;
- `*.css` → `check-p2-regressions.mjs`;
- `features/**` → `check-feature-structure.mjs`;
- `*` → `check-noise-artifacts.mjs`.

Покрытие слоёв (`shared/`, `widgets/`, `app/`, `pages-layer/`) закрывается паттерном `*.{js,jsx,ts,tsx}`: для staged файлов — Prettier, затем ESLint + `check-architecture-boundaries` + `check-ui-purity`.

Сразу после `lint-staged` Husky `pre-commit` вызывает **`yarn typecheck`** (весь проект). Полная цепочка **`yarn check:precommit:full`** — перед merge / в CI (см. `ci.yml`), не на каждый коммит.

## Связанные документы

- [PERF_AND_SEO_CHECKLIST_RU](perf-and-seo-checklist-ru.md)
- [YARN_PACKAGE_MANAGER_RU](yarn-package-manager-ru.md)
- [API_AND_STORYBOOK_RU](api-and-storybook-ru.md)
- [ADR 0013](../adr/0013-shared-lib-react-query-prettier.md) — форматирование и tooling; [ADR 0010](../adr/0010-formatting-policy-no-prettier.md) — история; кросс-репо Feb Code — [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md)
- [DEPLOY_READINESS_RU](../audit/deploy-readiness-ru.md)
- [QUALITY_GATES_SYNC_RU](../audit/quality-gates-sync-ru.md)
