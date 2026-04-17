# Документация Premier Design

Корень всех материалов по проекту (вне кода приложения в `premier-design/`).

## Стандарт оформления

- Язык: основной русский, технические термины допускаются на английском в скобках.
- Формат документов: краткий контекст → решение/действия → последствия/критерии.
- Пути, команды и идентификаторы оформляются в обратных кавычках.
- Для крупных изменений обязательно синхронизировать `docs/audit`, ADR и `premier-design/CHANGELOG.md`.

---

## Оглавление

### Аудит и стратегия

| Документ | Путь | Описание |
|----------|------|----------|
| Аудит и бэклог (v3.0 + v3.1) | [audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md](audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) | **Единый документ:** завершённые спринты 14–17, Definition of Done, актуальный бэклог (дизайн, маркетинг, структура, логика, безопасность, perf, прочее); выполненные строки не дублируются — см. `premier-design/CHANGELOG.md` |

### Архитектурные решения (ADR)

| Документ | Путь | Описание |
|----------|------|----------|
| Реестр ADR | [adr/README.md](adr/README.md) | Индекс всех ADR |
| UI-стек и токены | [adr/0001-ui-stack-and-design-tokens.md](adr/0001-ui-stack-and-design-tokens.md) | CSS Modules + токены, путь к опциональной миграции на HeroUI |
| Без Tailwind — Panda CSS | [adr/0002-no-tailwind-panda-css.md](adr/0002-no-tailwind-panda-css.md) | Utility/recipe через Panda CSS поверх проектных токенов |
| Модальные окна | [adr/0003-modal-standard-and-adapters.md](adr/0003-modal-standard-and-adapters.md) | Стандарт и адаптеры для модальных окон |

### Гайды по разработке

| Документ | Путь | Описание |
|----------|------|----------|
| Архитектура и нейминг | [guides/CODE_STRUCTURE_AND_NAMING_RU.md](guides/CODE_STRUCTURE_AND_NAMING_RU.md) | Границы слоёв, структура модулей, единый стиль именования |
| Структура feature-модулей | [guides/FEATURE_STRUCTURE_ROADMAP_RU.md](guides/FEATURE_STRUCTURE_ROADMAP_RU.md) | Шаблон `features/*`, этапы миграции, quality-gate |
| API и Storybook | [guides/API_AND_STORYBOOK_RU.md](guides/API_AND_STORYBOOK_RU.md) | API-валидация, тесты, документация UI-примитивов |
| Зависимости (только Yarn) | [guides/YARN_PACKAGE_MANAGER_RU.md](guides/YARN_PACKAGE_MANAGER_RU.md) | `yarn.lock` в git, без `package-lock.json`, `yarn audit` |

### Эксплуатация, производительность и SEO

| Документ | Путь | Описание |
|----------|------|----------|
| Деплой (CI/CD, SSH) | [guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md](guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md) | Деплой по SSH/SCP, ключ с passphrase, секреты |
| Perf и SEO чеклист | [guides/PERF_AND_SEO_CHECKLIST_RU.md](guides/PERF_AND_SEO_CHECKLIST_RU.md) | Чеклист перед релизом |

### Маркетинг

| Документ | Путь | Описание |
|----------|------|----------|
| KPI-дашборд и аналитика | [guides/MARKETING_ANALYTICS_DASHBOARD_RU.md](guides/MARKETING_ANALYTICS_DASHBOARD_RU.md) | Карта событий `dataLayer`, funnel-формулы, baseline и цели |

### MemPalace (память агента)

| Документ | Путь | Описание |
|----------|------|----------|
| Установка и MCP | [mempalace/MEMPALACE_AGENT_MEMORY_RU.md](mempalace/MEMPALACE_AGENT_MEMORY_RU.md) | `init` / `mine`, Cursor, безопасность, пошаговая настройка |
| Эксплуатация | [mempalace/MEMPALACE_USAGE_RU.md](mempalace/MEMPALACE_USAGE_RU.md) | `search` / `status` / `wake-up`, UTF-8 в Windows |
| Правила для RAG | [mempalace/README.md](mempalace/README.md) | `rules/01–12_*.md` (веб + чистая архитектура), синхронизация с дворцом |

### Cursor и MCP

| Документ | Путь | Описание |
|----------|------|----------|
| MCP-конфигурация | [cursor/README.md](cursor/README.md) | Шаблон `mcp.mempalace.example.json`, stdio-сервер |

---

## Правила для AI-агента

- Архитектура и чистый код: `.cursor/rules/agent-architecture-clean-code.mdc`
- Bootstrap-контекст: `.cursor/rules/agent-context-bootstrap.mdc`

## Внутри приложения

- Runbook: `premier-design/README.md`
- История версий: `premier-design/CHANGELOG.md`
