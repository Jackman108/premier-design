# Стоимость/длительность CI и тренды (RISK-12)

**Сигнал:** рост очереди раннеров, p95 `CI Quality Gates` выше согласованного SLA, флейки, избыточные job на каждом push.

## Что есть в репозитории

- **14-дневные тренды** — `.github/workflows/ci-trends.yml` + `scripts/report-ci-trends.mjs` (артефакт `.ci-trends-14d.{md,json}`; длительность с `run_started_at`).
- **SLA-гейт** — шаги в `ci-trends.yml` / `scripts/check-ci-sla.mjs` (см. комментарии в workflow и `CHANGELOG`): для `CI Quality Gates` применяется `CI_SLA_P95_BUDGET_MIN=25`.

## Текущая проверка (S2)

- Источник истины по p95 — артефакт `ci-trends-14d` из workflow `CI Trends (14d)`.
- Сравнение с бюджетом выполняется автоматически в шаге `Enforce CI SLA budget (p95)`; при `p95 > 25` workflow падает.
- Локально без `.ci-trends-14d.json` скрипт `check-ci-sla` корректно делает `skip`; это не заменяет CI-проверку.

## Как снижать стоимость, не ломая качество

1. **Hot-path** в PR — только гейты, необходимые для merge (см. `ci.yml`).
2. **Тяжёлые** e2e — вынесены: `@core` в merge, `@extended` в `e2e-extended.yml` (nightly / `workflow_dispatch`).
3. **Ретроспектива** — еженедельный просмотр артефакта `ci-trends-14d`: p95, флейки, рост шагов.

## Документация

При изменении матрицы workflow обновлять RISK-12/CHANGELOG по чеклисту `quality-gates-sync-ru.md`.
