# Общий rule pack (три репозитория)

**Обновлено**: 29.04.2026

Одинаковый смысл в репозиториях **premier-design**, **febcode**, **lendings-vps-infra**. Длинные процессы здесь не дублируются: канон Premier — [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md); Feb Code — [`cross-repo-alignment-plan.md`](../../../febcode/docs/guides/cross-repo-alignment-plan.md) (отдельный git); infra — [`README.md`](../../../lendings-vps-infra/README.md) и [`multisite-vps-deploy-ru.md`](../../../lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md).

При правках этого файла синхронизируйте текстовое содержание с копиями в **febcode** и **lendings-vps-infra** (`docs/guides/cross-repo-rule-pack-ru.md`), чтобы клон одного репозитория оставался самодостаточным.

## Единая логика качества

Три репозитория делят **терминологию уровней проверок** и дисциплину документации; **исходный код, роутеры, UI-стеки и бизнес-контексты не смешиваются**. Конкретные команды и состав CI — только в канонических источниках каждого проекта (таблица ниже).

## Целевая лестница гейтов

Одинаковая **семантика уровней** для приложений (premier-design, febcode); для **lendings-vps-infra** см. примечания в таблице канона.

| Уровень | Назначение | Содержание (цель) |
|---------|------------|-------------------|
| **A — Pre-commit** | Быстрая обратная связь перед коммитом | Форматирование там, где принято; **ESLint**; **быстрые boundary-checks** (архитектура / запреты импорта на затронутых файлах по политике репозитория), без полной замены PR CI |
| **B — Local quality** | Полная локальная проверка перед push или релизом | **Lint** (включая архитектурные скрипты по канону репо), **typecheck**, **unit / smoke**, **production build** |
| **C — PR CI** | Обязательный контур merge | Полный **quality gate** репозитория, **e2e core** (критический контур воронки / смоук), **audit зависимостей** |
| **D — Nightly / deploy** | Регулярно или по выкладке | **Perf-бюджеты**, при наличии — **SLO**/обратная связь API; **расширенный e2e**; **smoke после деплоя** |

**Premier Design (факт):** в [`.husky/pre-commit`](../../.husky/pre-commit) после `lint-staged` выполняется широкий локальный прогон (`yarn check:precommit:full`) — это сознательно подтягивает к верхним уровням уже на коммите; целевое разделение уровней A/B сохраняется в семантике таблицы и в [`guides/scripts-and-quality-gates-ru.md`](scripts-and-quality-gates-ru.md).

## Границы унификации

- **Не смешивать кодовые базы:** разные роутеры, UI-стеки и бизнес-контексты остаются локальными в каждом приложении.
- **Унифицировать между репозиториями:** имена документов (`kebab-case`, суффикс `-ru.md`), дисциплину **changelog**, **уровни проверок** (таблица выше), **deploy vocabulary** (GHCR, pull-only, VPS_DEPLOY_PATH).
- **Общие правила** держать короткими в этом файле; **проектные детали** — в локальных `guides/`, `.cursor/rules/`, `mempalace/rules/` (Premier).

## Именование документов

- Файлы в `docs/` — **kebab-case**; русскоязычные материалы — суффикс `-ru.md`; исключение по традиции: `README.md`, `changelog.md`.

## Changelog

- Формат [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/); черновик релиза — секция **`[Unreleased]`** в [`changelog.md`](../changelog.md) этого репозитория.
- Смена CI, скриптов, Docker, публичных env — запись **в той же задаче**, что и изменение кода или конфигов; синхронизация гейтов — [`audit/quality-gates-sync-ru.md`](../audit/quality-gates-sync-ru.md).

## Секреты

- Рабочие значения и заполненные `.env` **не коммитить**.
- Источник шаблонов — только `*.env.example`, для infra — `secrets/*.env.example`; на сервере и локально копировать из примера и заполнять вне git.

## Словарь деплоя (GHCR / VPS)

| Термин | Значение |
|--------|----------|
| **GHCR** | GitHub Container Registry; образы приложений собираются CI репозитория приложения и публикуются туда. |
| **Тег образа** | Например `:latest` и тег по SHA коммита; на VPS в `.env` infra задаются `PREMIUM_DESIGN_IMAGE`, `FEBCODE_IMAGE` и т.д. |
| **lendings-vps-infra** | Канон Docker Compose + nginx на VPS; на сервере без сборки исходников Next.js — только `pull` готовых образов. |
| **VPS_DEPLOY_PATH** | Абсолютный путь к корню клона infra на сервере (секрет workflow деплоя). |
| **Контур обновления** | см. раздел «Контракт деплоя» в [`deploy-vercel-and-vps-ru.md`](deploy-vercel-and-vps-ru.md); откат — [`multisite-vps-deploy-ru.md`](../../../lendings-vps-infra/docs/operations/multisite-vps-deploy-ru.md). |

## Канонические источники (этот репозиторий — Premier Design)

| Уровень лестницы | Где зафиксировано |
|------------------|-------------------|
| A — Pre-commit | [`.husky/pre-commit`](../../.husky/pre-commit), [`lint-staged`](../../premier-design/package.json) в [`premier-design/package.json`](../../premier-design/package.json) |
| B — Local | [`guides/scripts-and-quality-gates-ru.md`](scripts-and-quality-gates-ru.md): `check:static`, `check:risk:local`, `check:precommit:full` и др. |
| C — PR CI | [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) |
| D — Nightly / deploy | perf/SLO в основном CI; [`ci-trends.yml`](../../.github/workflows/ci-trends.yml); [`e2e-extended.yml`](../../.github/workflows/e2e-extended.yml); деплой и smoke — [`guides/deploy-vercel-and-vps-ru.md`](deploy-vercel-and-vps-ru.md), infra |
| Нормы кода | [`docs/mempalace/rules/`](../mempalace/rules/) |

## Связанные документы

- Этот репозиторий: [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md), [`deploy/README.md`](../../deploy/README.md).
