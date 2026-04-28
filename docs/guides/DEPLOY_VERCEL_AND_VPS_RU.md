# Деплой: Vercel, GHCR и VPS (два сайта в Docker)

Кратко: **три независимых пути** — Vercel (PaaS), образ в **GHCI/GHCR** (сборка в GitHub), **VPS** с `deploy/docker-compose` (два контейнера + nginx). Они **не** заменяют друг друга: не путайте `HOST` SSH с доменом сайта на Vercel.

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

`deploy/.env` на сервере должен содержать тот же образ, что пушит CI:

```env
PREMIUM_DESIGN_IMAGE=ghcr.io/<owner-lower>/premium-design:latest
```

## 3. VPS: два сайта (Docker) без Vercel

- Инфраструктура: каталог `deploy/`, описание: [`deploy/README.md`](../../deploy/README.md) и **пошагово** — [`docs/operations/MULTISITE_VPS_DEPLOY_RU.md`](../operations/MULTISITE_VPS_DEPLOY_RU.md).
- На сервере: только `deploy/` (compose, nginx, секреты) и `docker compose pull` готовых образов — **без** `build` исходников сайта внутри compose (см. README в `deploy/`).
- Второй сайт (`febcode`) — **другой** репозиторий и свой образ; на одном nginx два `server_name`.

**Обновление premier-design на VPS (вручную):**

```bash
cd /path/to/deploy
docker compose pull premium-design
docker compose up -d premium-design
```

## 4. Деплой с GitHub на VPS (только `docker compose pull`, без пакета исходников)

Workflow: [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) (вручную: **Run workflow**). Дополнительно: секрет **`VPS_DEPLOY_PATH`** — абсолютный путь к копии каталога `deploy/` на сервере; для private GHCR — **`GHCR_USER`** + **`GHCR_PULL_TOKEN`**, для public-образа — не задавайте.

- Нужен SSH до вашего Linux-сервера и **путь** к папке `deploy/` на диске (секрет `VPS_DEPLOY_PATH`).
- После **появления нового** образа в GHCR (п. 2) workflow дёргает на сервере `docker compose pull` + `up -d`.
- Это **не** Vercel: секрет `HOST` — **IP/хост сервиса SSH** сервера, не `*.vercel.app`.
- Старый вариант «tar всего репо + `docker-compose` в корне» **снят** — несовместим с `deploy/docker-compose` и pull-only.

Подробнее по SSH и ключам: [`DEPLOY_SSH_GITHUB_ACTIONS_RU.md`](./DEPLOY_SSH_GITHUB_ACTIONS_RU.md) (секция про `HOST` и Vercel актуальна и здесь).
