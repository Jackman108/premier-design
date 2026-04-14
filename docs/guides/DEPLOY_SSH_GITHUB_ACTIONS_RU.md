# Деплой через GitHub Actions (SCP + SSH)

Workflow: [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml).

Один раз на сервере убедитесь, что каталог **`/var/www/pd-app`** существует и у SSH-пользователя есть права на запись (или создайте его вручную под `root` и выдайте `chown`).

## Что делает workflow

1. Упаковывает репозиторий в **`/tmp/deploy.tar.gz`** (не в корень репозитория — иначе `tar` при упаковке `.` захватывает растущий архив и падает с `file changed as we read it`), с исключениями `.git`, `node_modules`, `.next`, `coverage`, `storybook-static`.
2. Копирует архив на сервер через **`appleboy/scp-action@v1.0.0`**.
3. По **SSH** распаковывает архив в каталог приложения и выполняет **`docker-compose`** (или замените на `docker compose` под вашу ОС).

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

1. Закоммитьте любое изменение и запушьте в ветку **`master`** (так настроен `on:` в `deploy.yml`), либо запустите workflow вручную, если добавите `workflow_dispatch`.
2. Вкладка **Actions** → откройте последний запуск **Deploy to Local Server**.
3. Смотрите шаги:
   - **Preflight — TCP до SSH-порта** — есть ли сеть до `HOST:PORT` с runner GitHub.
   - **Preflight — ключ и passphrase** — расшифровывается ли ключ (совпадает ли `SSH_KEY_PASSPHRASE` с ключом в `SSH_PRIVATE_KEY`).
   - **Copy bundle to server** — уже `appleboy/scp-action`.

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

Раньше ошибка **`ssh: this private key is passphrase protected`** означала: в `SSH_PRIVATE_KEY` лежит ключ с passphrase, а в action **не передавался** параметр `passphrase`. Сейчас в workflow передаётся `passphrase: ${{ secrets.SSH_KEY_PASSPHRASE }}`.

**Варианты исправления:**

1. Добавить секрет **`SSH_KEY_PASSPHRASE`** с паролем от ключа (предпочтительно для существующего ключа).
2. Либо сгенерировать **отдельный деплой-ключ без passphrase** только для этого репозитория и положить его в `SSH_PRIVATE_KEY`, ограничив на сервере командами в `authorized_keys`.

## Ошибки `ssh.ParsePrivateKey: passphrase protected` и сразу после — `i/o timeout`

Чаще всего **в GitHub не задан или неверен** секрет **`SSH_KEY_PASSPHRASE`**, а ключ в `SSH_PRIVATE_KEY` **с паролем**. Тогда клиент несколько раз пытается установить SSH-сессию и в итоге получает таймаут.

Что сделать:

1. Добавьте секрет **`SSH_KEY_PASSPHRASE`** (точный пароль от этого приватного ключа) **или**
2. Создайте **отдельный** ключ **без** passphrase только для деплоя и положите приватную часть в **`SSH_PRIVATE_KEY`**, публичную — в `~/.ssh/authorized_keys` на сервере для пользователя из **`USERNAME`**.

В workflow добавлены шаги **Preflight**: сначала проверка TCP до `HOST:PORT`, затем проверка, что ключ реально расшифровывается (как у `ssh-keygen`). Если preflight падает — сообщение в логе подскажет причину раньше, чем `appleboy/scp-action`.

## Ошибка `dial tcp … i/o timeout`

Типичные причины:

1. **Файрвол / security group** не пускает **входящий SSH** с интернета на `HOST:PORT`. GitHub-hosted runners исходят из [широкого пула IP](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#ip-addresses-of-github-hosted-runners); белый список «только один IP» для них обычно **не работает**. Варианты:
   - открыть порт 22 (или ваш SSH-порт) для **всех** временно и усилить защиту `fail2ban`/лимитами;
   - или использовать **self-hosted runner** в той же сети, что и сервер;
   - или VPN / bastion / jump host (тогда в action нужны `proxy_*` — см. документацию `appleboy/scp-action`).
2. Неверный **`HOST`** или **`PORT`** (не тот порт SSH).
3. Слишком долгая передача — уменьшен архив за счёт `tar --exclude`; при необходимости увеличьте в workflow `command_timeout` у шагов SCP/SSH.

## Проверка вручную с машины разработчика

```bash
ssh -i /path/to/key -p 22 USER@HOST "echo ok"
```

Если отсюда таймаут — проблема сети/файрвола, а не GitHub Actions.

## Имя команды Docker

На сервере в скрипте используется **`docker-compose`**. Если установлен только Docker Compose V2, замените в workflow на:

```bash
docker compose down
docker compose up -d --build
```

## Устаревшие пути к документам

- Чеклист perf/SEO: `docs/guides/PERF_AND_SEO_CHECKLIST_RU.md`
- Аудит: `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md`
