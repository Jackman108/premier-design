# Общий rule pack (три репозитория)

**Обновлено**: 30.04.2026

Общая терминология для **premier-design**, **febcode**, **lendings-vps-infra**. Длинные сценарии не копируем — у каждого репо свой `README` и операционные гайды.

**Синхронизация:** блоки **§1–§5** должны совпадать дословно в копиях **premier-design** и **febcode** (`docs/guides/cross-repo-rule-pack-ru.md`). В **lendings-vps-infra** тот же §2–§5; §1 — ссылка на эту таблицу (ниже). **§6** в каждом репозитории свой.

## §1. Команды приложений (premier-design, febcode)

Имена **одинаковые**. Состав цепочек — поле `scripts` в корневом `package.json` (**premier-design** и **febcode** — зависимости и скрипты в корне репо; исходники приложения premier — в **`src/`**).

| Команда                      | Назначение                                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`yarn check:static`**      | Быстрый минимум (format + lint + types + тесты; в **febcode** в цепочке есть `test:smoke`)                                                                         |
| **`yarn ci:quality`**        | Уровень **B**: полный контур перед PR; в **premier-design** включает **`check:risk:local`**, в **febcode** — до **`check:perf:initial-js`** без premier-only gates |
| **`yarn test:e2e:install`**  | Установка Chromium для Playwright                                                                                                                                  |
| **`yarn test:e2e:extended`** | Playwright: **`--grep @extended`** (axe / visual / расширенный smoke — см. e2e в репозитории)                                                                      |
| **`yarn analyze`**           | Bundle analyzer: в `package.json` — **`build:analyze`**, вход — **`yarn analyze`** (оба приложения)                                                                |

Детали шагов: [premier-design — скрипты и гейты](https://github.com/Jackman108/premier-design/blob/master/docs/guides/scripts-and-quality-gates-ru.md) · [febcode — README](https://github.com/Jackman108/febcode/blob/master/README.md) · [febcode — стандарты тестирования](https://github.com/Jackman108/febcode/blob/master/docs/guides/testing-standards-ru.md).

## §2. Лестница гейтов (семантика)

| Уровень                  | Назначение                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **A — Pre-commit**       | Быстрый фидбек: **`lint-staged`**, затем **`yarn typecheck`**; не заменяет PR CI               |
| **B — Local**            | **`yarn check:static`** (коротко) · **`yarn ci:quality`** (полный локальный контур приложения) |
| **C — PR CI**            | Обязательный merge-контур репозитория приложения                                               |
| **D — Nightly / deploy** | Perf-бюджеты, расширенный e2e, SLO/аналитика, smoke после выкладки                             |

## §3. Границы унификации

Кодовые базы **не смешивать**. Между репозиториями выравниваем: **имена документов** (`kebab-case`, суффикс `-ru.md`), **changelog**, **§2**, термины **GHCR** / **pull-only** / **`VPS_DEPLOY_PATH`**.

## §4. Документы и changelog

Файлы в `docs/` — **kebab-case**; русскоязычные — **`-ru.md`**; исключения: `README.md`, `changelog.md`. Формат changelog — [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/), черновик — **`[Unreleased]`**.

## §5. Секреты

Рабочие `.env` и заполненные секреты **не коммитить**. В git — только шаблоны (`*.env.example`, в infra — `secrets/*.env.example`).

## §6. Канон этого репозитория (premier-design)

| Уровень              | Где                                                                                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A                    | [`.husky/pre-commit`](../../.husky/pre-commit): `lint-staged` + **`yarn typecheck`**; [`.husky/commit-msg`](../../.husky/commit-msg): **`yarn commitlint`** (BP-11; паритет febcode §5.4)       |
| B                    | **`yarn ci:quality`**, **`yarn check:static`**, **`yarn check:risk:local`** — [`scripts-and-quality-gates-ru.md`](scripts-and-quality-gates-ru.md)                                              |
| C                    | [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)                                                                                                                                    |
| D                    | [`ci-trends.yml`](../../.github/workflows/ci-trends.yml), [`e2e-extended.yml`](../../.github/workflows/e2e-extended.yml); деплой — [`deploy-vercel-and-vps-ru.md`](deploy-vercel-and-vps-ru.md) |
| Кросс-репо alignment | [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md)                                                                                                                       |

**BP-39:** [`.vscode/extensions.json`](../../.vscode/extensions.json), [`.vscode/settings.json`](../../.vscode/settings.json) (в git только эти файлы; остальное в `.vscode/*` — в [`.gitignore`](../../.gitignore)).

**REF-PREM-01 / декомпозиция view:** [`scripts/decomposition-allowlist.json`](../../scripts/decomposition-allowlist.json), **`yarn report:decomposition-threshold`** (в **`yarn check:risk:local`** — **`--fail-on-violations`**); порог **`DECOMPOSITION_MAX_LINES`** или поле **`threshold`** в JSON.

**Feb Code (FB-R-06):** доменный текст лендинга живёт в **`entities/<slice>/content`** и собирается в **`entities/site-data`**; публичный фасад приложения — **`@shared/site-content`** (репозиторий **febcode**).

**Сводный аудит портфеля (BP):** [`cross-repo-portfolio-audit-2026-04-ru.md`](https://github.com/Jackman108/lendings-vps-infra/blob/master/docs/audit/cross-repo-portfolio-audit-2026-04-ru.md) — **§6.2.1** (остаток), **§6.2.2** (полный реестр). Ориентиры в **lendings-vps-infra:** [**BP-12**](https://github.com/Jackman108/lendings-vps-infra/blob/master/docs/guides/release-automation-github-ru.md), [**BP-04**](https://github.com/Jackman108/lendings-vps-infra/blob/master/docs/guides/observability-next-steps-ru.md).

### Словарь деплоя (кратко)

| Термин                | Смысл                                                                                                                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GHCR**              | Образы Next-приложений; workflow сборки — в репозитории приложения (**Trivy** + **SBOM**). Полная матрица сервисов — [`lendings-vps-infra` README](https://github.com/Jackman108/lendings-vps-infra/blob/master/README.md). |
| **pull-only**         | На прод-VPS не собирать приложения через `docker compose build` — только `pull` готовых образов.                                                                                                                            |
| **`VPS_DEPLOY_PATH`** | Абсолютный путь к корню клона **lendings-vps-infra** на сервере (секрет CI).                                                                                                                                                |

## Связанные документы

[`deploy-vercel-and-vps-ru.md`](deploy-vercel-and-vps-ru.md), [`audit/quality-gates-sync-ru.md`](../audit/quality-gates-sync-ru.md).
