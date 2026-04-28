# Деплой через GitHub Actions (SCP + SSH)

Workflow: [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) (**Deploy premium-design to VPS**).

**Сейчас:** автозапуск **отключён** (`workflow_dispatch` только). На VPS деплой — **не** пакет исходников, а `docker compose pull` в **корне клона репозитория `lendings-vps-infra`** (см. [`DEPLOY_VERCEL_AND_VPS_RU.md`](./DEPLOY_VERCEL_AND_VPS_RU.md), образ — [`ghcr-premium-design.yml`](../../.github/workflows/ghcr-premium-design.yml)). Нужен секрет **`VPS_DEPLOY_PATH`** (абсолютный путь к корню **`lendings-vps-infra`** на сервере). Когда проверите цепочку — можно раскомментировать `push` в `deploy.yml`. **Vercel** этот workflow **не** трогает.

## Vercel и этот workflow — разные вещи

| Куда вы «кладёте» сайт | Как это устроено | Нужны ли `HOST` / `USERNAME` / `PORT` |
|------------------------|------------------|----------------------------------------|
| **[Vercel](https://vercel.com/docs/deployments/git)** (например `*.vercel.app`) | Сборка на стороне Vercel после пуша в GitHub или через их интеграцию. **SSH на адрес сайта нет.** | **Нет.** Достаточно подключить репозиторий в панели Vercel или использовать их GitHub Action / CLI. Секреты `HOST`, `USERNAME`, `PORT` для Vercel **не задают** деплой сайта. |
| **Свой VPS** (Linux + Docker у вас на машине) | Раннер GitHub по **SSH** копирует архив и выполняет `docker-compose` на **вашем IP/домене**. | **Да.** `HOST` — IP или DNS **сервера** (не `https://…`), `USERNAME` — Linux-пользователь для SSH, `PORT` — порт **SSH** (часто `22`). |

**Почему в логе «Нет TCP-доступа с runner до …»**

1. В `HOST` всё ещё указан **URL** (Vercel, другой сайт) — до такого «хоста» по **порту 22** никто не стучится как по SSH. Нужен **реальный сервер**, куда вы заходите командой `ssh user@IP`.
2. Или VPS есть, но **файрвол / security group** не пускает **входящий SSH с интернета** на порт 22. Раннеры GitHub идут из [меняющегося пула IP](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#ip-addresses-of-github-hosted-runners) — белый список «один IP GitHub» обычно невозможен; варианты: открыть 22 с осторожностью + `fail2ban`, **self-hosted runner** в вашей сети рядом с сервером, VPN/bastion.

Если продакшен **только на Vercel**, workflow **`deploy.yml`** вам не нужен для выкладки сайта — отключите триггер (`on:`) или удалите job, чтобы не было красных сборок; деплой будет через настройки Vercel.

Один раз на **своём VPS** убедитесь, что каталог **`/var/www/pd-app`** существует и у SSH-пользователя есть права на запись (или создайте его вручную под `root` и выдайте `chown`).

## Что делает workflow

1. **Preflight:** TCP до `HOST:PORT` SSH, проверка ключа, наличие **`VPS_DEPLOY_PATH`**.
2. По **SSH** на сервере: `cd "$VPS_DEPLOY_PATH"` → при необходимости `docker login ghcr.io` (секреты `GHCR_USER` + `GHCR_PULL_TOKEN` для private-образа) → **`docker compose pull premium-design`** → **`docker compose up -d premium-design nginx`**.

Сборка Docker-образа — отдельный workflow [**ghcr-premium-design.yml**](../../.github/workflows/ghcr-premium-design.yml), не в этом job.

## Пошагово: SSH-ключ с паролем (passphrase) для GitHub Actions

Ниже — как **проверить**, что ключ рабочий, и как **добавить** его в GitHub так, чтобы деплой из [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) мог по SSH зайти на сервер.

### Шаг 0. Что именно хранится в GitHub

| Секрет | Что это |
|--------|---------|
| `SSH_PRIVATE_KEY` | **Весь текст** файла приватного ключа (как `~/.ssh/id_ed25519` или `id_rsa`), **включая** первую и последнюю строку `-----BEGIN … KEY-----` / `-----END … KEY-----`. |
| `SSH_KEY_PASSPHRASE` | **Строка-пароль**, которую вы вводили при создании ключа (не путать с паролем пользователя Linux на сервере). |
| `HOST`, `USERNAME`, `PORT` | Куда и под кем заходить по SSH; `PORT` для SSH обычно **`22`**. |

GitHub **не показывает** сохранённые значения секретов — только имя. Исправить можно только **удалив секрет и создав заново**.

---

### Шаг 1. Сгенерировать ключ только для деплоя (рекомендуется)

На **своём ПК** (PowerShell, Git Bash или WSL):

```bash
ssh-keygen -t ed25519 -f ./github_deploy_pd -C "github-actions-premier-design"
```

- На вопрос **passphrase** введите **осмысленный пароль** (его же потом положите в `SSH_KEY_PASSPHRASE`) **или** дважды Enter для ключа **без** пароля.
- Появятся файлы:
  - **`github_deploy_pd`** — приватный (пойдёт в `SSH_PRIVATE_KEY`);
  - **`github_deploy_pd.pub`** — публичный (пойдёт на сервер).

Проверка, что приватный ключ с паролем **читается** (подставьте свой пароль вместо `ВАШ_ПАРОЛЬ`):

```bash
ssh-keygen -yf ./github_deploy_pd -P "ВАШ_ПАРОЛЬ"
```

Должна вывестись **одна строка** с `ssh-ed25519 …` (публичный вид). Если пишет `incorrect passphrase` — пароль неверный; если ключ без пароля — используйте `-P ""`.

---

### Шаг 2. Публичный ключ на сервере

На сервере под пользователем деплоя (тот же, что в секрете `USERNAME`):

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo 'СОДЕРЖИМОЕ_ОДНОЙ_СТРОКИ_ИЗ_github_deploy_pd.pub' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Либо с ПК одной командой (если обычный `ssh` на сервер уже работает):

```bash
type .\github_deploy_pd.pub | ssh USER@HOST "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

Проверка входа **с паролем ключа** (Windows PowerShell, путь к ключу свой):

```bash
ssh -i .\github_deploy_pd -o IdentitiesOnly=yes USER@HOST "echo OK"
```

Должен запросить **passphrase к ключу**, затем вывести `OK`. Если таймаут — сеть/файрвол, не GitHub.

---

### Шаг 3. Добавить секреты в репозитории GitHub

1. Откройте репозиторий: `https://github.com/<владелец>/<имя-репо>`.
2. **Settings** → слева **Secrets and variables** → **Actions**.
3. Вкладка **Secrets** → **New repository secret**.

**Секрет `SSH_PRIVATE_KEY`**

1. Name: `SSH_PRIVATE_KEY` (ровно так, регистр важен).
2. Secret: откройте файл **`github_deploy_pd`** в редакторе, выделите **всё** от первой до последней строки включительно, вставьте в поле.
3. Важно:
   - должны быть **переносы строк** между строками файла;
   - **нет** лишних пробелов в начале/конце и **нет** кавычек вокруг всего ключа;
   - не вставляйте содержимое `.pub` — только приватный файл.

**Секрет `SSH_KEY_PASSPHRASE`** (если на шаге 1 задавали passphrase)

1. Name: `SSH_KEY_PASSPHRASE`.
2. Secret: **только** пароль от ключа, **одной строкой**, без кавычек. Спецсимволы допустимы; копируйте внимательно.

Если ключ **без** passphrase: секрет `SSH_KEY_PASSPHRASE` можно **не создавать** (в workflow пустая строка допустима для `ssh-keygen -P ""`). Если секрет уже создан с ошибкой — удалите и не создавайте заново.

**Остальные секреты**

- `HOST` — IP или домен сервера.
- `USERNAME` — имя пользователя SSH (например `deploy`).
- `PORT` — строка `22` (или ваш порт SSH), **лучше всегда явно**.

Сохраните каждый секрет кнопкой **Add secret**.

---

### Шаг 4. Проверка без пуша (опционально)

Локально убедитесь, что тот же ключ и пароль работают с сервером (см. команду `ssh -i` выше). Если локально не заходит — GitHub Actions тоже не зайдёт.

---

### Шаг 5. Проверка в GitHub Actions

1. Сначала при успешной сборке образа: workflow [**ghcr-premium-design**](../../.github/workflows/ghcr-premium-design.yml) (или `workflow_dispatch` вручную), затем **Deploy premium-design to VPS** (`deploy.yml`, тоже вручную, пока нет `push` в `on:`).
2. Вкладка **Actions** → **Deploy premium-design to VPS (SSH, docker compose pull)**.
3. Смотрите шаги: **Preflight (TCP, ключ, VPS_DEPLOY_PATH)** — затем **Удалённо — pull** (`docker compose pull / up` на сервере).

Если preflight **«ключ и passphrase»** падает — заново вставьте `SSH_PRIVATE_KEY` и `SSH_KEY_PASSPHRASE` (частая ошибка: лишний пробел, другой пароль, обрезанный ключ при копировании).

---

### Частые ошибки

| Симптом | Что проверить |
|---------|----------------|
| `passphrase protected` / preflight ключ | Задан ли **`SSH_KEY_PASSPHRASE`**, совпадает ли с тем, что при `ssh-keygen`. |
| `dial tcp … i/o timeout` после пароля | Файрвол, неверный `HOST`/`PORT`, закрыт SSH из интернета для [IP GitHub](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#ip-addresses-of-github-hosted-runners). |
| Ключ «ломается» в секрете | Вставляйте ключ **многострочным**; в Windows не используйте «умные» кавычки из Word. |
| Работает `ssh`, не работает Actions | Убедитесь, что секреты в **этом** репозитории (не в Organization без наследования) и имена **`SSH_PRIVATE_KEY`**, **`SSH_KEY_PASSPHRASE`** без опечаток. |

---

## Секреты GitHub (Settings → Secrets and variables → Actions)

| Секрет | Обязательно | Описание |
|--------|-------------|----------|
| `HOST` | да | IP или DNS сервера |
| `USERNAME` | да | SSH-пользователь (не root по возможности) |
| `SSH_PRIVATE_KEY` | да | Содержимое **приватного** ключа (PEM), целиком включая `BEGIN/END` |
| `SSH_KEY_PASSPHRASE` | если ключ с паролем | Фраза от ключа. Если ключа без пароля — создайте пустой секрет или оставьте пустым в UI (см. ниже) |
| `PORT` | рекомендуется | Порт SSH, чаще всего **`22`**. Пустое значение может ломать парсер — задайте явно |
| `VPS_DEPLOY_PATH` | **да** (для deploy.yml) | Абсолютный путь к **корню клона `lendings-vps-infra`** на сервере (`docker-compose.yml` и `nginx/` в корне) |
| `GHCR_USER` | нет* | Для private-пакета GHCR: логин GitHub |
| `GHCR_PULL_TOKEN` | нет* | PAT с `read:packages` (или `write:packages`); для **public**-образа оба пусты |

Раньше ошибка **`ssh: this private key is passphrase protected`** означала: в `SSH_PRIVATE_KEY` лежит ключ с passphrase, а в action **не передавался** параметр `passphrase`. Сейчас в workflow передаётся `passphrase: ${{ secrets.SSH_KEY_PASSPHRASE }}`.

**Варианты исправления:**

1. Добавить секрет **`SSH_KEY_PASSPHRASE`** с паролем от ключа (предпочтительно для существующего ключа).
2. Либо сгенерировать **отдельный деплой-ключ без passphrase** только для этого репозитория и положить его в `SSH_PRIVATE_KEY`, ограничив на сервере командами в `authorized_keys`.

## Ошибки `ssh.ParsePrivateKey: passphrase protected` и сразу после — `i/o timeout`

Чаще всего **в GitHub не задан или неверен** секрет **`SSH_KEY_PASSPHRASE`**, а ключ в `SSH_PRIVATE_KEY` **с паролем**. Тогда клиент несколько раз пытается установить SSH-сессию и в итоге получает таймаут.

Что сделать:

1. Добавьте секрет **`SSH_KEY_PASSPHRASE`** (точный пароль от этого приватного ключа) **или**
2. Создайте **отдельный** ключ **без** passphrase только для деплоя и положите приватную часть в **`SSH_PRIVATE_KEY`**, публичную — в `~/.ssh/authorized_keys` на сервере для пользователя из **`USERNAME`**.

В workflow **Preflight** проверяет TCP, ключ и **`VPS_DEPLOY_PATH`**, прежде чем выполнить SSH-шаг.

## Ошибка `dial tcp … i/o timeout`

Типичные причины:

1. **Файрвол / security group** не пускает **входящий SSH** с интернета на `HOST:PORT`. GitHub-hosted runners исходят из [широкого пула IP](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#ip-addresses-of-github-hosted-runners); белый список «только один IP» для них обычно **не работает**. Варианты:
   - открыть порт 22 (или ваш SSH-порт) для **всех** временно и усилить защиту `fail2ban`/лимитами;
   - или использовать **self-hosted runner** в той же сети, что и сервер;
   - или VPN / bastion / jump host (тогда в action нужны `proxy_*` — см. документацию `appleboy/scp-action`).
2. Неверный **`HOST`** или **`PORT`** (не тот порт SSH).
3. `docker compose pull` долго качает слои — при необходимости увеличьте `command_timeout` у шага `appleboy/ssh-action` в `deploy.yml`.

## Проверка вручную с машины разработчика

```bash
ssh -i /path/to/key -p 22 USER@HOST "echo ok"
```

Если отсюда таймаут — проблема сети/файрвола, а не GitHub Actions.

## Имя команды Docker

В [`deploy.yml`](../../.github/workflows/deploy.yml) используется **`docker compose`** (плагин v2). На сервере должен быть Docker Engine + Compose v2.

```bash
docker compose version
```

## Устаревшие пути к документам

- Чеклист perf/SEO: `docs/guides/PERF_AND_SEO_CHECKLIST_RU.md`
- Аудит: `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md`
