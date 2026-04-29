# Деплой: Vercel, GHCR и VPS (два сайта в Docker)

Кратко: **три независимых пути** — Vercel (PaaS), образ в **GHCI/GHCR** (сборка в GitHub), **VPS** с Docker Compose в репозитории **`lendings-vps-infra`** (два контейнера + nginx). Они **не** заменяют друг друга: не путайте `HOST` SSH с доменом сайта на Vercel.

## Контракт деплоя на VPS (оба приложения)

Единая цепочка для образов **premium-design** и **febcode** (задача **DEV-05**):

1. В репозитории приложения: успешный workflow сборки → образ в **GHCR** (`ghcr.io/<owner>/…`).
2. На сервере: только дерево **`lendings-vps-infra`**; переменные `PREMIUM_DESIGN_IMAGE` / `FEBCODE_IMAGE` в корневом `.env` указывают на нужные теги.
3. Обновление: `docker compose pull <сервис>` → `docker compose up -d` (на VPS без сборки Next из исходников).
4. Проверка: см. гайд infra ([`multisite-vps-deploy-ru.md`](../../../lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md)) — healthcheck, TLS, точечный smoke.
5. Откат: откат тега образа в `.env` + снова `pull`/`up`; см. тот же гайд.

Общий словарь и правило ведения changelog по трём репозиториям — [`cross-repo-rule-pack-ru.md`](cross-repo-rule-pack-ru.md).

## 1. Vercel (текущий частый прод)

- Подключение репозитория в [Vercel](https://vercel.com) → **Import** → тот же GitHub-репозиторий.
- **Root Directory** в настройках проекта: `premier-design` (каталог Next.js с `package.json`).
- Команда сборки и выходная директория — **по умолчанию** для Next.js; при необходимости: Install `yarn install`, Build `yarn build`, как в `premier-design/package.json`.
- Секреты (env) задаются в панели Vercel; `VERCEL=1` проставляется [автоматически](https://vercel.com/docs/projects/environment-variables/system-environment-variables).
- **GitHub Actions** из этого репозитория **не** деплоят на Vercel, если не добавить отдельный job с [Vercel CLI / официальным action](https://vercel.com/docs/deployments/git) — обычно **не требуется** при включённой Git-интеграции Vercel.

**Проверка:** после пуша в `master` — вкладка **Deployments** у проекта Vercel, успешный build и URL превью/прод.

## 2. Образ в GHCR (нужен для Docker на VPS)

Workflow: [`.github/workflows/ghcr-premium-design.yml`](../../.github/workflows/ghcr-premium-design.yml).

- Запуск: **push в `master`** (если менялся `premier-design/`) или вручную **Actions → Build & push premium-design image (GHCR) → Run workflow**).
- Публикует, например: `ghcr.io/<owner-in-lower>/premium-design:latest` и тег **SHA** коммита.
- Пакет: **GitHub** → **Packages** → убедитесь, что образ **public** или на VPS настроен `docker login` для **private** пакета (см. [GHCR](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)).

Файл `.env` в **корне клона `lendings-vps-infra`** на сервере должен содержать тот же образ, что пушит CI:

```env
PREMIUM_DESIGN_IMAGE=ghcr.io/<owner-lower>/premium-design:latest
```

## 3. VPS: два сайта (Docker) без Vercel

- Инфраструктура: отдельный репозиторий **`lendings-vps-infra`** (compose и nginx в **корне** клона). Указатель из этого репо: [`deploy/README.md`](../../deploy/README.md); **пошагово** — [`lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md`](../../../lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md).
- На сервере: только клон **`lendings-vps-infra`** и `docker compose pull` готовых образов — **без** `build` исходников сайта внутри compose.
- Второй сайт (`febcode`) — **другой** репозиторий и свой образ; на одном nginx два `server_name`.

**Обновление premier-design на VPS (вручную):**

```bash
cd /path/to/lendings-vps-infra
docker compose pull premium-design
docker compose up -d premium-design
```

## 4. Деплой с GitHub на VPS (только `docker compose pull`, без пакета исходников)

Workflow: [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) (вручную: **Run workflow**). Дополнительно: секрет **`VPS_DEPLOY_PATH`** — абсолютный путь к **корню клона `lendings-vps-infra`** на сервере; для private GHCR — **`GHCR_USER`** + **`GHCR_PULL_TOKEN`**, для public-образа — не задавайте.

- Нужен SSH до вашего Linux-сервера и **путь** к корню infra-репозитория на диске (секрет `VPS_DEPLOY_PATH`).
- После **появления нового** образа в GHCR (п. 2) workflow дёргает на сервере `docker compose pull` + `up -d`.
- Это **не** Vercel: секрет `HOST` — **IP/хост сервиса SSH** сервера, не `*.vercel.app`.
- Старый вариант «tar всего репо + `docker-compose` в корне» **снят** — используется pull-only из **`lendings-vps-infra`**.

Подробнее по SSH и ключам: [`deploy-ssh-github-actions-ru.md`](./deploy-ssh-github-actions-ru.md) (секция про `HOST` и Vercel актуальна и здесь).
