# Документация MemPalace и набор правил (Premier Design)

Всё в этой папке — **в git**: гайды по установке/эксплуатации MemPalace и свод `rules/*.md` для людей и для **индексации в локальном дворце** (каталог вне репозитория + `mine`).

## Гайды (начните здесь)

| Файл | Содержание |
|------|------------|
| [`MEMPALACE_AGENT_MEMORY_RU.md`](MEMPALACE_AGENT_MEMORY_RU.md) | Установка, `init`, `mine`, MCP в Cursor, безопасность, пошаговая настройка |
| [`MEMPALACE_USAGE_RU.md`](MEMPALACE_USAGE_RU.md) | Проверка после `mine`, `search` / `status` / `wake-up`, UTF-8 в Windows, цикл переиндексации, типовые сбои |

## Правила для RAG: веб и чистая архитектура

| Файл | Тема |
|------|------|
| [`rules/01_WEB_ARCHITECTURE_AND_BOUNDARIES_RU.md`](rules/01_WEB_ARCHITECTURE_AND_BOUNDARIES_RU.md) | Слои Next.js/React, границы зависимостей |
| [`rules/02_WEB_UI_COMPONENTS_AND_TOKENS_RU.md`](rules/02_WEB_UI_COMPONENTS_AND_TOKENS_RU.md) | Токены, примитивы, стили |
| [`rules/03_WEB_A11Y_AND_UX_RU.md`](rules/03_WEB_A11Y_AND_UX_RU.md) | Доступность, UX |
| [`rules/04_WEB_PERFORMANCE_RU.md`](rules/04_WEB_PERFORMANCE_RU.md) | LCP, бандл, CLS, INP |
| [`rules/05_WEB_SECURITY_AND_DATA_RU.md`](rules/05_WEB_SECURITY_AND_DATA_RU.md) | Секреты, валидация, заголовки |
| [`rules/06_WEB_NEXTJS_DATA_AND_FORMS_RU.md`](rules/06_WEB_NEXTJS_DATA_AND_FORMS_RU.md) | Данные, формы, API |
| [`rules/07_WEB_TESTING_AND_QUALITY_RU.md`](rules/07_WEB_TESTING_AND_QUALITY_RU.md) | Пирамида тестов, CI |
| [`rules/08_CLEAN_ARCHITECTURE_USE_CASES_AND_PORTS_RU.md`](rules/08_CLEAN_ARCHITECTURE_USE_CASES_AND_PORTS_RU.md) | Use-case, порты, адаптеры, DIP |
| [`rules/09_CLEAN_CODE_SOLID_DRY_KISS_YAGNI_RU.md`](rules/09_CLEAN_CODE_SOLID_DRY_KISS_YAGNI_RU.md) | SOLID, DRY, KISS, YAGNI |
| [`rules/10_ERRORS_AND_RELIABILITY_RU.md`](rules/10_ERRORS_AND_RELIABILITY_RU.md) | Ожидаемые/неожиданные ошибки, таймауты |
| [`rules/11_TYPING_AND_VALIDATION_RU.md`](rules/11_TYPING_AND_VALIDATION_RU.md) | TypeScript, Zod, границы |
| [`rules/12_REFACTORING_AND_TECHNICAL_DEBT_RU.md`](rules/12_REFACTORING_AND_TECHNICAL_DEBT_RU.md) | Рефакторинг, долг, PR |

Документы согласованы с ADR (`docs/adr/`), гайдами (`docs/guides/`) и `.cursor/rules/`, но сформулированы как **короткие нормы** для семантического поиска.

## Синхронизация с локальным дворцом MemPalace

1. Каталог `$mp` **вне git** — один раз `init` (см. [`MEMPALACE_AGENT_MEMORY_RU.md`](MEMPALACE_AGENT_MEMORY_RU.md)).
2. Скопировать в `$mp`: все `rules/*.md` и при желании **`MEMPALACE_*_RU.md`** из этой папки, плюс выборочно файлы из `docs/guides/` (без секретов).
3. `python -m mempalace mine $mp` (сначала `--dry-run` по желанию).
4. Проверка: [`MEMPALACE_USAGE_RU.md`](MEMPALACE_USAGE_RU.md).

**Cursor MCP:** шаблон [`../cursor/mcp.mempalace.example.json`](../cursor/mcp.mempalace.example.json).

## Не класть в дворец

- Секреты, `.env`, ключи, персональные данные клиентов.
- `node_modules`, сборочные артефакты, большие бинарники без необходимости.
