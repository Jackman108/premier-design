# Зависимости и уязвимости (RISK-09)

**Политика:** только **Yarn**; `package-lock.json` в репозитории **не** ведётся. Lockfile: `yarn.lock` в `premier-design/`.

## Что делаем регулярно

1. **PR-гейт** — `yarn audit` (при необходимости с `--level critical` согласно `ci.yml`).
2. **Еженедельно** — workflow `security-high-weekly.yml` + issue-шаблон `security_high_weekly.yml` для triage **high/critical** (см. ссылки в `premier-design/CHANGELOG.md`).
3. **Ручной** — `yarn upgrade-interactive` по релизам, просмотр `CHANGELOG` пакетов next/react.

## SLA (рекомендуемо для команды)

- **Critical** — patch в срок, зависящий от среды; не деплоить с известной эксплуатируемой **critical** в prod-цепочке без снижения.
- **High** — план в weekly issue; снижать до `moderate` при возможности.

## Ссылки

- `docs/guides/YARN_PACKAGE_MANAGER_RU.md` — соглашения по менеджеру пакетов.
- Реестр рисков: RISK-09, колонка «митигирующие действия».

Документ фиксирует **процесс**; матрица CVE в markdown **не** дублируется (источник правды: `yarn audit` / GitHub).
