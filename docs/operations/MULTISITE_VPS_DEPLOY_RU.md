# Multi-site VPS deploy (premium-design.pro + febcode.pro)

**Обновлено**: 29.04.2026

Каноническая конфигурация (**nginx**, `docker-compose`, certbot, шаблоны секретов) и пошаговый гайд перенесены в отдельный репозиторий **`lendings-vps-infra`**.

## Где искать

| Материал | Путь |
|----------|------|
| Полный гайд по VPS, DNS, первому запуску | Репозиторий **`lendings-vps-infra`**: [`docs/MULTISITE_VPS_DEPLOY_RU.md`](../../../lendings-vps-infra/docs/MULTISITE_VPS_DEPLOY_RU.md) (работает при клоне **рядом** с этим репо: общий родитель `lendings/`). |
| Локальный dev Docker (`:8080`, hosts, сбои nginx на Windows) | [`docs/LOCAL_DOCKER_DEV_RU.md`](../../../lendings-vps-infra/docs/LOCAL_DOCKER_DEV_RU.md) в том же infra-репозитории. |
| Указатель и миграция с каталога `deploy/` | [`deploy/README.md`](../../deploy/README.md). |

После публикации **`lendings-vps-infra`** на GitHub замените относительные ссылки на постоянный URL репозитория в вашей организации.

## Краткий принцип (без дублирования команд)

| Слой | premium-design.pro | febcode.pro |
|------|---------------------|--------------|
| Репозиторий приложения | этот репозиторий (`premier-design/`) | **febcode** (отдельный git) |
| CI / образ | GHCR `premium-design` | GHCR `febcode` |
| На VPS | только клон **lendings-vps-infra** + `docker compose pull` | то же |

Исходники приложений на сервер **не** клонируются.

## GitHub Actions

Workflow **Deploy premium-design to VPS** (`.github/workflows/deploy.yml`): секрет **`VPS_DEPLOY_PATH`** — абсолютный путь к **корню клона `lendings-vps-infra`** на сервере (где лежат `docker-compose.yml` и `nginx/`).

Подробнее: [`guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md`](../guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md).
