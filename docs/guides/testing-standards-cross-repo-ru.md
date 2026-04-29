# Тесты: выравнивание с Feb Code (кросс-репо)

**Обновлено**: 29.04.2026

Канонические нормы Feb Code не дублируются: см. репозиторий **Feb Code** — `docs/guides/testing-standards-ru.md` (в отдельном git; при локальном монорепо путь к клону — рядом с `premier-design`). Здесь — как это соотносится с **Premier Design** (Pages Router, Panda, расширенные гейты).

## Зачем этот документ

Строка **C3** в [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md): имена сценариев и smoke/e2e ориентируются на Feb Code; детали проекта остаются в [`mempalace/rules/07-web-testing-and-quality-ru.md`](../mempalace/rules/07-web-testing-and-quality-ru.md).

## Общие принципы (как у Feb Code)

- Тестировать **поведение и контракты**, не детали реализации.
- **Один тест — одна сцена**; структура **AAA** (Arrange → Act → Assert).
- Для формулировок в `it`/`test` — русский язык вида «должен …» / «не должен …», где это принято в проекте.

## Где что лежит в Premier Design

| Уровень | Где | Команды |
|---------|-----|---------|
| Unit / компоненты | `premier-design/**/*.test.{js,jsx,ts,tsx}` (конфиг Jest) | `yarn test`, `yarn test:coverage` |
| E2e / smoke | `premier-design/e2e/*.spec.ts` | `yarn test:e2e`, `yarn test:e2e:full`, теги `@core` / `@extended` |
| Скрипты и CI | — | `yarn check:static`, полный прогон — см. [`scripts-and-quality-gates-ru.md`](scripts-and-quality-gates-ru.md), `.github/workflows/ci.yml` |

Имена файлов e2e (`.spec.ts`, суффиксы `smoke` там, где уместно) можно сверять с примерами из Feb Code (`tests/e2e/*.spec.ts`) без переноса структуры каталогов один в один — у нас отдельная фича-сетка и Playwright-конфиг.

## При апдейте Next.js или конфигурации

Перед релизом сверяйте [`premier-design/next.config.js`](../../premier-design/next.config.js) с эталоном Feb Code (`next.config.ts`): **standalone**, **allowedDevOrigins**, заголовки безопасности — см. строку **C4** в [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md).

## Связанные документы

- [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md)
- [`mempalace/rules/07-web-testing-and-quality-ru.md`](../mempalace/rules/07-web-testing-and-quality-ru.md)
- [`guides/scripts-and-quality-gates-ru.md`](scripts-and-quality-gates-ru.md)
