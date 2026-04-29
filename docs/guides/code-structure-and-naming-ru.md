# Стандарт структуры кода и именования

## Цель

Привести проект к предсказуемой, чистой и единообразной структуре, чтобы изменения были безопасными, переиспользуемыми и быстрыми в сопровождении.

## 1) Границы слоя представления

- В `ui/` разрешены только:
  - разметка/JSX;
  - композиция компонентов;
  - обработчики пользовательских событий.
- В `ui/` запрещены:
  - бизнес-правила и вычислительная логика;
  - реализация хуков;
  - объявление интерфейсов/типов;
  - утилиты общего назначения;
  - прямые вызовы API/БД/инфраструктуры.

Сопутствующий код размещается рядом, но в отдельных каталогах:
- `hooks/` — хуки (внутри слайса: `shared/hooks/`, `features/<slice>/hooks/`, `widgets/<slice>/hooks/`);
- `interface/` или `types/` — контракты и типы;
- `utils/` — чистые функции;
- `*.module.css` и `styles/tokens.css` — стили.

**Тесты хуков:** `**/hooks/__tests__/*.test.ts(x)` рядом с реализацией. Отдельного корня `premier-design/hooks/` нет; алиас `@hooks/*` не задаётся.

## 2) Чистая архитектура и структура файлов

- Зависимости направлены внутрь: UI -> use-case -> инфраструктура.
- Один файл/модуль = одна зона ответственности (SRP).
- Переиспользуемый код выносится:
  - в `shared/` — если используется в разных фичах;
  - в модуль фичи — если повторяется внутри одной фичи.
- Нельзя смешивать в одном файле UI, доменные правила и инфраструктуру.
- **Слой `entities/`** (`@entities/*`, PD-R-05): **единственный** источник доменных типов (прайс **`Category`/`PriceItem`**, карточка вкладки **`Paper`**, **`StructuredDataAggregateRating`** для SEO, **`BannerImageProps`**, **`ButtonProps`**, **`TitleProps`**, **`NewsProps`**, **`CostingCardProps`**, **`PanelProps`**, **`ShareBannerDataProps`**, **`AppealSectionData`**, DTO **`FaqStructuredDataItem`** / **`ServiceJsonLdInput`** для JSON-LD). Импорт только из `@entities/...` или барреля `@entities`; дублей в `shared/interface` нет. `shared` может **использовать** типы из `entities` в составе DTO (например поле в `CustomHeadProps`), но не дублировать определения. Паритет с Feb Code (`src/entities`).
- Каталог **`lib/`** (`@lib/*`): обвязка под Next.js без смешения с `shared/` — например `getStaticData.ts` (загрузка и zod-валидация `data/data.json`), **`dynamicSectionImports.ts`** (реестр `next/dynamic` для тяжёлых секций с `@features/*`), **`staticPropsHandler.ts`** (**`findService`** + **`getCommonProps`**) для **`pages/services/[categoryId]/[serviceId]`**, **`shared/utils/staticPathsHandler`** — пути этого же маршрута; **`findRelatedService`** — отдельный хелпер (не связан с **`staticPropsHandler`**), **`collectSitePathnames.ts`** (тот же набор pathnames, что в **`sitemap.xml`** и на HTML-**`/sitemap`**), **`resolveServicesTier.ts`** + **`servicesTierStatic.ts`** (SSG для **`pages/services/[categoryId]`**: либо хаб категории прайса **`ServiceCategoryPage`**, либо «смежная» услуга из **`relatedServices`**; UI-композиция — **`@widgets/services-tier`**). Тип корня **`DataProps`** = **`z.infer<typeof dataPropsSchema>`** в `@shared/validates/dataPropsSchema` (единый контракт `data.json`); `widgets/interface/interfaceData.ts` только реэкспортирует его и производные алиасы (`GetDataProps`, `FaqContentByPage`, …).
- **Константы вне `data.json`:** `shared/constants/company.ts` — единый источник: **`SITE_OPERATOR`** (production-origin `publicOrigin`, бренд, год с копирайта, e-mail для ПДн, краткое юр. наименование, блок для JSON-LD: соцсети, адрес, `areaServed`, `priceRange`), **`SITE_PUBLIC_ORIGIN`** (алиас origin для sitemap/canonical), подрядчик **`DEVELOPER_STUDIO_FEB_CODE`**. Юридические страницы и SEO импортируют отсюда; `public/robots.txt` (строка Sitemap) вручную синхронизировать с `SITE_OPERATOR.publicOrigin`.
- **Публичный API фичи:** корневой **`features/<slice>/index.ts`** — точка входа для слоёв выше (страницы, виджеты, `app/`): импорт **`@features/<slice>`**, а не глубоких путей к `ui/…`. Примеры: **`@features/category`** (`ServiceCategoriesHub`), **`@features/services`** (`ServiceDetail`, `ServiceCategoryPage`); композиция **`/services/[categoryId]`** — **`@widgets/services-tier`** (`ServicesTierPage`). Общая таблица прайса — **`shared/ui/pricing-table/`**. Внутри слайса по-прежнему локальные импорты. Кросс-репо с Feb Code (слои C1, границы и API C2) — [`layer-imports-and-public-api-cross-repo-ru.md`](layer-imports-and-public-api-cross-repo-ru.md).

## 3) Единый стиль именования

- Компоненты: `PascalCase` (пример: `FeedbackModal.tsx`).
- Хуки: `camelCase` с префиксом `use` (пример: `useFeedback.ts`).
- Типы/интерфейсы: `PascalCase` (пример: `FeedbackModalProps`).
- Утилиты: `camelCase` (пример: `formatPhone.ts`).
- CSS-модули компонентов: `<ComponentName>.module.css`.
- Имена должны быть самодокументируемыми, без неоднозначных сокращений.

## 4) Правила выноса общего кода

- Дублирование, появившееся во второй раз, рассматривается как кандидат на вынос.
- Вынос выполняется только при сохранении понятных границ и без преждевременной абстракции.
- После выноса обновляются импорты и тесты, чтобы поведение осталось неизменным.

## 5) Чеклист соответствия

- Компонент в `ui/` не содержит бизнес-правил и инфраструктурных вызовов.
- Хуки/типы/утилиты вынесены в профильные каталоги.
- Именование соответствует стандарту.
- Общий код вынесен и не дублируется по проекту.
- Обновлены [`changelog.md`](../changelog.md), аудит и ADR/гайды при изменении правил.

## 6) Комментарии в новых/измененных файлах

- В новых и существенно измененных файлах обязательны краткие комментарии с объяснением причин (`why`), если участок кода неочевиден.
- Комментарии не должны пересказывать синтаксис; они фиксируют бизнес-ограничение, архитектурный контракт или источник риска.
- Для вынесенной логики (`hooks/`, `utils/`) в начале модуля указывается:
  - зона ответственности,
  - входной/выходной контракт,
  - почему логика не должна оставаться в `ui/`.

## 7) Типографика и дизайн-токены

- В ключевых UI-блоках (`Hero`, маркетинговые секции, заголовки, лид-описания) использовать только семантические токены размеров/интерлинья из `styles/tokens.css`.
- Локальные `font-size`/`line-height` допустимы только как временное исключение с комментарием причины.
- При добавлении нового typographic уровня сначала расширяется токен-контракт, затем обновляются компоненты.
