# Плейбук разработки

Точка входа для **ежедневной** работы: где что лежит, какой минимальный порог качества ожидает репозиторий, как менять код без регрессий и без бесконтрольного роста сложности. Документ — **навигатор**: бизнес‑правила и нормы живут в коде и в специализированных файлах `docs/`, здесь только маршруты к ним.

> Не дублировать в этом файле то, что описано в `docs/mempalace/rules/`, ADR или гайдах. См. таблицу «один источник правды» в [`README.md`](README.md).

## 1. Карта источников

| Слой | Назначение | Где смотреть |
|------|------------|--------------|
| Обязательные правила агента (IDE) | Нормы из MemPalace + процесс/гейты | [`.cursor/rules/agent-mempalace-bootstrap.mdc`](../.cursor/rules/agent-mempalace-bootstrap.mdc), [`.cursor/rules/agent-quality-process.mdc`](../.cursor/rules/agent-quality-process.mdc) (корень репозитория) |
| Короткие нормы по темам (для людей и RAG) | Один файл — одна тема (01–12) | [`mempalace/rules/`](mempalace/rules/) |
| Архитектурные решения | «Почему так», версии, последствия | [`adr/README.md`](adr/README.md) |
| Операционные чеклисты | Деплой, риски, синхронизация гейтов, observability | [`audit/`](audit/) |
| Скрипты и CI | Полный справочник `yarn` команд и соответствие CI | [`guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](guides/SCRIPTS_AND_QUALITY_GATES_RU.md) |
| Структура и нейминг | Слои, модули, роль `lib/` и `shared/` | [`guides/CODE_STRUCTURE_AND_NAMING_RU.md`](guides/CODE_STRUCTURE_AND_NAMING_RU.md) |
| Выравнивание с Feb Code | Матрица C1–C4 и ссылки на гайды | [`audit/CROSS_REPO_ALIGNMENT_RU.md`](audit/CROSS_REPO_ALIGNMENT_RU.md) |
| Производительность / SEO | Чеклист и пороги бюджетов | [`guides/PERF_AND_SEO_CHECKLIST_RU.md`](guides/PERF_AND_SEO_CHECKLIST_RU.md) |

**Принцип DRY для документов:** бизнес‑правила и use‑case живут в **коде** (`features/*/useCases/`, `shared/lib/`, валидаторы); документы фиксируют **границы, процесс и необратимые решения** (ADR), а не пересказывают код.

## 2. Карта чистой архитектуры (применима к любой задаче)

```
       ┌──────────────────────────────────────────────────────────┐
       │ pages/ (Pages Router)         app/ (App Router, узко)    │  Композиция URL/SEO/SSG
       └──────────────────────────────────────────────────────────┘
                              │  импорт `@widgets/*`, `@features/*`
                              ▼
       ┌──────────────────────────────────────────────────────────┐
       │ widgets/   — композиция нескольких фич / layout          │
       └──────────────────────────────────────────────────────────┘
                              │  импорт `@features/<slice>` (баррель)
                              ▼
       ┌──────────────────────────────────────────────────────────┐
       │ features/<slice>/                                        │
       │   ui/ hooks/ useCases/ interface/ utils/ __tests__/      │
       └──────────────────────────────────────────────────────────┘
                              │  use-case → порты (функции‑зависимости)
                              ▼
       ┌──────────────────────────────────────────────────────────┐
       │ shared/  (utils, hooks, validates, ui/primitives, lib)   │
       │ lib/     (Next.js обвязка: SSG/finders/dynamic imports)  │
       │ services/ (адаптеры к внешнему миру: SMTP, Telegram, БД) │
       └──────────────────────────────────────────────────────────┘
```

Жёсткие правила:

- `shared/` **не** импортирует `@features/*` / `@services/*` (контролируется `yarn check:architecture`).
- Внутри `features/*` **нет cross‑feature** между разными слайсами — композиция нескольких фич только в `widgets/` или `pages/`.
- В `*/ui/*` — только разметка, события и композиция; бизнес‑логика, IO, типы, реализация хуков — рядом, в профильных каталогах слайса.

Подробности: [`mempalace/rules/01_*`](mempalace/rules/01_WEB_ARCHITECTURE_AND_BOUNDARIES_RU.md), [`08_*`](mempalace/rules/08_CLEAN_ARCHITECTURE_USE_CASES_AND_PORTS_RU.md), [`guides/CODE_STRUCTURE_AND_NAMING_RU.md`](guides/CODE_STRUCTURE_AND_NAMING_RU.md).

## 3. Поток разработки (минимально достаточный)

1. **Понять задачу и слой.** Где живёт изменение: UI / use‑case / адаптер / инфраструктура? Если непонятно — сверяйтесь с картой выше.
2. **Минимальный diff.** Не «прибирайте» несвязные файлы в том же PR (см. [`mempalace/rules/12_*`](mempalace/rules/12_REFACTORING_AND_TECHNICAL_DEBT_RU.md)).
3. **Быстрый фидбек:** `yarn check:static` (lint + typecheck + unit).
4. **Перед PR:** `yarn check:risk:local` (все project‑gates) или сразу `yarn check:precommit:full` (как в pre‑commit).
5. **E2E:** `yarn test:e2e` (smoke `@core`); расширенный — `yarn test:e2e:extended` или nightly workflow.
6. **Перфоманс и бюджеты:** `yarn check:perf:ci` локально по необходимости (на Windows Lighthouse может пропускаться, см. [`PERF_AND_SEO_CHECKLIST_RU`](guides/PERF_AND_SEO_CHECKLIST_RU.md)).
7. **Доки и changelog** — синхронизируем по таблице в [`agent-quality-process.mdc`](../.cursor/rules/agent-quality-process.mdc) и [`audit/QUALITY_GATES_SYNC_RU.md`](audit/QUALITY_GATES_SYNC_RU.md).

## 4. Чистый код и тесты

- **SOLID/DRY/KISS/YAGNI прагматично.** Без архитектуры «на вырост»: интерфейс — когда есть второй потребитель или тестовый дублёр; копипаст — кандидат на вынос только при доказанном третьем расхождении. См. [`mempalace/rules/09_*`](mempalace/rules/09_CLEAN_CODE_SOLID_DRY_KISS_YAGNI_RU.md).
- **Use‑case + порты + адаптеры.** Сценарий не знает про HTTP/JSON; внешние интеграции — за функциями‑портами. См. [`mempalace/rules/08_*`](mempalace/rules/08_CLEAN_ARCHITECTURE_USE_CASES_AND_PORTS_RU.md).
- **Пирамида тестов:** unit (быстрые) → интеграционные (фича + хук + мок порта) → e2e smoke (`@core`). Подробности и нюансы: [`mempalace/rules/07_*`](mempalace/rules/07_WEB_TESTING_AND_QUALITY_RU.md).
- **Типы и валидация:** публичные функции — явные сигнатуры; ввод границ (query/body/env) — Zod до использования. См. [`mempalace/rules/11_*`](mempalace/rules/11_TYPING_AND_VALIDATION_RU.md).
- **Ошибки и надёжность:** различать ожидаемые (валидация/404) и неожиданные (5xx); внешние вызовы — таймаут + ретраи только на транзиентах + circuit. См. [`mempalace/rules/10_*`](mempalace/rules/10_ERRORS_AND_RELIABILITY_RU.md), runbook [`audit/OPERATIONS_OBSERVABILITY_RU.md`](audit/OPERATIONS_OBSERVABILITY_RU.md).

## 5. Performance и UX (что обязательно при изменениях UI)

- **Web Vitals** в фокусе: LCP, CLS, INP — пороги через `yarn check:perf:ci`. Бюджет initial JS — `INITIAL_JS_BUDGET_KB`.
- `next/image`: явные `width/height` или `fill` + `priority` для LCP‑элемента. Удалённые источники — только через `images.remotePatterns`.
- Тяжёлые клиентские пакеты — `dynamic(..., { ssr: false })` (см. реестр `@lib/dynamicSectionImports`).
- a11y: видимый focus‑ring, клавиатура, уважение `prefers-reduced-motion`, контраст в **обеих темах**.
- UI / темизация / модалки — [`mempalace/rules/02_*`](mempalace/rules/02_WEB_UI_COMPONENTS_AND_TOKENS_RU.md), ADR `0001`/`0002`/`0003`.

## 6. Синхронизация при изменении процесса

При смене скриптов/workflow/порогов — чеклист [`audit/QUALITY_GATES_SYNC_RU.md`](audit/QUALITY_GATES_SYNC_RU.md). Справочник [`guides/SCRIPTS_AND_QUALITY_GATES_RU.md`](guides/SCRIPTS_AND_QUALITY_GATES_RU.md) обновлять **в той же задаче**, что и `package.json`.

## 7. Дополнительно

- Полный индекс: [`README.md`](README.md). Runbook кода: `premier-design/README.md`.
- Бэклог (если есть открытые строки): [`audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md); иначе — [`premier-design/CHANGELOG.md`](../premier-design/CHANGELOG.md).
