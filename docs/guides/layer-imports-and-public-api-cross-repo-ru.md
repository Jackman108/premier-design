# Слои, импорты и публичный API (C1/C2, опора на Feb Code)

**Обновлено**: 29.04.2026

Канон Feb Code по слоям и направлению зависимостей — **`febcode/docs/guides/architecture-ru.md`** (FSD + App Router, `pages-layer`, алиасы `@app`, `@pages`). Здесь — **как сверять** этот канон с **Premier Design** (App Router, Panda, те же по смыслу алиасы) без дублирования текста.

## C1 — документация слоёв и смена роутинга

| Концепция Feb Code | Premier Design (фактическое расположение) |
|--------------------|-------------------------------------------|
| `src/app/` — роутинг Next + тонкие `page.tsx` | **`app/`** (`@app`, `@app/*`), Route Handlers `app/api/*/route.ts`; типичный паттерн — реэкспорт из **`@pages/...`** (febcode: `home-metadata` + `home-route`) |
| `pages-layer/` — композиция страниц без конфликта с резервом `pages/` | **[`pages-layer/`](../../premier-design/pages-layer/)** (`@pages`, `@pages/*`, `@pages-layer/*`): клиентские страницы и RSC-сборка (например [`home/home-route.tsx`](../../premier-design/pages-layer/home/home-route.tsx) + [`home/home-metadata.ts`](../../premier-design/pages-layer/home/home-metadata.ts)); услуги — [`services-detail/`](../../premier-design/pages-layer/services-detail/) и загрузчики в `@lib/app-router/` |
| `widgets/` → `features/` → `entities/` → `shared/` | `widgets/` → `features/` → `entities/` → `shared/` (**PD-R-05**) |
| Контент и сообщения | Premier (RU): **`@shared/site-data`** (`loadSiteData`), **`data/locales/ru/data.json`**; тексты ошибок формы — **`@shared/i18n/messages`**; Feb: **`shared/site-content`**, словари |
| Направление импортов «вниз по слою» | То же по смыслу: [`mempalace/rules/01-web-architecture-and-boundaries-ru.md`](../mempalace/rules/01-web-architecture-and-boundaries-ru.md), [`code-structure-and-naming-ru.md`](code-structure-and-naming-ru.md) |

**Правило при любом рефакторинге роутинга:** заново пройти **`febcode/docs/guides/architecture-ru.md`** (разделы «Структура», «Правила зависимостей», «Алиасы») и проверить, что новые файлы не ломают направление зависимостей и не тащат домен «вверх» в слой роутинга.

## C2 — публичный API срезов и автоматические границы

### Как у Feb Code

В `architecture.md`: экспорт виджетов через **`index.ts`**, импорт из `@widgets`, не из внутренних путей; запрет «голого» `@/` — у них свои алиасы (`@features/*`, …).

### Как у Premier Design

- **Публичный API фичи:** корневой **`features/<slice>/index.ts`** — импорт **`@features/<slice>`**, не глубоких `ui/…` снаружи слайса — см. [`code-structure-and-naming-ru.md`](code-structure-and-naming-ru.md) §2.
- **Границы в CI и pre-commit:** скрипт **`scripts/check-architecture-boundaries.mjs`** (`yarn check:architecture`) + **`scripts/architecture-allowlist.json`** (исключения с датой истечения). В `lint-staged` границы гоняются **по изменённым файлам**.
- Дополнительные правила (например запрет обходов через `@lib/find*`) заданы в том же скрипте — при расширении импортов новые нарушения либо исправляются, либо заносятся в allowlist осознанно с планом снятия.

Сверка с Feb Code: та же дисциплина «один вход на срез», но инструмент у нас — **ESLint + кастомный boundary-check**, у них — отдельный **arch-lint** в `yarn lint`; смысл совпадает.

## Связанные документы

- [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md) (строки C1, C2)
- [`code-structure-and-naming-ru.md`](code-structure-and-naming-ru.md)
- [`guides/scripts-and-quality-gates-ru.md`](scripts-and-quality-gates-ru.md)
- Feb Code (отдельный git): `docs/guides/architecture.md`
