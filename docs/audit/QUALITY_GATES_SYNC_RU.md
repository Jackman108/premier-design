# Синхронизация quality‑gates и артефактов (RISK‑08)

**Цель:** согласовать `docs/audit`, `CHANGELOG`, скрипты `package.json` и сценарии `.github/workflows/`, чтобы не было разночтений между настройками, локальными командами и CI.

## Когда обязательна синхронизация

- Изменение или добавление скриптов `check:*` / `test:*` / `lint` / `typecheck` в `premier-design/package.json`.
- Правка workflow: `ci.yml`, `ci-trends.yml`, `e2e-extended.yml`, `security-high-weekly.yml`, `deploy.yml`.
- Справочник [`docs/guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](../guides/SCRIPTS_AND_QUALITY_GATES_RU.md) — обновить **в той же задаче**, что и `package.json`.
- Изменение **реестра рисков** (новый гейт, снятие/добавление риска).
- Смена порогов: Lighthouse, SLA CI (`.ci-trends-14d.json` / `check-ci-sla.mjs`), SLO feedback, architecture allowlist, бюджет initial JS.
- Изменение `lint-staged` или `.husky/*` (pre‑commit / pre‑push).

## Чеклист

1. `premier-design/CHANGELOG.md` (раздел [Unreleased]) — что изменилось для разработчика/CI.
2. [`docs/guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](../guides/SCRIPTS_AND_QUALITY_GATES_RU.md) — таблицы скриптов и составных гейтов в актуальном виде.
3. `docs/audit/PROJECT_RISK_REGISTER_2026_04_RU.md` — статусы/митигации, если риск затрагивается.
4. При влиянии на деплой/качество — строка в [`DEPLOY_READINESS_2026_04_RU.md`](DEPLOY_READINESS_2026_04_RU.md).
5. ADR — только при новом **архитектурном** решении (см. [`docs/adr/README.md`](../adr/README.md)).
6. `.cursor/rules/agent-quality-process.mdc` — обновить таблицу «когда обязательно обновить документацию», если меняется маршрут синхронизации.
7. `.cursor/rules/agent-mempalace-bootstrap.mdc` — если меняется **оглавление** норм (`docs/mempalace/README.md`) или таблица «тема → файл» в bootstrap, синхронизировать в той же задаче.

## Самопроверка локально

- `cd premier-design && yarn check:risk:local` (или согласно регламенту pre‑push в проекте).
- При значимых изменениях скриптов/гейтов: `yarn check:precommit:full` для полного прохода.

Документ служит runbook‑напоминанием: при смене гейтов **не** полагаться на память — пройти чеклист.
