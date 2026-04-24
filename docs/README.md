# Документация Premier Design

Материалы **вне кода приложения** (`premier-design/` — Next.js). Правила для агента: `.cursor/rules/agent-architecture-clean-code.mdc` (темизация, модалки, моки хуков), bootstrap: `agent-context-bootstrap.mdc`. Дополнение по UI/тестам: `docs/mempalace/rules/02_WEB_UI_COMPONENTS_AND_TOKENS_RU.md`, `07_WEB_TESTING_AND_QUALITY_RU.md`.

## Как читать этот каталог

1. **Аудит и визуальный бэклог** — [audit/PROJECT_AUDIT_2026_04_RU.md](audit/PROJECT_AUDIT_2026_04_RU.md): статус закрытого сводного аудита, таблица FSD-отклонений, список улучшений дизайна/вёрстки.  
2. **Перед деплоем** — [audit/DEPLOY_READINESS_2026_04_RU.md](audit/DEPLOY_READINESS_2026_04_RU.md).  
3. **Риски и митигации** — [audit/PROJECT_RISK_REGISTER_2026_04_RU.md](audit/PROJECT_RISK_REGISTER_2026_04_RU.md) + `premier-design/CHANGELOG.md`.  
4. **Открытый бэклог улучшений** — [audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md](audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) (только нереализованные задачи; закрытые — в `CHANGELOG.md`).  
5. **Архитектурные решения** — единый реестр [adr/README.md](adr/README.md) (не дублировать таблицу ADR здесь).  
6. **Повседневная разработка** — раздел «Гайды» ниже.

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
| [audit/PROJECT_AUDIT_2026_04_RU.md](audit/PROJECT_AUDIT_2026_04_RU.md) | Индекс аудита, FSD-таблица, направления улучшения UI/вёрстки |
| [audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md](audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) | Открытый бэклог улучшений и Definition of Done |
| [audit/DEPLOY_READINESS_2026_04_RU.md](audit/DEPLOY_READINESS_2026_04_RU.md) | Финальный чеклист деплоя и улучшения для продакшена услуг |
| [audit/PROJECT_RISK_REGISTER_2026_04_RU.md](audit/PROJECT_RISK_REGISTER_2026_04_RU.md) | Реестр текущих рисков (вероятность/влияние/митигации) |
| [audit/QUALITY_GATES_SYNC_RU.md](audit/QUALITY_GATES_SYNC_RU.md) | RISK-08: чеклист синхронизации `CHANGELOG` / workflow / гейты |
| [audit/OPERATIONS_OBSERVABILITY_RU.md](audit/OPERATIONS_OBSERVABILITY_RU.md) | RISK-11: `correlationId`, логи, SLO |
| [audit/SUPPLY_CHAIN_RU.md](audit/SUPPLY_CHAIN_RU.md) | RISK-09: `yarn audit`, triage, lockfile |
| [audit/CI_COST_AND_TRENDS_RU.md](audit/CI_COST_AND_TRENDS_RU.md) | RISK-12: `ci-trends`, SLA, разделение job |

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
