# Синхронизация quality-gates и артефактов (RISK-08)

**Цель:** согласовать `docs/audit`, `CHANGELOG` и фактическое поведение CI, чтобы не было разночтений между настройками, скриптами в `premier-design/package.json` и сценариями в `.github/workflows/`.

## Когда обязательна синхронизация

- Изменение или добавление скриптов `check:*` / `test:*` / `lint` в `premier-design/package.json`.
- Правка workflow: `ci.yml`, `ci-trends.yml`, `e2e-extended.yml`, `security-high-weekly.yml`, `deploy.yml`.
- Изменение **реестра рисков** (новый гейт, снятие/добавление риска).
- Смена порогов: Lighthouse, SLA CI (`.ci-trends-14d.json` / `check-ci-sla.mjs`), SLO feedback, architecture allowlist.

## Чеклист

1. `premier-design/CHANGELOG.md` (раздел [Unreleased]) — что изменилось для разработчика/CI.
2. `docs/audit/PROJECT_RISK_REGISTER_2026_04_RU.md` — статусы/митигации, если риск затрагивается.
3. При влиянии на деплой/качество — при необходимости строка в `docs/audit/DEPLOY_READINESS_2026_04_RU.md`.
4. ADR — только при новом **архитектурном** решении (см. `docs/adr/README.md`).

## Самопроверка локально

- `cd premier-design && yarn check:risk:local` (или согласно регламенту pre-push в проекте).

Документ служит runbook-напоминанием: при смене гейтов **не** полагаться на память — пройти чеклист.
