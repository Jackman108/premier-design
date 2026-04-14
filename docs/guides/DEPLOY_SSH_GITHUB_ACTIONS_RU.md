# Деплой через GitHub Actions (SCP + SSH)

Workflow: [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml).

Один раз на сервере убедитесь, что каталог **`/var/www/pd-app`** существует и у SSH-пользователя есть права на запись (или создайте его вручную под `root` и выдайте `chown`).

## Что делает workflow

1. Упаковывает репозиторий в **`deploy.tar.gz`**, исключая тяжёлые/генерируемые каталоги (`.git`, `node_modules`, `.next`, `coverage`, `storybook-static`), чтобы снизить риск **таймаута** при копировании.
2. Копирует архив на сервер через **`appleboy/scp-action@v1`**.
3. По **SSH** распаковывает архив в каталог приложения и выполняет **`docker-compose`** (или замените на `docker compose` под вашу ОС).

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
