# Зависимости и уязвимости (RISK-09)

**Политика:** только **Yarn**; `package-lock.json` в репозитории **не** ведётся. Lockfile: корневой `yarn.lock`.

## Что делаем регулярно

1. **PR-гейт** — `yarn audit --level critical` в `ci.yml`. **Yarn v1:** флаг `--level` влияет на **вывод** таблицы; **код выхода** ненулевой, если в дереве есть **любая** находка (в т.ч. moderate) — поэтому PR-гейт держим в зелёном состоянии за счёт актуального `yarn.lock` и при необходимости `resolutions` (см. корневой `package.json`).
2. **Еженедельно** — workflow `security-high-weekly.yml` + issue-шаблон `security_high_weekly.yml` для triage **high/critical** (см. ссылки в [`changelog.md`](../changelog.md)). В issue фиксируются ссылка на workflow run и имя artifact `security-high-weekly`, чтобы weekly и PR-гейт были сопоставимы.
3. **Triage-матрица (SEC-03)** — в weekly issue обязательна таблица: `package | severity | решение (update/mitigation/accepted risk) | дедлайн | PR/issue`.
4. **Ручной** — `yarn upgrade-interactive` по релизам, просмотр `CHANGELOG` пакетов next/react.

## SLA (рекомендуемо для команды)

- **Critical** — patch в срок, зависящий от среды; не деплоить с известной эксплуатируемой **critical** в prod-цепочке без снижения.
- **High** — план в weekly issue; снижать до `moderate` при возможности.

## Ссылки

- `docs/guides/yarn-package-manager-ru.md` — соглашения по менеджеру пакетов.
- Реестр рисков: RISK-09, колонка «митигирующие действия».

Документ фиксирует **процесс**; матрица CVE в markdown **не** дублируется (источник правды: `yarn audit` / GitHub).
