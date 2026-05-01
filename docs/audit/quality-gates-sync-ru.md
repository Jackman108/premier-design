# Синхронизация quality‑gates и артефактов (RISK‑08)

**Цель:** согласовать `docs/audit`, [`changelog.md`](../changelog.md), скрипты `package.json` и сценарии `.github/workflows/`, чтобы не было разночтений между настройками, локальными командами и CI.

## Когда обязательна синхронизация

- Изменение или добавление скриптов `check:*` / `test:*` / `lint` / `typecheck` в `premier-design/package.json`, а также поля **`engines`** или файла **`premier-design/.nvmrc`**.
- Правка workflow: `ci.yml`, `ci-trends.yml`, `e2e-extended.yml`, `security-high-weekly.yml`, `deploy.yml`, `ghcr-premium-design.yml`, `codeql.yml`, **`docs-markdown-links.yml`**; корень **`.github/dependabot.yml`**; **`.markdown-link-check.json`**. **Web Vitals (BP-03):** `app/api/vitals/route.ts`, `shared/ui/web-vitals/WebVitalsReporter.tsx`, `shared/lib/web-vitals-ingest.ts`, `next.config.js` (CSP `connect-src`), `.env.example` (`WEB_VITALS_LOG`).
- Справочник [`docs/guides/scripts-and-quality-gates-ru.md`](../guides/scripts-and-quality-gates-ru.md) — обновить **в той же задаче**, что и `package.json`.
- Изменение **реестра рисков** (новый гейт, снятие/добавление риска).
- Смена порогов: Lighthouse, SLA CI (`.ci-trends-14d.json` / `check-ci-sla.mjs`), SLO feedback, architecture allowlist, бюджет initial JS.
- Изменение `lint-staged` или `.husky/*` (pre‑commit / pre‑push).
- Правка инфраструктуры в репозитории **`lendings-vps-infra`** (compose, nginx, certbot) — обязательно обновить `docs/audit/quality-gates-sync-infra-ru.md` там и ссылки в этом репозитории (`deploy/README.md`, `lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md`).
  [`lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md`](../../../lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md)
  и [`changelog.md`](../changelog.md).
- Правка `LICENSE` / `LICENSE_RU.md` / `package.json.license` — обновить ADR
  [`docs/adr/0011-proprietary-license.md`](../adr/0011-proprietary-license.md).
- Правка `shared/constants/company.ts` (`SITE_OPERATOR`) — проверить, что новые/изменённые
  поля действительно потребляются `LegalRequisites`, `Phone`, `WorkHours`, `Address`,
  `generateStructuredData` и юридическими текстами (никаких литералов в потребителях).

## Чеклист

1. [`changelog.md`](../changelog.md) (раздел [Unreleased]) — что изменилось для разработчика/CI.
2. [`docs/guides/scripts-and-quality-gates-ru.md`](../guides/scripts-and-quality-gates-ru.md) — таблицы скриптов и составных гейтов в актуальном виде.
3. `docs/audit/project-risk-register-2026-04-ru.md` — статусы/митигации, если риск затрагивается.
4. При влиянии на деплой/качество — строка в [`deploy-readiness-ru.md`](deploy-readiness-ru.md).
5. ADR — только при новом **архитектурном** решении (см. [`docs/adr/README.md`](../adr/README.md)).
6. `.cursor/rules/agent-quality-process.mdc` — обновить таблицу «когда обязательно обновить документацию», если меняется маршрут синхронизации.
7. `.cursor/rules/agent-mempalace-bootstrap.mdc` — если меняется **оглавление** норм (`docs/mempalace/README.md`) или таблица «тема → файл» в bootstrap, синхронизировать в той же задаче.

## Самопроверка локально

- `cd premier-design && yarn check:risk:local` (или согласно регламенту pre‑push в проекте).
- При значимых изменениях скриптов/гейтов: `yarn check:precommit:full` для полного прохода.

Документ служит runbook‑напоминанием: при смене гейтов **не** полагаться на память — пройти чеклист.
