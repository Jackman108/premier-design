# Документация Premier Design

Материалы **вне кода приложения** (`premier-design/` — Next.js). Правила для агента: `.cursor/rules/agent-architecture-clean-code.mdc`, bootstrap: `agent-context-bootstrap.mdc`.

## Как читать этот каталог

1. **Перед деплоем** — [audit/DEPLOY_READINESS_2026_04_RU.md](audit/DEPLOY_READINESS_2026_04_RU.md).  
2. **Бэклог и история аудита** — [audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md](audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) + `premier-design/CHANGELOG.md`.  
3. **Архитектурные решения** — единый реестр [adr/README.md](adr/README.md) (не дублировать таблицу ADR здесь).  
4. **Повседневная разработка** — раздел «Гайды» ниже.

### Стандарт оформления документов

- Язык: русский; термины на английском при необходимости в скобках.  
- Структура: контекст → решение / действия → критерии готовности.  
- Пути и команды в обратных кавычках.  
- Крупные изменения: синхронизация `docs/audit`, ADR и `premier-design/CHANGELOG.md`.

---

## Оглавление по темам

### Аудит и релиз

| Документ | Описание |
|----------|----------|
| [audit/README.md](audit/README.md) | Индекс папки `audit/` |
| [audit/DEPLOY_READINESS_2026_04_RU.md](audit/DEPLOY_READINESS_2026_04_RU.md) | Финальный чеклист деплоя и улучшения для продакшена услуг |
| [audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md](audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) | Аудит v3.0–v3.1, DoD, открытый бэклог |

### Архитектура (ADR)

| Документ | Описание |
|----------|----------|
| [adr/README.md](adr/README.md) | Полный список ADR 0001–0009 и шаблон записи |

### Гайды разработки

| Документ | Описание |
|----------|----------|
| [guides/CODE_STRUCTURE_AND_NAMING_RU.md](guides/CODE_STRUCTURE_AND_NAMING_RU.md) | Слои, структура модулей, нейминг |
| [guides/FEATURE_STRUCTURE_ROADMAP_RU.md](guides/FEATURE_STRUCTURE_ROADMAP_RU.md) | Шаблон `features/*`, quality-gate |
| [guides/API_AND_STORYBOOK_RU.md](guides/API_AND_STORYBOOK_RU.md) | API, валидация, Storybook |
| [guides/YARN_PACKAGE_MANAGER_RU.md](guides/YARN_PACKAGE_MANAGER_RU.md) | Только Yarn, `yarn audit` |

### Эксплуатация, perf, SEO

| Документ | Описание |
|----------|----------|
| [guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md](guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md) | CI/CD, SSH, секреты |
| [guides/PERF_AND_SEO_CHECKLIST_RU.md](guides/PERF_AND_SEO_CHECKLIST_RU.md) | Чеклист перед релизом, Lighthouse, бюджеты |

### Маркетинг

| Документ | Описание |
|----------|----------|
| [guides/MARKETING_ANALYTICS_DASHBOARD_RU.md](guides/MARKETING_ANALYTICS_DASHBOARD_RU.md) | `dataLayer`, воронка, KPI |

### Инструменты (Cursor, MemPalace)

| Документ | Описание |
|----------|----------|
| [cursor/README.md](cursor/README.md) | MCP, шаблон конфигурации |
| [mempalace/README.md](mempalace/README.md) | Правила для RAG, ссылки на `rules/` |
| [mempalace/MEMPALACE_AGENT_MEMORY_RU.md](mempalace/MEMPALACE_AGENT_MEMORY_RU.md) | Опциональная память агента |
| [mempalace/MEMPALACE_USAGE_RU.md](mempalace/MEMPALACE_USAGE_RU.md) | Эксплуатация MemPalace |

---

## Внутри приложения

- Runbook: `premier-design/README.md`  
- История версий: `premier-design/CHANGELOG.md`
