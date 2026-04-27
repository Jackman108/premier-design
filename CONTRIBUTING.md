# Contributing to Premier Design

Короткий чеклист для изменений в репозитории.

## Перед началом

- Прочитайте навигатор документации: `docs/README.md`.
- Для норм и архитектурных ограничений используйте `docs/mempalace/rules/01-12_*.md`.
- Для процесса и гейтов: `.cursor/rules/agent-quality-process.mdc`.

## Базовый рабочий цикл

1. `cd premier-design`
2. `yarn install`
3. `yarn check:static`
4. При изменении границ/архитектуры/конфигов: `yarn check:risk:local`

## Обязательная синхронизация документации

Если меняете скрипты, workflow, пороги качества или поведение API:

- обновите `docs/guides/SCRIPTS_AND_QUALITY_GATES_RU.md`;
- пройдите чеклист `docs/audit/QUALITY_GATES_SYNC_RU.md`;
- добавьте запись в `premier-design/CHANGELOG.md` (`[Unreleased]`).

## Стандарты качества

- Не нарушать dependency-rule (`shared` не импортирует `@features/*`/`@services/*`).
- В `*/ui/*` не размещать бизнес-логику и IO.
- Для границ данных использовать явную валидацию (Zod).
- Не коммитить артефакты (`node_modules`, `.next`, `package-lock.json`, секреты).
