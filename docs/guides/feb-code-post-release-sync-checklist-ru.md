# Чеклист сверки с Feb Code после их релиза (DOC-04)

**Обновлено**: 29.04.2026

Канон слоёв и конфигурации Feb Code — в **отдельном репозитории** (`febcode/docs/guides/architecture-ru.md`, `febcode/next.config.ts`). Этот файл — **что проверить у нас**, чтобы не расходиться по смыслу (C1–C4 из [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md)).

## Когда запускать

- После **значимого** релиза Feb Code (major/minor Next.js, смена FSD-правил, крупные правки `next.config`), либо перед нашим major-апдейтом Next.

## Шаги (≈30–60 мин)

1. Подтянуть свежий **`febcode`** и прочитать diff `docs/guides/architecture.md` / `docs/guides/cross-repo-alignment-plan.md` (если менялись).
2. **C1/C2:** сверить направление импортов и публичный API с [`layer-imports-and-public-api-cross-repo-ru.md`](layer-imports-and-public-api-cross-repo-ru.md); при рефакторинге у нас — `yarn check:architecture`.
3. **C3:** при изменении e2e-конвенций у них — [`scripts-and-quality-gates-ru.md`](scripts-and-quality-gates-ru.md) (§ «Тесты и Feb Code») и их [`testing-standards-ru.md`](https://github.com/Jackman108/febcode/blob/master/docs/guides/testing-standards-ru.md).
4. **C4:** сравнить `febcode/next.config.ts` с корневым `next.config.js` (**premier-design**) (standalone, `allowedDevOrigins`, заголовки, `outputFileTracingRoot`, `turbopack`, dev `watchOptions`). Переносить только совместимое с Pages Router и нашим CSP.
5. Зафиксировать результат: **«изменений в Premier не требуется»** или PR с правками + запись в [`changelog.md`](../changelog.md).

## Последние прогоны

| Дата       | Результат кратко                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-29 | Базовая сверка: паритет next.config (tracing/turbopack/watch) уже внесён ранее; отдельный PR по Feb Code не потребовался. |
