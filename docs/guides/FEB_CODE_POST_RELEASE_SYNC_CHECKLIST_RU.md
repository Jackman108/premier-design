# Чеклист сверки с Feb Code после их релиза (DOC-04)

**Обновлено**: 29.04.2026

Канон слоёв и конфигурации Feb Code — в **отдельном репозитории** (`febcode/docs/architecture.md`, `febcode/next.config.ts`). Этот файл — **что проверить у нас**, чтобы не расходиться по смыслу (C1–C4 из [`audit/CROSS_REPO_ALIGNMENT_RU.md`](../audit/CROSS_REPO_ALIGNMENT_RU.md)).

## Когда запускать

- После **значимого** релиза Feb Code (major/minor Next.js, смена FSD-правил, крупные правки `next.config`), либо перед нашим major-апдейтом Next.

## Шаги (≈30–60 мин)

1. Подтянуть свежий **`febcode`** и прочитать diff `docs/architecture.md` / `docs/cross-repo-alignment-plan.md` (если менялись).
2. **C1/C2:** сверить направление импортов и публичный API с [`LAYER_IMPORTS_AND_PUBLIC_API_CROSS_REPO_RU.md`](LAYER_IMPORTS_AND_PUBLIC_API_CROSS_REPO_RU.md); при рефакторинге у нас — `yarn check:architecture`.
3. **C3:** при изменении e2e-конвенций у них — [`TESTING_STANDARDS_CROSS_REPO_RU.md`](TESTING_STANDARDS_CROSS_REPO_RU.md).
4. **C4:** сравнить `febcode/next.config.ts` с `premier-design/next.config.js` (standalone, `allowedDevOrigins`, заголовки, `outputFileTracingRoot`, `turbopack`, dev `watchOptions`). Переносить только совместимое с Pages Router и нашим CSP.
5. Зафиксировать результат: **«изменений в Premier не требуется»** или PR с правками + запись в `premier-design/CHANGELOG.md`.

## Последние прогоны

| Дата | Результат кратко |
|------|------------------|
| 2026-04-29 | Базовая сверка: паритет next.config (tracing/turbopack/watch) уже внесён ранее; отдельный PR по Feb Code не потребовался. |
