# Multi-site deploy — Premier Design + FEB Code (single VPS, single IP)

Каталог `deploy/` собран как **infra-only**: на VPS никогда не клонируются исходники приложений
(`premium-design` как **имя сервиса** в compose, `febcode`). Репозиторий приложения в git — каталог `premier-design/`. На сервер попадают только эта папка `deploy/` и публичные Docker-образы из
GHCR — каждый сайт остаётся в своём собственном репозитории и не смешивается с другим.

> Полный пошаговый гайд (DNS, сертификаты, секреты, обновления) —
> [`docs/operations/MULTISITE_VPS_DEPLOY_RU.md`](../docs/operations/MULTISITE_VPS_DEPLOY_RU.md).

## Состав

| Файл | Назначение |
|------|-----------|
| `docker-compose.yml` | Production запуск трёх контейнеров: `nginx`, `premium-design`, `febcode` (только `image:`, без `build:`). |
| `docker-compose.dev.yml` | Dev/test вариант той же топологии (HTTP-only nginx на `:8080`, без TLS/certbot). |
| `.env.example` | Шаблон переменных: имя владельца GHCR, теги образов, e-mail для Let's Encrypt, секреты. |
| `nginx/nginx.conf` | Глобальные директивы Nginx (gzip, лимиты, заголовки безопасности). |
| `nginx/conf.d/premium-design.pro.conf` | Виртуальный хост для `premium-design.pro` / `www.premium-design.pro`. |
| `nginx/conf.d/febcode.pro.conf` | Виртуальный хост для `febcode.pro` / `www.febcode.pro`. |
| `nginx/conf.d/_acme.conf` | HTTP-эндпоинт `/.well-known/acme-challenge/` для certbot (без TLS). |

## Поток деплоя (TL;DR)

1. Каждый репозиторий собирает Docker-образ и пушит в GHCR
   (см. `Dockerfile.prod` в `premier-design/`, аналогичный — в `febcode/`).
2. На VPS (Linux + Docker, единый публичный IP):
   ```bash
   git pull            # только инфраструктурная папка
   cp .env.example .env && $EDITOR .env
   docker compose pull
   docker compose --profile tls up -d
   ```
3. TLS-сертификаты — Let's Encrypt через `certbot` (см. гайд в `docs/operations/`),
   каталог `letsencrypt/` смонтирован в `nginx`.

## Ограничение по памяти VPS (важно)

`next build` для Next.js-проекта может занимать 2-3.5 GB RAM. На VPS 4 GB это риск OOM.
Поэтому production-схема в `deploy/` намеренно **pull-only**:

- сборка делается локально или в GitHub Actions;
- готовый Docker-образ публикуется в GHCR/Docker Hub/приватный registry;
- на VPS выполняется только `docker compose pull && docker compose up -d`.

## Изоляция репозиториев

- Образ `febcode` ссылается через `${FEBCODE_IMAGE}` (например, `ghcr.io/<owner>/febcode:latest`)
  — никаких относительных путей `../febcode` или `build:` в compose.
- В CI каждого сайта — workflow `Build & push image` с использованием GHCR.
- Если в будущем удобнее будет вынести `deploy/` в отдельный infra-репозиторий,
  переезд тривиален: переместить каталог как есть, ничего не править.

## Локальная проверка конфигурации

Чтобы проверить синтаксис `nginx.conf` без VPS:

```bash
docker run --rm \
  -v "$PWD/nginx/nginx.conf:/etc/nginx/nginx.conf:ro" \
  -v "$PWD/nginx/conf.d:/etc/nginx/conf.d:ro" \
  nginx:1.27-alpine nginx -t
```
