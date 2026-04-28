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
| `nginx/conf.d/dev/*.conf` | Dev: HTTP, `server_name` под `hosts`, `00-localhost.dev.conf` — лендинг `localhost:8080` со ссылками на оба сайта. |
| `nginx/dev-static/localhost.html` | HTML для дефолтного vhost (`localhost`), монтируется в контейнер nginx (dev compose). |
| `secrets/*.env.example` | Шаблоны env для контейнеров; рабочие `secrets/*.env` в git не входят. |

## Поток деплоя (TL;DR)

1. Каждый репозиторий собирает Docker-образ и пушит в GHCR
   (Premier Design: [`.github/workflows/ghcr-premium-design.yml`](../.github/workflows/ghcr-premium-design.yml) + `premier-design/Dockerfile.prod`, у FEB Code — аналог в своём репо).
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

## FEB Code — отдельный репо и две схемы запуска

Лендинг живёт **в другом** git-репозитории (например `…/feb-code/febcode`). Важно не путать **изолированный** запуск из корня febcode и **мультисайт** из **этого** `deploy/`.

| Вопрос | Только FEB (в клоне `febcode/`) | Два сайта (каталог `deploy/` здесь) |
|--------|--------------------------------|----------------------------------------|
| Compose | Свой `compose` / `docker compose up` в **febcode** | `deploy/docker-compose.yml` или `docker-compose.dev.yml` |
| Сервис в compose | Обычно `landing` (см. их `compose`) | `febcode` (имя сервиса; образ тот же лендинг) |
| Сборка | `build: .` у них локально | **Нет** `build:` — только `image: ${FEBCODE_IMAGE}` (предсобранный тег) |
| Порт с хоста | Напр. `3001:3000` → `http://localhost:3001` | `3000` **только внутри** сети compose; снаружи — nginx `80/443` или `8080` (dev) |
| Образ | Собирается в febcode (`Dockerfile` / multi-stage, у них в репо — Node 24, `standalone`, `node server.js`) | Тот же артефакт, но тег: `ghcr.io/<owner>/febcode:…` из **их** CI + push в GHCR |
| Секреты | Их `.env` / compose `environment` | `deploy/secrets/febcode.env` — по смыслу как прод: `TELEGRAM_*`, `NEXT_PUBLIC_SITE_URL`, reCAPTCHA, rate limit — см. чеклист деплоя **в репо febcode** (`docs/…`) |

Пока образ febcode не публикуете в registry, для мульти-сайта локально: `docker build` в каталоге febcode, затем `FEBCODE_IMAGE=local/febcode:dev` в `deploy/.env` (как в разделе ниже).

## Локальная проверка конфигурации

Чтобы проверить синтаксис `nginx.conf` без VPS (prod-виртуальные хосты в корне `conf.d/`):

```bash
docker run --rm \
  -v "$PWD/nginx/nginx.conf:/etc/nginx/nginx.conf:ro" \
  -v "$PWD/nginx/conf.d:/etc/nginx/conf.d:ro" \
  nginx:1.27-alpine nginx -t
```

Для топологии **`docker-compose.dev.yml`** подставьте только каталог dev: `-v "$PWD/nginx/conf.d/dev:/etc/nginx/conf.d:ro"` (upstream `premium-design`/`febcode` в изолированном `nginx -t` не резолвятся — это ожидаемо; проверка на VPS/в compose информативнее).

## Локально: оба сайта в Docker (dev, HTTP, порт 8080)

Сборка **двух разных репозиториев** в одном `compose`: `premium-design` — из **этого** репо (`premier-design/`), `febcode` — из **своего** репозитория **или** готовый образ с GHCR. В `docker-compose*.yml` **нет** `build:` — сначала соберите теги сами, затем укажите их в `deploy/.env`.

1. **Образ premier-design** (из корня git-репозитория, где лежат `premier-design/` и `deploy/`):

   ```bash
   docker build -f premier-design/Dockerfile.prod -t local/premium-design:dev ./premier-design
   ```

2. **Образ febcode** — один из вариантов:
   - `docker pull ghcr.io/<owner>/febcode:latest` и в `.env` тот же тег, **или**
   - в клоне FEB Code (корень репо, где `package.json` и Docker-файл):  
     `docker build -f Dockerfile -t local/febcode:dev .`  
     (имя файла смотрите в febcode: у вас в репо может быть `Dockerfile` в корне, не `Dockerfile.prod`.)

3. **Конфиг** `deploy/.env` (скопируйте из `.env.example` и подставьте теги):

   ```env
   PREMIUM_DESIGN_IMAGE=local/premium-design:dev
   FEBCODE_IMAGE=local/febcode:dev
   ```

4. **Секреты приложений** — из шаблонов:  
   `cp secrets/premium-design.env.example secrets/premium-design.env` и аналогично для `febcode` (в Windows: `copy`).  
   Минимальные рабочие файлы уже могут существовать локально; они **в `.gitignore`** и не коммитятся. Подправьте `NEXT_PUBLIC_SITE_URL` и Telegram при тесте форм — см. `premier-design/.env.example` и чеклист febcode.

5. **Запуск** (из каталога `deploy/`, Docker Compose v2):

   ```bash
   cd deploy
   docker compose -f docker-compose.dev.yml --env-file .env up -d
   ```

   Nginx слушает **8080** → `http://<host>:8080`. В `nginx/conf.d/dev` заданы `server_name` **premium-design.pro** и **febcode.pro**. Без записи в **`hosts` браузер уйдёт в интернет-DNS**, а не на Docker — страницы «не открываются». Обязательно (Windows: от имени администратора блокнот → `C:\Windows\System32\drivers\etc\hosts`):

   ```text
   127.0.0.1 premium-design.pro febcode.pro
   ```

   В браузере: `http://premium-design.pro:8080` и `http://febcode.pro:8080`.

   **`http://localhost:8080`** не привязан к prod-именам: открывается маленькая страница со **ссылками-кнопками** на оба сайта (`nginx/dev-static/localhost.html`, `00-localhost.dev.conf`). Для самих сайтов после правки `hosts` используйте имена ниже.

   **Если `hosts` сохранён, но браузер всё равно не открывает сайт:**

   1. **Проверка без браузера** (в PowerShell или `cmd`):

      ```text
      ping premium-design.pro
      ```

      В ответе должно быть **`127.0.0.1`**. Если показывается другой адрес или «не удаётся найти узел» — запись в `hosts` не подхватилась (опечатка в имени, файл сохранён не туда, не перезаписан старый кеш).

   2. **Сброс кеша DNS Windows** (от администратора): `ipconfig /flushdns`, затем снова `ping premium-design.pro`.

   3. **Chrome: Secure DNS** часто **обходит файл `hosts`** и резолвит домен через интернет (открывается «чужой» сайт или ошибка). Отключите на время проверки: *Настройки → Конфиденциальность и безопасность → Безопасность → Использовать безопасный DNS* → **выкл.** (или проверьте в Firefox / Edge — они чаще следуют `hosts`).

   4. При необходимости добавьте строку для IPv6 (если после п.1–3 всё ещё уходит не на localhost):

      ```text
      ::1 premium-design.pro febcode.pro
      ```

   5. Убедитесь, что стек запущен: `docker compose -f docker-compose.dev.yml ps` — контейнеры `nginx-dev`, `premium-design-dev`, `febcode-dev` в состоянии **Up**.

   6. **Статика идёт на `https://…:8080`, `ERR_SSL_PROTOCOL_ERROR`:** в актуальном коде CSP **без** `upgrade-insecure-requests`; пересоберите образ **`premium-design`** и перезапустите контейнер. Если симптом остался: в Chrome откройте `chrome://net-internals/#hsts` → **Delete** домен `premium-design.pro` (мог закешироваться строгий HTTPS с продакшена).

7. **Остановка:** `docker compose -f docker-compose.dev.yml down` (из `deploy/`).
