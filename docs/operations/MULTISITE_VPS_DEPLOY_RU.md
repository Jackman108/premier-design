# Multi-site VPS deploy: premium-design.pro + febcode.pro

Документ описывает деплой двух независимых сайтов на одном белорусском VPS с одним публичным IP,
обслуживаемых одним nginx-фронтом, **без слияния репозиториев и локальных папок** двух проектов.

> Конфигурация — `deploy/` (см. [`deploy/README.md`](../../deploy/README.md)). Здесь только процесс.

## Принцип изоляции

| Слой | premium-design.pro | febcode.pro |
|------|---------------------|--------------|
| Репозиторий | `premier-design/` (каталог Next.js в git) | `feb-code/febcode` (отдельный) |
| Локальная папка | `…\репо\premier-design\…` | `C:\Users\user\Documents\feb-code\febcode` |
| CI / сборка | Yarn → `Dockerfile.prod` → push в **GHCR** (тег образа, реком. `ghcr.io/<owner>/premium-design`) | свой workflow → push в **GHCR** (`ghcr.io/<owner>/febcode`) |
| Что лежит на VPS | только содержимое `deploy/` (compose, nginx, certbot, секреты) и **pull**-нутые образы | то же |
| Где переменные среды | `deploy/secrets/premium-design.env` | `deploy/secrets/febcode.env` |

Источники не клонируются на сервер ни для одного из сайтов — никаких `build:` в compose,
никаких смешанных рабочих копий. Если позже захочется полная инфра-изоляция —
можно вынести `deploy/` в отдельный infra-репозиторий, состав файлов не меняется.

## Подготовка (один раз)

1. **VPS** — Linux (Ubuntu 24.04+), Docker Engine + plugin `compose v2`, открытые порты 80/443,
   прямой доступ по SSH. Желательно `unattended-upgrades`, `fail2ban`, минимум `ufw`/`nftables`
   (allow 22/80/443).
2. **DNS** — A-записи `premium-design.pro`, `www.premium-design.pro`, `febcode.pro`,
   `www.febcode.pro` указывают на единственный IP VPS.
3. **GHCR** — для обоих репозиториев включён GitHub Packages, образы делаются `public` либо
   `read:packages` PAT добавлен в `deploy/.docker/config.json` на VPS.
4. **Образы** — каждый репозиторий запушил свежий тег (например, `latest` и стабильный `vX.Y.Z`).

## Первый запуск на VPS

```bash
# Только инфра-репозиторий (или отдельный infra-репо).
git clone <infra-repo>.git /srv/web && cd /srv/web/deploy

# Секреты
cp .env.example .env && $EDITOR .env
mkdir -p secrets
$EDITOR secrets/premium-design.env   # EMAIL_HOST/USERNAME/PASSWORD, TELEGRAM_*
$EDITOR secrets/febcode.env

# Сертификаты — через certbot во временном HTTP-режиме.
mkdir -p letsencrypt acme-webroot
docker compose up -d nginx
docker run --rm \
  -v "$PWD/letsencrypt:/etc/letsencrypt" \
  -v "$PWD/acme-webroot:/var/www/certbot" \
  certbot/certbot:latest certonly --webroot -w /var/www/certbot \
    -d premium-design.pro -d www.premium-design.pro \
    --email "$LETSENCRYPT_EMAIL" --agree-tos --non-interactive
docker run --rm \
  -v "$PWD/letsencrypt:/etc/letsencrypt" \
  -v "$PWD/acme-webroot:/var/www/certbot" \
  certbot/certbot:latest certonly --webroot -w /var/www/certbot \
    -d febcode.pro -d www.febcode.pro \
    --email "$LETSENCRYPT_EMAIL" --agree-tos --non-interactive

# Полный запуск (включая авто-renewal).
docker compose pull
docker compose --profile tls up -d
docker compose ps
```

После этого:
- `https://premium-design.pro` → контейнер `premium-design`;
- `https://febcode.pro` → контейнер `febcode`;
- ACME-renewal работает автоматически через сервис `certbot` каждые 12 часов;
- общий `nginx` отдаёт правильный сертификат по `server_name`.

## Обновление одного из сайтов

```bash
# Сайт premium-design.pro (после публикации нового тега из его CI).
cd /srv/web/deploy
docker compose pull premium-design
docker compose up -d premium-design

# febcode (полностью независимо).
docker compose pull febcode
docker compose up -d febcode
```

`nginx` и `certbot` не перезапускаются — простой каждого приложения ограничен временем
запуска одного контейнера (`HEALTHCHECK` из `Dockerfile.prod` ждёт 200 на корне).

## Dev/test проверка compose-конфигурации

Для локальной проверки той же схемы роутинга (2 приложения + nginx) без TLS:

```bash
cd /srv/web/deploy
docker compose -f docker-compose.dev.yml pull
docker compose -f docker-compose.dev.yml up -d
```

Dev nginx слушает `:8080`. Для host-based маршрутизации добавьте в hosts:

- `<IP или 127.0.0.1> premium-design.pro www.premium-design.pro`
- `<IP или 127.0.0.1> febcode.pro www.febcode.pro`

## Откат

Образы тегируются и сохраняются в GHCR. Откат:

```bash
# В .env заменить `:latest` на конкретный тег и
docker compose pull premium-design
docker compose up -d premium-design
```

## Проверки и контроль

- `curl -I https://premium-design.pro` → `200 OK`, `Strict-Transport-Security`, `X-Frame-Options: DENY`.
- `curl -I https://febcode.pro` → то же.
- `docker compose ps` — все сервисы `healthy`.
- `docker compose logs --tail=200 nginx`.

## Связь с CI/CD GitHub Actions (опционально)

Текущий [`deploy.yml`](../../.github/workflows/deploy.yml) с SCP+SSH
(см. [`guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md`](../guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md))
после миграции остаётся актуальным с одной правкой: вместо упаковки исходников
через `tar` workflow выполняет `docker compose pull && docker compose up -d <service>`
по SSH — на сервере не требуется ни Yarn, ни Node, ни сборка.

## Почему build не на VPS

Для VPS уровня `2vCPU / 4-6GB RAM / 50GB NVMe` сборка `next build` может потреблять до 2-3.5 GB RAM.
На 4 GB это риск OOM и деградации соседних сервисов.

Рекомендуемый pipeline (и он уже поддержан файлами в `deploy/`):

1. Build образа локально или в GitHub Actions.
2. Push готового образа в registry (GHCR/Docker Hub/private).
3. На VPS только `docker compose pull && docker compose up -d`.

`docker-compose.yml` и `docker-compose.dev.yml` в `deploy/` используют только `image:` и не содержат `build:`.

## FAQ

**Можно ли держать инфру отдельным репозиторием?** Да — переместите каталог `deploy/`
как есть в `<owner>/web-infra` (отдельный приватный репо). Никаких относительных путей
в compose нет, миграция — `git mv` + `git remote`.

**Что хранится в `secrets/<app>.env`?** Только переменные конкретного приложения
(SMTP, Telegram-токен и т.п.). У сайтов разные файлы — один контейнер не видит
переменных другого.

**Где сертификаты и почему `:ro` у `nginx`?** `letsencrypt/` пишет только `certbot`,
`nginx` лишь читает — это снижает риск повредить ключи при ручных вмешательствах.
