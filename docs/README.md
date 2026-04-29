# Документация Premier Design

**Обновлено**: 29.04.2026

Каталог **`docs/`** — материалы вне кода приложения (`premier-design/` — Next.js). **Канон норм по темам:** `mempalace/rules/` и `guides/`. **Feb Code** (отдельный git): только через [`audit/cross-repo-alignment-ru.md`](audit/cross-repo-alignment-ru.md). **VPS / multi-site:** [`deploy/README.md`](../deploy/README.md), [`lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md`](../../lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md). **История изменений приложения:** [`changelog.md`](changelog.md) (не в корне `premier-design/`).

## С чего начать

1. [`development-playbook-ru.md`](development-playbook-ru.md) — поток работы, слои, гейты.
2. [`guides/scripts-and-quality-gates-ru.md`](guides/scripts-and-quality-gates-ru.md) — команды `yarn`, CI, Node/`engines`.
3. Правила агента: [`.cursor/rules/agent-mempalace-bootstrap.mdc`](../.cursor/rules/agent-mempalace-bootstrap.mdc), [`.cursor/rules/agent-quality-process.mdc`](../.cursor/rules/agent-quality-process.mdc).

## Стандарт оформления документов

- Язык: **русский**; термины на английском при необходимости в скобках.
- Структура: **контекст → решение/действия → критерии готовности**.
- Пути и команды — в обратных кавычках.
- При изменении поведения, env, скриптов, гейтов или Docker — в **той же задаче:** [`changelog.md`](changelog.md), [`audit/quality-gates-sync-ru.md`](audit/quality-gates-sync-ru.md), при необходимости ADR.
- При смене UI/темизации/a11y — минимальная запись в [`audit/project-audit-2026-04-ru.md`](audit/project-audit-2026-04-ru.md), [`audit/deploy-readiness-2026-04-ru.md`](audit/deploy-readiness-2026-04-ru.md), [`changelog.md`](changelog.md).
- **Без дублирования:** норма один раз — в `mempalace/rules/` или `guides/`; остальное — ссылки.

---

## Навигация по разделам

### Гайды — [`guides/`](guides/)

| Документ | Назначение |
|----------|------------|
| [`guides/scripts-and-quality-gates-ru.md`](guides/scripts-and-quality-gates-ru.md) | Скрипты `yarn`, CI, lint-staged, Node/`engines` |
| [`guides/code-structure-and-naming-ru.md`](guides/code-structure-and-naming-ru.md) | Слои, нейминг, `lib/` и `shared/` |
| [`guides/feature-structure-roadmap-ru.md`](guides/feature-structure-roadmap-ru.md) | Шаблон `features/*`, гейт структуры |
| [`guides/api-and-storybook-ru.md`](guides/api-and-storybook-ru.md) | API, валидация, Storybook |
| [`guides/perf-and-seo-checklist-ru.md`](guides/perf-and-seo-checklist-ru.md) | Perf, SEO, Lighthouse, бюджеты |
| [`guides/yarn-package-manager-ru.md`](guides/yarn-package-manager-ru.md) | Yarn, lockfile, audit |
| [`guides/deploy-ssh-github-actions-ru.md`](guides/deploy-ssh-github-actions-ru.md) | GitHub Actions, SSH, секреты |
| [`guides/deploy-vercel-and-vps-ru.md`](guides/deploy-vercel-and-vps-ru.md) | Vercel vs GHCR vs VPS |
| [`guides/marketing-analytics-dashboard-ru.md`](guides/marketing-analytics-dashboard-ru.md) | Аналитика, KPI воронки |

**Feb Code (отдельный репозиторий)** — один вход: [`audit/cross-repo-alignment-ru.md`](audit/cross-repo-alignment-ru.md). Оттуда — ссылки на `guides/testing-standards-cross-repo-ru.md`, `prettier-and-formatting-cross-repo-ru.md`, `layer-imports-and-public-api-cross-repo-ru.md`, `feb-code-post-release-sync-checklist-ru.md` (канон норм Feb Code не копировать).

### Аудит, риски и релиз — [`audit/`](audit/)

Краткий указатель папки: [`audit/README.md`](audit/README.md).

| Документ | Назначение |
|----------|------------|
| [`audit/project-audit-2026-04-ru.md`](audit/project-audit-2026-04-ru.md) | Сводный статус аудита, UI-направления |
| [`audit/audit-and-improvement-plan-ru.md`](audit/audit-and-improvement-plan-ru.md) | Открытый бэклог, Definition of Done |
| [`audit/cross-repo-alignment-ru.md`](audit/cross-repo-alignment-ru.md) | Выравнивание с Feb Code, матрица C1–C4 |
| [`audit/deploy-readiness-2026-04-ru.md`](audit/deploy-readiness-2026-04-ru.md) | Чеклист перед деплоем |
| [`audit/project-risk-register-2026-04-ru.md`](audit/project-risk-register-2026-04-ru.md) | Реестр рисков |
| [`audit/quality-gates-sync-ru.md`](audit/quality-gates-sync-ru.md) | RISK-08: синхронизация гейтов и CHANGELOG |
| [`audit/operations-observability-ru.md`](audit/operations-observability-ru.md) | RISK-11: observability |
| [`audit/supply-chain-ru.md`](audit/supply-chain-ru.md) | RISK-09: зависимости |
| [`audit/ci-cost-and-trends-ru.md`](audit/ci-cost-and-trends-ru.md) | RISK-12: CI |
| [`audit/rfc-chatbot-runtime-isolation-ru.md`](audit/rfc-chatbot-runtime-isolation-ru.md) | RFC chatbot / PERF-03 |

### Архитектурные решения — [`adr/`](adr/)

| Документ | Назначение |
|----------|------------|
| [`adr/README.md`](adr/README.md) | Индекс ADR и шаблон |

### Операции и инфраструктура

| Документ | Назначение |
|----------|------------|
| [`lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md`](../../lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md) | Multi-site VPS: nginx, compose, TLS, rollback |

### Нормы MemPalace — [`mempalace/rules/`](mempalace/rules/)

| № | Тема | Файл |
|---|------|------|
| 01 | Веб‑архитектура и границы | [`01-web-architecture-and-boundaries-ru.md`](mempalace/rules/01-web-architecture-and-boundaries-ru.md) |
| 02 | UI, токены, темизация | [`02-web-ui-components-and-tokens-ru.md`](mempalace/rules/02-web-ui-components-and-tokens-ru.md) |
| 03 | a11y и UX | [`03-web-a11y-and-ux-ru.md`](mempalace/rules/03-web-a11y-and-ux-ru.md) |
| 04 | Производительность | [`04-web-performance-ru.md`](mempalace/rules/04-web-performance-ru.md) |
| 05 | Безопасность и данные | [`05-web-security-and-data-ru.md`](mempalace/rules/05-web-security-and-data-ru.md) |
| 06 | Next.js: данные и формы | [`06-web-nextjs-data-and-forms-ru.md`](mempalace/rules/06-web-nextjs-data-and-forms-ru.md) |
| 07 | Тестирование | [`07-web-testing-and-quality-ru.md`](mempalace/rules/07-web-testing-and-quality-ru.md) |
| 08 | Чистая архитектура | [`08-clean-architecture-use-cases-and-ports-ru.md`](mempalace/rules/08-clean-architecture-use-cases-and-ports-ru.md) |
| 09 | Чистый код | [`09-clean-code-solid-dry-kiss-yagni-ru.md`](mempalace/rules/09-clean-code-solid-dry-kiss-yagni-ru.md) |
| 10 | Ошибки и надёжность | [`10-errors-and-reliability-ru.md`](mempalace/rules/10-errors-and-reliability-ru.md) |
| 11 | Типизация и валидация | [`11-typing-and-validation-ru.md`](mempalace/rules/11-typing-and-validation-ru.md) |
| 12 | Рефакторинг и долг | [`12-refactoring-and-technical-debt-ru.md`](mempalace/rules/12-refactoring-and-technical-debt-ru.md) |

### Инструменты — [`cursor/`](cursor/), [`mempalace/`](mempalace/)

| Документ | Назначение |
|----------|------------|
| [`cursor/README.md`](cursor/README.md) | MCP, конфигурация |
| [`mempalace/README.md`](mempalace/README.md) | Оглавление MemPalace |
| [`mempalace/mempalace-agent-memory-ru.md`](mempalace/mempalace-agent-memory-ru.md) | Установка, MCP |
| [`mempalace/mempalace-usage-ru.md`](mempalace/mempalace-usage-ru.md) | Эксплуатация |

---

## Принцип «один источник правды»

| Тема | Канон | Ссылки без копирования |
|------|--------|-------------------------|
| Скрипты, `engines`, `.nvmrc` | `premier-design/package.json`, `.nvmrc` | [`guides/scripts-and-quality-gates-ru.md`](guides/scripts-and-quality-gates-ru.md), [`audit/quality-gates-sync-ru.md`](audit/quality-gates-sync-ru.md), `premier-design/README.md` |
| Feb Code | [`audit/cross-repo-alignment-ru.md`](audit/cross-repo-alignment-ru.md) | `guides/*cross-repo*.md`, репозиторий **febcode** |
| Реквизиты и контакты ИП | `premier-design/shared/constants/company.ts` | `LegalRequisites`, юр. тексты, JSON-LD |
| Соцсети | `SITE_SOCIAL` в `company.ts` | `SocialIcons` |
| Multi-site VPS | Репозиторий **`lendings-vps-infra`** | [`multisite-vps-deploy-ru.md`](../../lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md), [`guides/deploy-ssh-github-actions-ru.md`](guides/deploy-ssh-github-actions-ru.md) |
| Лицензия | `LICENSE`, `LICENSE_RU.md`, ADR 0011 | этот файл, `premier-design/README.md` |
| Слои / use-case / SOLID | `mempalace/rules/01`, `08`, `09` | плейбук, [`guides/code-structure-and-naming-ru.md`](guides/code-structure-and-naming-ru.md) |
| Perf | `mempalace/rules/04`, [`guides/perf-and-seo-checklist-ru.md`](guides/perf-and-seo-checklist-ru.md) | [`audit/deploy-readiness-2026-04-ru.md`](audit/deploy-readiness-2026-04-ru.md) |
| UI / токены | `mempalace/rules/02`, ADR 0001–0003 | [`audit/project-audit-2026-04-ru.md`](audit/project-audit-2026-04-ru.md) |
| Тесты | `mempalace/rules/07` | [`guides/api-and-storybook-ru.md`](guides/api-and-storybook-ru.md) |
| Бэклог | [`audit/audit-and-improvement-plan-ru.md`](audit/audit-and-improvement-plan-ru.md) | — |
| История | [`changelog.md`](changelog.md) | — |

---

## Внутри приложения

- Runbook: `premier-design/README.md`
- Версии: [`changelog.md`](changelog.md)

## Лицензия

- [`LICENSE`](../LICENSE), [`LICENSE_RU.md`](../LICENSE_RU.md), [`adr/0011-proprietary-license.md`](adr/0011-proprietary-license.md)
