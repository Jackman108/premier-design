# Документация MemPalace и набор правил (Premier Design)

Всё в этой папке — **в git**: гайды по установке/эксплуатации MemPalace и свод `rules/*.md` — **канонические нормы** для агента и команды. Их подтягивает правило Cursor [`.cursor/rules/agent-mempalace-bootstrap.mdc`](../../.cursor/rules/agent-mempalace-bootstrap.mdc) (обязательный Read + опционально MCP). Тот же набор копируется в локальный дворец (вне репозитория) и индексируется командой `mine`.

## Гайды (начните здесь)

Процесс разработки и перечень `yarn`‑команд: [`../development-playbook-ru.md`](../development-playbook-ru.md), [`../guides/scripts-and-quality-gates-ru.md`](../guides/scripts-and-quality-gates-ru.md). Гейты и синхронизация доков — [`.cursor/rules/agent-quality-process.mdc`](../../.cursor/rules/agent-quality-process.mdc).

| Файл | Содержание |
|------|------------|
| [`mempalace-agent-memory-ru.md`](mempalace-agent-memory-ru.md) | Установка, `init`, `mine`, MCP в Cursor, безопасность, пошаговая настройка |
| [`mempalace-usage-ru.md`](mempalace-usage-ru.md) | Проверка после `mine`, `search` / `status` / `wake-up`, UTF-8 в Windows, цикл переиндексации, типовые сбои |

## Правила для RAG: веб и чистая архитектура

| Файл | Тема |
|------|------|
| [`rules/01-web-architecture-and-boundaries-ru.md`](rules/01-web-architecture-and-boundaries-ru.md) | Слои Next.js/React, границы зависимостей |
| [`rules/02-web-ui-components-and-tokens-ru.md`](rules/02-web-ui-components-and-tokens-ru.md) | Токены, примитивы, стили |
| [`rules/03-web-a11y-and-ux-ru.md`](rules/03-web-a11y-and-ux-ru.md) | Доступность, UX |
| [`rules/04-web-performance-ru.md`](rules/04-web-performance-ru.md) | LCP, бандл, CLS, INP |
| [`rules/05-web-security-and-data-ru.md`](rules/05-web-security-and-data-ru.md) | Секреты, валидация, заголовки |
| [`rules/06-web-nextjs-data-and-forms-ru.md`](rules/06-web-nextjs-data-and-forms-ru.md) | Данные, формы, API |
| [`rules/07-web-testing-and-quality-ru.md`](rules/07-web-testing-and-quality-ru.md) | Пирамида тестов, CI |
| [`rules/08-clean-architecture-use-cases-and-ports-ru.md`](rules/08-clean-architecture-use-cases-and-ports-ru.md) | Use-case, порты, адаптеры, DIP |
| [`rules/09-clean-code-solid-dry-kiss-yagni-ru.md`](rules/09-clean-code-solid-dry-kiss-yagni-ru.md) | SOLID, DRY, KISS, YAGNI |
| [`rules/10-errors-and-reliability-ru.md`](rules/10-errors-and-reliability-ru.md) | Ожидаемые/неожиданные ошибки, таймауты |
| [`rules/11-typing-and-validation-ru.md`](rules/11-typing-and-validation-ru.md) | TypeScript, Zod, границы |
| [`rules/12-refactoring-and-technical-debt-ru.md`](rules/12-refactoring-and-technical-debt-ru.md) | Рефакторинг, долг, PR |

Документы согласованы с ADR (`docs/adr/`) и гайдами (`docs/guides/`). Полные формулировки норм — **только** в `rules/*.md`; в `.cursor/rules/` остаются короткие указатели (`agent-mempalace-bootstrap.mdc`, `agent-quality-process.mdc`).

## Синхронизация с локальным дворцом MemPalace

1. Каталог `$mp` **вне git** — один раз `init` (см. [`mempalace-agent-memory-ru.md`](mempalace-agent-memory-ru.md)).
2. Скопировать в `$mp`: все `rules/*.md` и при желании гайды **`mempalace-*-ru.md`** из этой папки, плюс выборочно файлы из `docs/guides/` (без секретов).
3. `python -m mempalace mine $mp` (сначала `--dry-run` по желанию).
4. Проверка: [`mempalace-usage-ru.md`](mempalace-usage-ru.md).

**Cursor MCP:** шаблон [`../cursor/mcp.mempalace.example.json`](../cursor/mcp.mempalace.example.json).

## Не класть в дворец

- Секреты, `.env`, ключи, персональные данные клиентов.
- `node_modules`, сборочные артефакты, большие бинарники без необходимости.
