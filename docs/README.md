# Документация Premier Design

**Обновлено**: 29.04.2026

Материалы **вне кода приложения** (`premier-design/` — Next.js). Этот файл — **карта** документации; нормы и правила не дублируются здесь, а лежат в специализированных файлах ниже.

Инфраструктура VPS и Docker (мультисайт с **febcode**): отдельный репозиторий **`lendings-vps-infra`** — см. [`deploy/README.md`](../deploy/README.md) (указатель) и [`operations/MULTISITE_VPS_DEPLOY_RU.md`](operations/MULTISITE_VPS_DEPLOY_RU.md). Кросс-репозиторное выравнивание — [`audit/CROSS_REPO_ALIGNMENT_RU.md`](audit/CROSS_REPO_ALIGNMENT_RU.md).

## Главная страница для разработчика

1. [`DEVELOPMENT_PLAYBOOK_RU.md`](DEVELOPMENT_PLAYBOOK_RU.md) — единый плейбук: слои, поток разработки, ссылки на гейты, perf и UX.
2. [`guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](guides/SCRIPTS_AND_QUALITY_GATES_RU.md) — все `yarn` скрипты, CI, lint‑staged, pre‑commit.
3. Правила агента (корень репозитория): [`.cursor/rules/agent-mempalace-bootstrap.mdc`](../.cursor/rules/agent-mempalace-bootstrap.mdc) (нормы из `docs/mempalace/`, MemPalace-first), [`.cursor/rules/agent-quality-process.mdc`](../.cursor/rules/agent-quality-process.mdc) (гейты и синхронизация доков).

## Стандарт оформления документов

- Язык: **русский**; термины на английском при необходимости в скобках.
- Структура: **контекст → решение/действия → критерии готовности**.
- Пути и команды — в обратных кавычках.
- При изменении поведения, env, скриптов, гейтов или Docker — синхронизация в **той же задаче** с `premier-design/CHANGELOG.md`, `docs/audit/QUALITY_GATES_SYNC_RU.md` и (при необходимости) ADR.
- При изменениях UI/темизации/a11y — добавить минимум в `PROJECT_AUDIT_2026_04_RU.md`, `DEPLOY_READINESS_2026_04_RU.md`, `CHANGELOG.md`.
- **Без дублирования:** норма формулируется один раз — в `docs/mempalace/rules/` или `docs/guides/`. Остальные документы и `.cursor/rules/*` дают ссылки, не копируют текст.

---

## Навигация по разделам

### Аудит, риски и релиз — [`audit/`](audit/)

| Документ | Назначение |
|----------|------------|
| [`audit/README.md`](audit/README.md) | Индекс папки `audit/` |
| [`audit/PROJECT_AUDIT_2026_04_RU.md`](audit/PROJECT_AUDIT_2026_04_RU.md) | Закрытый сводный аудит, FSD‑таблица отклонений, история закрытых направлений UI |
| [`audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) | Открытый бэклог улучшений и Definition of Done; **источник плана compliance** |
| [`audit/CROSS_REPO_ALIGNMENT_RU.md`](audit/CROSS_REPO_ALIGNMENT_RU.md) | Список правок для выравнивания с репозиторием Feb Code (отдельный git); пути после переноса клонов |
| [`audit/DEPLOY_READINESS_2026_04_RU.md`](audit/DEPLOY_READINESS_2026_04_RU.md) | Финальный чеклист деплоя |
| [`audit/PROJECT_RISK_REGISTER_2026_04_RU.md`](audit/PROJECT_RISK_REGISTER_2026_04_RU.md) | Реестр текущих рисков и митигаций |
| [`audit/QUALITY_GATES_SYNC_RU.md`](audit/QUALITY_GATES_SYNC_RU.md) | RISK‑08: чеклист синхронизации `CHANGELOG` / workflow / гейтов |
| [`audit/OPERATIONS_OBSERVABILITY_RU.md`](audit/OPERATIONS_OBSERVABILITY_RU.md) | RISK‑11: `correlationId`, логи, SLO |
| [`audit/SUPPLY_CHAIN_RU.md`](audit/SUPPLY_CHAIN_RU.md) | RISK‑09: `yarn audit`, weekly triage, lockfile |
| [`audit/CI_COST_AND_TRENDS_RU.md`](audit/CI_COST_AND_TRENDS_RU.md) | RISK‑12: тренды CI, p95, разделение job |
| [`audit/RFC_CHATBOT_RUNTIME_ISOLATION_RU.md`](audit/RFC_CHATBOT_RUNTIME_ISOLATION_RU.md) | RFC-план изоляции/замены chatbot runtime (PERF-03) |

### Архитектурные решения — [`adr/`](adr/)

| Документ | Назначение |
|----------|------------|
| [`adr/README.md`](adr/README.md) | Индекс ADR 0001–0011 и шаблон |

### Гайды разработки — [`guides/`](guides/)

| Документ | Назначение |
|----------|------------|
| [`DEVELOPMENT_PLAYBOOK_RU.md`](DEVELOPMENT_PLAYBOOK_RU.md) | Точка входа для ежедневной работы |
| [`guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](guides/SCRIPTS_AND_QUALITY_GATES_RU.md) | Все `yarn` скрипты, CI, lint‑staged, pre‑commit |
| [`guides/CODE_STRUCTURE_AND_NAMING_RU.md`](guides/CODE_STRUCTURE_AND_NAMING_RU.md) | Слои, структура модулей, нейминг, роль `lib/` и `shared/` |
| [`guides/FEATURE_STRUCTURE_ROADMAP_RU.md`](guides/FEATURE_STRUCTURE_ROADMAP_RU.md) | Шаблон `features/*`, quality‑gate структуры |
| [`guides/API_AND_STORYBOOK_RU.md`](guides/API_AND_STORYBOOK_RU.md) | Контракт API, валидация, Storybook |
| [`guides/PERF_AND_SEO_CHECKLIST_RU.md`](guides/PERF_AND_SEO_CHECKLIST_RU.md) | Чеклист перед релизом, Lighthouse, бюджеты |
| [`guides/YARN_PACKAGE_MANAGER_RU.md`](guides/YARN_PACKAGE_MANAGER_RU.md) | Только Yarn, `yarn audit` |
| [`guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md`](guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md) | CI/CD через GitHub Actions, SSH, секреты |
| [`guides/DEPLOY_VERCEL_AND_VPS_RU.md`](guides/DEPLOY_VERCEL_AND_VPS_RU.md) | Vercel vs GHCR vs VPS: три пути выкладки, какие workflow и секреты |
| [`guides/MARKETING_ANALYTICS_DASHBOARD_RU.md`](guides/MARKETING_ANALYTICS_DASHBOARD_RU.md) | События, KPI воронки заявок |

### Операции и инфраструктура — [`operations/`](operations/)

| Документ | Назначение |
|----------|------------|
| [`operations/MULTISITE_VPS_DEPLOY_RU.md`](operations/MULTISITE_VPS_DEPLOY_RU.md) | Деплой `premium-design.pro` + `febcode.pro` на одном VPS (Docker + nginx + Let's Encrypt), без смешения репозиториев |

### Нормы для индексации (RAG / MemPalace) — [`mempalace/rules/`](mempalace/rules/)

Короткие нормы по темам, **канонический источник** правил для агента и команды.

| № | Тема | Файл |
|---|------|------|
| 01 | Веб‑архитектура и границы зависимостей | [`01_WEB_ARCHITECTURE_AND_BOUNDARIES_RU.md`](mempalace/rules/01_WEB_ARCHITECTURE_AND_BOUNDARIES_RU.md) |
| 02 | UI‑компоненты, токены, темизация, модалки | [`02_WEB_UI_COMPONENTS_AND_TOKENS_RU.md`](mempalace/rules/02_WEB_UI_COMPONENTS_AND_TOKENS_RU.md) |
| 03 | Доступность (a11y) и UX | [`03_WEB_A11Y_AND_UX_RU.md`](mempalace/rules/03_WEB_A11Y_AND_UX_RU.md) |
| 04 | Производительность (LCP/CLS/INP, бандл, кеш) | [`04_WEB_PERFORMANCE_RU.md`](mempalace/rules/04_WEB_PERFORMANCE_RU.md) |
| 05 | Безопасность и данные (OWASP‑lite) | [`05_WEB_SECURITY_AND_DATA_RU.md`](mempalace/rules/05_WEB_SECURITY_AND_DATA_RU.md) |
| 06 | Next.js: данные, формы, API/Server Actions | [`06_WEB_NEXTJS_DATA_AND_FORMS_RU.md`](mempalace/rules/06_WEB_NEXTJS_DATA_AND_FORMS_RU.md) |
| 07 | Тестирование (пирамида, моки, env, jsdom) | [`07_WEB_TESTING_AND_QUALITY_RU.md`](mempalace/rules/07_WEB_TESTING_AND_QUALITY_RU.md) |
| 08 | Чистая архитектура: use‑case, порты, адаптеры | [`08_CLEAN_ARCHITECTURE_USE_CASES_AND_PORTS_RU.md`](mempalace/rules/08_CLEAN_ARCHITECTURE_USE_CASES_AND_PORTS_RU.md) |
| 09 | Чистый код: SOLID/DRY/KISS/YAGNI | [`09_CLEAN_CODE_SOLID_DRY_KISS_YAGNI_RU.md`](mempalace/rules/09_CLEAN_CODE_SOLID_DRY_KISS_YAGNI_RU.md) |
| 10 | Ошибки и надёжность, таймауты, идемпотентность | [`10_ERRORS_AND_RELIABILITY_RU.md`](mempalace/rules/10_ERRORS_AND_RELIABILITY_RU.md) |
| 11 | Типизация и валидация (TS, Zod, границы) | [`11_TYPING_AND_VALIDATION_RU.md`](mempalace/rules/11_TYPING_AND_VALIDATION_RU.md) |
| 12 | Рефакторинг и технический долг | [`12_REFACTORING_AND_TECHNICAL_DEBT_RU.md`](mempalace/rules/12_REFACTORING_AND_TECHNICAL_DEBT_RU.md) |

### Инструменты (Cursor, MemPalace) — [`cursor/`](cursor/), [`mempalace/`](mempalace/)

| Документ | Назначение |
|----------|------------|
| [`cursor/README.md`](cursor/README.md) | MCP, шаблон конфигурации |
| [`mempalace/README.md`](mempalace/README.md) | Оглавление набора `rules/` и синхронизация с дворцом |
| [`mempalace/MEMPALACE_AGENT_MEMORY_RU.md`](mempalace/MEMPALACE_AGENT_MEMORY_RU.md) | Установка, `init`, `mine`, MCP в Cursor |
| [`mempalace/MEMPALACE_USAGE_RU.md`](mempalace/MEMPALACE_USAGE_RU.md) | Эксплуатация MemPalace |

---

## Принцип «один источник правды»

| Тема | Канонический источник | Где можно ссылаться, но **не дублировать** |
|------|----------------------|--------------------------------------------|
| Скрипты `package.json` | `premier-design/package.json` (поле `scripts`) | `guides/SCRIPTS_AND_QUALITY_GATES_RU.md`, `audit/QUALITY_GATES_SYNC_RU.md`, `audit/DEPLOY_READINESS_2026_04_RU.md`, `premier-design/README.md` |
| Реквизиты ИП и публичные контакты | `premier-design/shared/constants/company.ts` (`SITE_OPERATOR`) | `LegalRequisites`, `Phone`, `WorkHours`, `Address`, `generateStructuredData`, юр. тексты в `features/documents-content/*` |
| URL соцсетей (Telegram, VK, Instagram) | `premier-design/shared/constants/company.ts` (`SITE_SOCIAL` + `structuredData.sameAs`) | `shared/ui/social-icons/SocialIcons` — без литералов ссылок в UI |
| Multi-site VPS инфраструктура | Репозиторий **`lendings-vps-infra`** (compose и nginx в корне) | `docs/operations/MULTISITE_VPS_DEPLOY_RU.md`, `deploy/README.md`, `guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md` |
| Лицензия и IP | корневые `LICENSE` / `LICENSE_RU.md` + `adr/0011-proprietary-license.md` | `docs/README.md`, `premier-design/README.md` |
| Архитектурные нормы (слои/use‑case/SOLID) | `mempalace/rules/01, 08, 09` | `.cursor/rules/agent-mempalace-bootstrap.mdc`, `DEVELOPMENT_PLAYBOOK_RU.md`, `guides/CODE_STRUCTURE_AND_NAMING_RU.md` |
| Производительность | `mempalace/rules/04` + `guides/PERF_AND_SEO_CHECKLIST_RU.md` | `audit/DEPLOY_READINESS_2026_04_RU.md`, ADR `0009` |
| UI / токены / модалки | `mempalace/rules/02` + ADR `0001`/`0002`/`0003` | `audit/PROJECT_AUDIT_2026_04_RU.md`, `.cursor/rules/agent-mempalace-bootstrap.mdc` |
| Тесты | `mempalace/rules/07` | `guides/API_AND_STORYBOOK_RU.md`, `.cursor/rules/agent-mempalace-bootstrap.mdc` |
| Открытые задачи | `audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md` | — |
| История изменений | `premier-design/CHANGELOG.md` | — |

---

## Внутри приложения

- Runbook: `premier-design/README.md`
- История версий: `premier-design/CHANGELOG.md`

## Лицензия и интеллектуальная собственность

- [`LICENSE`](../LICENSE) — proprietary license (EN);
- [`LICENSE_RU.md`](../LICENSE_RU.md) — proprietary license (RU, преимущество в РБ);
- [`adr/0011-proprietary-license.md`](adr/0011-proprietary-license.md) — мотивация и правила внутреннего использования.
