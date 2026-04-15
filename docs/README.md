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
| Архитектура и нейминг кода | [guides/CODE_STRUCTURE_AND_NAMING_RU.md](guides/CODE_STRUCTURE_AND_NAMING_RU.md) | Границы слоя представления, структура модулей, единый стиль именования и правила выноса общего кода |
| Эксплуатация и CI/CD | [guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md](guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md) | Деплой по SSH/SCP; **пошагово: ключ с passphrase**, секреты, ошибки |
| Perf и SEO | [guides/PERF_AND_SEO_CHECKLIST_RU.md](guides/PERF_AND_SEO_CHECKLIST_RU.md) | Чеклист перед релизом |

## Прочее

- Runbook приложения: `premier-design/README.md`
- История версий приложения: `premier-design/CHANGELOG.md`
- Правила для ИИ-агента: `.cursor/rules/agent-architecture-clean-code.mdc`
