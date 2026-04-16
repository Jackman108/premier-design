# Документация Premier Design

Корень всех материалов по проекту (вне кода приложения в `premier-design/`).

## Стандарт оформления

- Язык: основной русский, технические термины допускаются на английском в скобках.
- Формат документов: краткий контекст -> решение/действия -> последствия/критерии.
- Пути, команды и идентификаторы оформляются в обратных кавычках.
- Для крупных изменений обязательно синхронизировать `docs/audit`, ADR и `premier-design/CHANGELOG.md`.

## Оглавление

| Раздел | Путь | Описание |
|--------|------|----------|
| Аудит и дорожная карта | [audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md](audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) | **Открытый бэклог** (незакрытые ID), ориентир по спринтам, Definition of Done |
| ADR (архитектурные решения) | [adr/README.md](adr/README.md) | Реестр ADR, включая UI-стек без Tailwind |
| Зависимости (только Yarn) | [guides/YARN_PACKAGE_MANAGER_RU.md](guides/YARN_PACKAGE_MANAGER_RU.md) | `yarn.lock` в git, без `package-lock.json`; аудит через `yarn audit` |
| Архитектура и нейминг кода | [guides/CODE_STRUCTURE_AND_NAMING_RU.md](guides/CODE_STRUCTURE_AND_NAMING_RU.md) | Границы слоя представления, структура модулей, единый стиль именования и правила выноса общего кода |
| Структура feature-модулей | [guides/FEATURE_STRUCTURE_ROADMAP_RU.md](guides/FEATURE_STRUCTURE_ROADMAP_RU.md) | Шаблон `features/*`, этапы миграции и quality-gate по структуре |
| API и Storybook | [guides/API_AND_STORYBOOK_RU.md](guides/API_AND_STORYBOOK_RU.md) | Контракт по API-валидации, тестам и обязательной документации UI-примитивов |
| Маркетинг и KPI-дашборд | [guides/MARKETING_ANALYTICS_DASHBOARD_RU.md](guides/MARKETING_ANALYTICS_DASHBOARD_RU.md) | Карта событий `dataLayer`, funnel-формулы, baseline и целевые значения |
| Память агента (MemPalace, опционально) | [guides/MEMPALACE_AGENT_MEMORY_RU.md](guides/MEMPALACE_AGENT_MEMORY_RU.md) | Локальная память вне репозитория, MCP, безопасность |
| Эксплуатация и CI/CD | [guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md](guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md) | Деплой по SSH/SCP; **пошагово: ключ с passphrase**, секреты, ошибки |
| Perf и SEO | [guides/PERF_AND_SEO_CHECKLIST_RU.md](guides/PERF_AND_SEO_CHECKLIST_RU.md) | Чеклист перед релизом |

## Прочее

- Примеры Cursor (MCP): [cursor/README.md](cursor/README.md)
- Runbook приложения: `premier-design/README.md`
- История версий приложения: `premier-design/CHANGELOG.md`
- Правила для ИИ-агента: `.cursor/rules/agent-architecture-clean-code.mdc`
- Bootstrap-контекст агента: `.cursor/rules/agent-context-bootstrap.mdc`
