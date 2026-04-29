# Документация Premier Design

**Обновлено**: 29.04.2026

Каталог **`docs/`** — материалы вне кода приложения (`premier-design/` — Next.js). **Канон норм по темам:** `mempalace/rules/` и `guides/`. **Feb Code** (отдельный git): только через [`audit/CROSS_REPO_ALIGNMENT_RU.md`](audit/CROSS_REPO_ALIGNMENT_RU.md). **VPS / multi-site:** [`deploy/README.md`](../deploy/README.md), [`operations/MULTISITE_VPS_DEPLOY_RU.md`](operations/MULTISITE_VPS_DEPLOY_RU.md).

## С чего начать

1. [`DEVELOPMENT_PLAYBOOK_RU.md`](DEVELOPMENT_PLAYBOOK_RU.md) — поток работы, слои, гейты.
2. [`guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](guides/SCRIPTS_AND_QUALITY_GATES_RU.md) — команды `yarn`, CI, Node/`engines`.
3. Правила агента: [`.cursor/rules/agent-mempalace-bootstrap.mdc`](../.cursor/rules/agent-mempalace-bootstrap.mdc), [`.cursor/rules/agent-quality-process.mdc`](../.cursor/rules/agent-quality-process.mdc).

## Стандарт оформления документов

- Язык: **русский**; термины на английском при необходимости в скобках.
- Структура: **контекст → решение/действия → критерии готовности**.
- Пути и команды — в обратных кавычках.
- При изменении поведения, env, скриптов, гейтов или Docker — в **той же задаче:** `premier-design/CHANGELOG.md`, [`audit/QUALITY_GATES_SYNC_RU.md`](audit/QUALITY_GATES_SYNC_RU.md), при необходимости ADR.
- При смене UI/темизации/a11y — минимальная запись в [`audit/PROJECT_AUDIT_2026_04_RU.md`](audit/PROJECT_AUDIT_2026_04_RU.md), [`audit/DEPLOY_READINESS_2026_04_RU.md`](audit/DEPLOY_READINESS_2026_04_RU.md), `CHANGELOG.md`.
- **Без дублирования:** норма один раз — в `mempalace/rules/` или `guides/`; остальное — ссылки.

---

## Навигация по разделам

### Гайды — [`guides/`](guides/)

| Документ | Назначение |
|----------|------------|
| [`guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](guides/SCRIPTS_AND_QUALITY_GATES_RU.md) | Скрипты `yarn`, CI, lint-staged, Node/`engines` |
| [`guides/CODE_STRUCTURE_AND_NAMING_RU.md`](guides/CODE_STRUCTURE_AND_NAMING_RU.md) | Слои, нейминг, `lib/` и `shared/` |
| [`guides/FEATURE_STRUCTURE_ROADMAP_RU.md`](guides/FEATURE_STRUCTURE_ROADMAP_RU.md) | Шаблон `features/*`, гейт структуры |
| [`guides/API_AND_STORYBOOK_RU.md`](guides/API_AND_STORYBOOK_RU.md) | API, валидация, Storybook |
| [`guides/PERF_AND_SEO_CHECKLIST_RU.md`](guides/PERF_AND_SEO_CHECKLIST_RU.md) | Perf, SEO, Lighthouse, бюджеты |
| [`guides/YARN_PACKAGE_MANAGER_RU.md`](guides/YARN_PACKAGE_MANAGER_RU.md) | Yarn, lockfile, audit |
| [`guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md`](guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md) | GitHub Actions, SSH, секреты |
| [`guides/DEPLOY_VERCEL_AND_VPS_RU.md`](guides/DEPLOY_VERCEL_AND_VPS_RU.md) | Vercel vs GHCR vs VPS |
| [`guides/MARKETING_ANALYTICS_DASHBOARD_RU.md`](guides/MARKETING_ANALYTICS_DASHBOARD_RU.md) | Аналитика, KPI воронки |

**Feb Code (отдельный репозиторий)** — один вход: [`audit/CROSS_REPO_ALIGNMENT_RU.md`](audit/CROSS_REPO_ALIGNMENT_RU.md). Оттуда — ссылки на `guides/TESTING_STANDARDS_CROSS_REPO_RU.md`, `PRETTIER_AND_FORMATTING_CROSS_REPO_RU.md`, `LAYER_IMPORTS_AND_PUBLIC_API_CROSS_REPO_RU.md`, `FEB_CODE_POST_RELEASE_SYNC_CHECKLIST_RU.md` (канон норм Feb Code не копировать).

### Аудит, риски и релиз — [`audit/`](audit/)

Краткий указатель папки: [`audit/README.md`](audit/README.md).

| Документ | Назначение |
|----------|------------|
| [`audit/PROJECT_AUDIT_2026_04_RU.md`](audit/PROJECT_AUDIT_2026_04_RU.md) | Сводный статус аудита, UI-направления |
| [`audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) | Открытый бэклог, Definition of Done |
| [`audit/CROSS_REPO_ALIGNMENT_RU.md`](audit/CROSS_REPO_ALIGNMENT_RU.md) | Выравнивание с Feb Code, матрица C1–C4 |
| [`audit/DEPLOY_READINESS_2026_04_RU.md`](audit/DEPLOY_READINESS_2026_04_RU.md) | Чеклист перед деплоем |
| [`audit/PROJECT_RISK_REGISTER_2026_04_RU.md`](audit/PROJECT_RISK_REGISTER_2026_04_RU.md) | Реестр рисков |
| [`audit/QUALITY_GATES_SYNC_RU.md`](audit/QUALITY_GATES_SYNC_RU.md) | RISK-08: синхронизация гейтов и CHANGELOG |
| [`audit/OPERATIONS_OBSERVABILITY_RU.md`](audit/OPERATIONS_OBSERVABILITY_RU.md) | RISK-11: observability |
| [`audit/SUPPLY_CHAIN_RU.md`](audit/SUPPLY_CHAIN_RU.md) | RISK-09: зависимости |
| [`audit/CI_COST_AND_TRENDS_RU.md`](audit/CI_COST_AND_TRENDS_RU.md) | RISK-12: CI |
| [`audit/RFC_CHATBOT_RUNTIME_ISOLATION_RU.md`](audit/RFC_CHATBOT_RUNTIME_ISOLATION_RU.md) | RFC chatbot / PERF-03 |

### Архитектурные решения — [`adr/`](adr/)

| Документ | Назначение |
|----------|------------|
| [`adr/README.md`](adr/README.md) | Индекс ADR и шаблон |

### Операции и инфраструктура — [`operations/`](operations/)

| Документ | Назначение |
|----------|------------|
| [`operations/MULTISITE_VPS_DEPLOY_RU.md`](operations/MULTISITE_VPS_DEPLOY_RU.md) | Указатель на `lendings-vps-infra`, multi-site |

### Нормы MemPalace — [`mempalace/rules/`](mempalace/rules/)

| № | Тема | Файл |
|---|------|------|
| 01 | Веб‑архитектура и границы | [`01_WEB_ARCHITECTURE_AND_BOUNDARIES_RU.md`](mempalace/rules/01_WEB_ARCHITECTURE_AND_BOUNDARIES_RU.md) |
| 02 | UI, токены, темизация | [`02_WEB_UI_COMPONENTS_AND_TOKENS_RU.md`](mempalace/rules/02_WEB_UI_COMPONENTS_AND_TOKENS_RU.md) |
| 03 | a11y и UX | [`03_WEB_A11Y_AND_UX_RU.md`](mempalace/rules/03_WEB_A11Y_AND_UX_RU.md) |
| 04 | Производительность | [`04_WEB_PERFORMANCE_RU.md`](mempalace/rules/04_WEB_PERFORMANCE_RU.md) |
| 05 | Безопасность и данные | [`05_WEB_SECURITY_AND_DATA_RU.md`](mempalace/rules/05_WEB_SECURITY_AND_DATA_RU.md) |
| 06 | Next.js: данные и формы | [`06_WEB_NEXTJS_DATA_AND_FORMS_RU.md`](mempalace/rules/06_WEB_NEXTJS_DATA_AND_FORMS_RU.md) |
| 07 | Тестирование | [`07_WEB_TESTING_AND_QUALITY_RU.md`](mempalace/rules/07_WEB_TESTING_AND_QUALITY_RU.md) |
| 08 | Чистая архитектура | [`08_CLEAN_ARCHITECTURE_USE_CASES_AND_PORTS_RU.md`](mempalace/rules/08_CLEAN_ARCHITECTURE_USE_CASES_AND_PORTS_RU.md) |
| 09 | Чистый код | [`09_CLEAN_CODE_SOLID_DRY_KISS_YAGNI_RU.md`](mempalace/rules/09_CLEAN_CODE_SOLID_DRY_KISS_YAGNI_RU.md) |
| 10 | Ошибки и надёжность | [`10_ERRORS_AND_RELIABILITY_RU.md`](mempalace/rules/10_ERRORS_AND_RELIABILITY_RU.md) |
| 11 | Типизация и валидация | [`11_TYPING_AND_VALIDATION_RU.md`](mempalace/rules/11_TYPING_AND_VALIDATION_RU.md) |
| 12 | Рефакторинг и долг | [`12_REFACTORING_AND_TECHNICAL_DEBT_RU.md`](mempalace/rules/12_REFACTORING_AND_TECHNICAL_DEBT_RU.md) |

### Инструменты — [`cursor/`](cursor/), [`mempalace/`](mempalace/)

| Документ | Назначение |
|----------|------------|
| [`cursor/README.md`](cursor/README.md) | MCP, конфигурация |
| [`mempalace/README.md`](mempalace/README.md) | Оглавление MemPalace |
| [`mempalace/MEMPALACE_AGENT_MEMORY_RU.md`](mempalace/MEMPALACE_AGENT_MEMORY_RU.md) | Установка, MCP |
| [`mempalace/MEMPALACE_USAGE_RU.md`](mempalace/MEMPALACE_USAGE_RU.md) | Эксплуатация |

---

## Принцип «один источник правды»

| Тема | Канон | Ссылки без копирования |
|------|--------|-------------------------|
| Скрипты, `engines`, `.nvmrc` | `premier-design/package.json`, `.nvmrc` | [`guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](guides/SCRIPTS_AND_QUALITY_GATES_RU.md), [`audit/QUALITY_GATES_SYNC_RU.md`](audit/QUALITY_GATES_SYNC_RU.md), `premier-design/README.md` |
| Feb Code | [`audit/CROSS_REPO_ALIGNMENT_RU.md`](audit/CROSS_REPO_ALIGNMENT_RU.md) | `guides/*_CROSS_REPO_*.md`, репозиторий **febcode** |
| Реквизиты и контакты ИП | `premier-design/shared/constants/company.ts` | `LegalRequisites`, юр. тексты, JSON-LD |
| Соцсети | `SITE_SOCIAL` в `company.ts` | `SocialIcons` |
| Multi-site VPS | Репозиторий **`lendings-vps-infra`** | [`operations/MULTISITE_VPS_DEPLOY_RU.md`](operations/MULTISITE_VPS_DEPLOY_RU.md), [`guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md`](guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md) |
| Лицензия | `LICENSE`, `LICENSE_RU.md`, ADR 0011 | этот файл, `premier-design/README.md` |
| Слои / use-case / SOLID | `mempalace/rules/01`, `08`, `09` | плейбук, [`guides/CODE_STRUCTURE_AND_NAMING_RU.md`](guides/CODE_STRUCTURE_AND_NAMING_RU.md) |
| Perf | `mempalace/rules/04`, [`guides/PERF_AND_SEO_CHECKLIST_RU.md`](guides/PERF_AND_SEO_CHECKLIST_RU.md) | [`audit/DEPLOY_READINESS_2026_04_RU.md`](audit/DEPLOY_READINESS_2026_04_RU.md) |
| UI / токены | `mempalace/rules/02`, ADR 0001–0003 | [`audit/PROJECT_AUDIT_2026_04_RU.md`](audit/PROJECT_AUDIT_2026_04_RU.md) |
| Тесты | `mempalace/rules/07` | [`guides/API_AND_STORYBOOK_RU.md`](guides/API_AND_STORYBOOK_RU.md) |
| Бэклог | [`audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) | — |
| История | `premier-design/CHANGELOG.md` | — |

---

## Внутри приложения

- Runbook: `premier-design/README.md`
- Версии: `premier-design/CHANGELOG.md`

## Лицензия

- [`LICENSE`](../LICENSE), [`LICENSE_RU.md`](../LICENSE_RU.md), [`adr/0011-proprietary-license.md`](adr/0011-proprietary-license.md)
