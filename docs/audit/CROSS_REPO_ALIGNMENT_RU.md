# Кросс-репозиторное выравнивание с проектом Feb Code

**Обновлено**: 29.04.2026

## Назначение

Проект **Feb Code** — отдельный git-репозиторий. Документ содержит:

1. **Эталоны Feb Code** — что брать при выравнивании роутинга и тестов.
2. **Эталоны Premier Design** — что уже является образцом процесса и гейтов.
3. **Матрица унификации** — согласованный с Feb Code бэклог по инструментам и архитектуре (без слияния репозиториев).

Детальные нормы Feb Code не дублируются: **канон** — `febcode/docs/architecture.md`, `febcode/docs/testing-standards.md`, `febcode/docs/cross-repo-alignment-plan.md`.

**Гайды в этом репозитории:** [`TESTING_STANDARDS_CROSS_REPO_RU.md`](../guides/TESTING_STANDARDS_CROSS_REPO_RU.md) (C3), [`PRETTIER_AND_FORMATTING_CROSS_REPO_RU.md`](../guides/PRETTIER_AND_FORMATTING_CROSS_REPO_RU.md), [`LAYER_IMPORTS_AND_PUBLIC_API_CROSS_REPO_RU.md`](../guides/LAYER_IMPORTS_AND_PUBLIC_API_CROSS_REPO_RU.md) (C1/C2), [`FEB_CODE_POST_RELEASE_SYNC_CHECKLIST_RU.md`](../guides/FEB_CODE_POST_RELEASE_SYNC_CHECKLIST_RU.md) (чеклист после релизов Feb Code).

---

## Эталоны Feb Code (распространять при совместной эксплуатации)

| Тема | Где у Feb Code |
|------|----------------|
| Next.js App Router + FSD, `pages-layer`, алиасы, запрет `@/`, домен вне `app/` | `docs/architecture.md` |
| `next.config.ts`: standalone, security headers, bundle analyzer, dev-origins, watcher под Windows | `next.config.ts` |
| Arch-lint как `yarn lint`, pre-commit | `scripts/lint-architecture.mjs`, `.husky/` |
| Стандарты тестов | `docs/testing-standards.md` |
| Индекс доков, engines в `package.json` | `docs/index.md`, `package.json` |

---

## Эталоны Premier Design (применять при задачах в Feb Code)

| Тема | Где у нас |
|------|-----------|
| Карта документации, один источник правды | [README.md](../README.md) |
| Плейбук, скрипты, гейты, деплой SSH / Vercel / VPS, multisite | `DEVELOPMENT_PLAYBOOK_RU.md`, `guides/DEPLOY_VERCEL_AND_VPS_RU.md`, [operations/MULTISITE_VPS_DEPLOY_RU.md](../operations/MULTISITE_VPS_DEPLOY_RU.md), [deploy/README.md](../../deploy/README.md) (указатель на **`lendings-vps-infra`**) |
| MemPalace 08 / 09 / 11 | `docs/mempalace/rules/` |
| ESLint + lint-staged + архитектурные скрипты | `premier-design/package.json`, `eslint.config.mjs` |
| CI: архитектура, UI purity, perf, audit, Storybook | `.github/workflows/ci.yml` |
| Docker prod: non-root, telemetry off, healthcheck Node | `premier-design/Dockerfile.prod` |
| VPS: nginx + compose (multisite) | Репозиторий **`lendings-vps-infra`** — см. [deploy/README.md](../../deploy/README.md), [operations/MULTISITE_VPS_DEPLOY_RU.md](../operations/MULTISITE_VPS_DEPLOY_RU.md) |
| CSP / HSTS, rewrites | `premier-design/next.config.js`, `docs/adr/` |
| Синхронизация релиза и гейтов | [QUALITY_GATES_SYNC_RU.md](QUALITY_GATES_SYNC_RU.md) |

---

## Матрица унификации (зеркало Feb Code)

Подробные строки и статус задач — в **`febcode/docs/cross-repo-alignment-plan.md`** (матрица «Инструменты», «Архитектура», «Next/Docker/CI», «Документация»). Здесь — кратко:

| Направление | Действие |
|-------------|----------|
| Линтинг | Feb Code: ESLint + arch-lint **или** явное решение «только arch-lint + Prettier» |
| Форматирование | **Согласовано:** Premier — ESLint; Feb Code — Prettier + lint (детали — список гайдов в начале этого файла) |
| Тесты / CI | Общий минимум: typecheck, unit, e2e smoke, build; расширения из нашего `ci.yml` — поэтапно в Feb Code |
| `.nvmrc` | В Feb Code для паритета с нашим `premier-design/.nvmrc` |
| FSD / порты / контент | Таблица слоёв — Feb Code `architecture.md`; use-case/адаптеры — `mempalace/rules/08_*`; единый источник реквизитов — паттерн как у `shared/constants/company.ts` |
| Заголовки / CSP | Чеклист «Vercel vs nginx» — наши гайды и ADR |
| Docker | Feb Code приближать к `Dockerfile.prod` (telemetry, позже non-root) |
| Документы | Feb Code: `quality-gates-sync.md`, расширенный `deploy-checklist.md` |

---

## Что перенять в Premier Design из Feb Code

| № | Область | Правка |
|---|---------|--------|
| C1 | Документация слоёв | Сверять импорты с `febcode/docs/architecture.md` при смене роутинга |
| C2 | Алиасы и публичный API срезов | Дисциплина как у Feb Code + наш `check-architecture-boundaries.mjs` |
| C3 | Тесты | Имена сценариев и smoke «лид» — ориентир `febcode/docs/testing-standards.md` |
| C4 | Next config | Security headers / origins / standalone при апдейтах Next — сверка с `febcode/next.config.ts` |

**Статус (выравнивание по Feb Code):** конфиг и процесс зафиксированы в коде (`premier-design/next.config.js`, `package.json`) и в гайдах выше; канон Feb Code не копируется в этом файле повторно.

---

## Пути в документации и CI

- Корень **этого** репозитория — каталог с `.git`. Приложение Next.js — **`premier-design/`** относительно корня (пути в `.github/workflows/*`, `docker build -f premier-design/Dockerfile.prod`).
- Ссылки из `docs/audit/*.md` на код вида **`../../premier-design/...`** — внутри репозитория, не зависят от имени родительской папки (`lendings` и т.д.).
- Абсолютные пути разработчика в git не коммитить.

---

## Связанные документы

- [README.md](../README.md), [AUDIT_AND_IMPROVEMENT_PLAN_RU.md](AUDIT_AND_IMPROVEMENT_PLAN_RU.md), [QUALITY_GATES_SYNC_RU.md](QUALITY_GATES_SYNC_RU.md)
