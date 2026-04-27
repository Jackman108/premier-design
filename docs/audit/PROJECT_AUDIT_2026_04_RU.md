# Аудит проекта — Premier Design (индекс, апрель 2026)

Индекс: [`docs/README.md`](../README.md) · Открытый бэклог: [`AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](./AUDIT_AND_IMPROVEMENT_PLAN_RU.md) · Риски: [`PROJECT_RISK_REGISTER_2026_04_RU.md`](./PROJECT_RISK_REGISTER_2026_04_RU.md) · Деплой: [`DEPLOY_READINESS_2026_04_RU.md`](./DEPLOY_READINESS_2026_04_RU.md)

Правила агента: [`.cursor/rules/agent-mempalace-bootstrap.mdc`](../../.cursor/rules/agent-mempalace-bootstrap.mdc), [`.cursor/rules/agent-quality-process.mdc`](../../.cursor/rules/agent-quality-process.mdc). Канон норм: [`docs/mempalace/rules/`](../mempalace/rules/).

## Статус сводного аудита по 12 направлениям

Полный разбор (дизайн, архитектура, данные, структура, рефакторинг, паттерны, безопасность, зависимости, перфоманс, API/SLO, документация, правила) **закрыт**: все пункты на момент апреля 2026 приведены к `[x]`. Детальные таблицы по направлениям из документа удалены как выполненные; при необходимости восстановления смотрите историю git и записи в [`premier-design/CHANGELOG.md`](../../premier-design/CHANGELOG.md).

**Процесс при новых задачах:** открытые пункты — только в [`AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](./AUDIT_AND_IMPROVEMENT_PLAN_RU.md); после закрытия — `CHANGELOG.md`, при смене гейтов — [`QUALITY_GATES_SYNC_RU.md`](./QUALITY_GATES_SYNC_RU.md).

---

## Таблица: отклонения от строгого FSD (актуализация)

Гейт [`scripts/check-architecture-boundaries.mjs`](../../premier-design/scripts/check-architecture-boundaries.mjs): запрет `shared` → `@features/*` / `@services/*`, запрет **cross-feature** между разными слайсами `features/*`.

**Снято рефакторингом (ранее в таблице):** SEO-типы и `getFullCanonicalUrl` вынесены в `shared/interface/seoHead.props.ts` и `shared/utils/getFullCanonicalUrl.ts`; `getCommonProps` + finders перенесены в `lib/`; `useViewportMobile` в `shared`, композиция с меню — `widgets/layout/hooks/useResizeEffects.ts`.

| Участок | Файл(ы) | Суть | Примечание |
|--------|---------|------|------------|
| **lib → shared (данные)** | `lib/getCommonProps.ts`, `lib/findService.ts`, `lib/findRelatedService.ts`, `lib/collectSitePathnames.ts`, `lib/resolveServicesTier.ts`, `lib/servicesTierStatic.ts`, `getStaticData` | Тип **`DataProps`** из **`@shared/validates/dataPropsSchema`** (`z.infer`); **`collectSitePathnames`** — единый список pathnames для **`/api/sitemap`** (`sitemap.xml`) и HTML **`/sitemap`**; **`resolveServicesTier` / `servicesTierStatic`** — пути и пропсы для **`/services/[categoryId]`** (категория прайса или **`relatedServices`**) | Next-обвязка и виджеты используют один контракт с JSON; см. [`CODE_STRUCTURE_AND_NAMING_RU.md`](../guides/CODE_STRUCTURE_AND_NAMING_RU.md). |
| **widgets → UI фич** | `widgets/layout/ui/footer/Footer.tsx`, **`widgets/services-tier/`** и др. | Импорт **`@features/<slice>`** из баррелей `features/<slice>/index.ts`; несколько фич в одном виджете — для общих маршрутов (пример: **`ServicesTierPage`**) | Композиция виджетов; подпись подрядчика — отдельный `DeveloperCredit`, URL в `shared/constants/company.ts`. |

**Соблюдается (при `yarn check:architecture`, т.е. `--all`):** нет `shared` → `@features/*` / `@services/*`; **внутри `features/*` нет cross-feature** (композиция нескольких слайсов — в **`widgets/`** или **`pages/`**); фичи не импортируют `find*` из другого слайса через `lib`.

**Практика CI:** в `lint-staged` скрипт границ вызывается **по списку изменённых файлов** без `--all`; полный проход — в `yarn check:risk:local` / `yarn check:architecture`.

---

## Ревизия незакоммиченных изменений (архитектура и чистота кода)

Охват: ветка с хабом **`/services`**, HTML **`/sitemap`**, **`collectSitePathnames`**, **`page-detail-shell`**, документы **`app/documents`**, **`ServiceCategoryPage`**, SSG **`servicesTierStatic`**, правки **`RelatedServiceDetail`** / **`ServiceDetail`**, данные и тесты sitemap.

| Зона | Наблюдение | Рекомендация | Статус |
|------|------------|--------------|--------|
| **`lib/collectSitePathnames` + `/api/sitemap`** | Один источник pathnames для XML и **`/sitemap`** | Держать синхронность с новыми публичными маршрутами в комментарии модуля | Выполнено |
| **`lib/resolveServicesTier` + `servicesTierStatic`** | Явное разделение: категория прайса vs `relatedServices` для одного сегмента URL | Документировано в `CODE_STRUCTURE_AND_NAMING_RU.md` | Выполнено |
| **`shared/ui/page-detail-shell`** | Общая вёрстка детальных услуг (DRY вместо дубля CSS в двух фичах) | Использовать для будущих «детальных» страниц того же паттерна | Выполнено |
| **`shared/ui/pricing-table`** | Таблица прайса была продублирована логически в **`CategoryCollapse`** и **`ServiceCategoryPage`**; импорт CSS из `category` в `services` давал **cross-feature** при полном гейте | Вынести стили в **`shared`**, переиспользовать в **`CategoryCollapse`** и **`ServiceCategoryPage`** | Выполнено |
| **`widgets/services-tier/ServicesTierPage`** | Композиция **`ServiceCategoryPage`** + **`RelatedServiceDetail`** ранее жила в **`features/services`** и нарушала FSD (импорт **`@features/related-services`**) | Перенести композицию в **`widgets/services-tier`**, entrypoint — **`import {ServicesTierPage} from '@widgets/services-tier'`** в **`pages/services/[categoryId].ts`** | Выполнено |
| **`staticPathsHandler` / `staticPropsHandler`** | Режим **`isRelated`** был мёртвым после переноса **`[categoryId]`** на **`servicesTierStatic`** | Удалён флаг; хендлеры обслуживают только **`[categoryId]/[serviceId]`**; сценарии related/merge покрыты **`lib/__tests__/servicesTierStatic.test.ts`** | Выполнено |
| **`RelatedServiceDetailProps`** | Лишнее поле **`titles`** не использовалось в **`RelatedServiceDetail`** | Удалено из типа и из **`servicesTierStatic`** | Выполнено |
| **`app/documents` + `DocumentPage`** | Крошки и отступы унифицированы с **`scroll-padding`** | Следить за единым `padding-top` shell при смене высоты хедера | Выполнено |
| **Документация** | `CODE_STRUCTURE`, таблица FSD в этом файле, `CHANGELOG` | При новых публичных маршрутах — обновлять **`STATIC_SITEMAP_PATHS`** / **`collectSitePathnames`** и юзер-доки | Актуализировано |
| **CTA Appeal + `app/documents`** | `AppealSectionData` в `shared/interface/`; `getCommonProps.appealSection`; `DocumentSiteShell` + `dynamic` из `@lib/dynamicSectionImports` | Контракт CTA не тянет cross-feature между слайсами; shell — client, данные — server layout | Выполнено |
| **Главная: scroll-spy / квиз** | `id="lead-quiz"` на секции с `LeadQuiz`; `homePage.sectionAriaLabels.quiz` в `data.json` + ключ в `dataPropsSchema` | Соответствие `HOME_SECTION_NAV_LINKS` / `HOME_SECTION_SCROLL_SPY_ORDER` | Выполнено |
| **Use-case границы: feedback/quiz (S2)** | Аудит `features/feedback/useCases/*`: в use-case нет `fetch/axios` и HTTP-типов, внешние интеграции идут через DAL/порты (`FeedbackDal`). Сценарии quiz в `features/marketing/lead-quiz/*` остаются в UI/hooks и не нарушают dependency-rule | Подтверждено ревизией + зелёный `yarn check:architecture` | Выполнено |
| **Моки хуков: полный контракт (S3)** | Проверены `jest.mock` для `useModalState`, `useUrlHash`, `useScrollToElement`, `useViewportMobile`, `useMobileMenu`: `mockReturnValue` возвращает полный публичный контракт, включая `scrollToRef` для `useScrollToElement` | Подтверждено ревизией `__tests__` + зелёный `yarn typecheck` | Выполнено |
| **Dynamic imports реестр (S4)** | Ревизия `lib/dynamicSectionImports.ts`: тяжёлые секции держатся в реестре lazy-импортов с `SectionSkeleton`; новых «тяжёлых» модулей вне реестра в этом цикле не найдено | Подтверждено ревизией + без кода-правок | Выполнено |
| **ARCH-03: запрет `@lib/find*` внутри features** | В `scripts/check-architecture-boundaries.mjs` добавлено явное правило на `@lib/find*`/`resolveServicesTier`/`servicesTierStatic` для `features/*`; добавлен sentinel-test для guardrail | `yarn check:architecture` + `tests/architecture/lib-cross-feature-sentinel.test.ts` | Выполнено |

---

## Направления улучшения дизайна, вёрстки и визуального уровня

Раздел показывает **понятный статус по UI-качеству**: что уже закрыто и что остаётся в бэклоге. Основа — токены (`styles/tokens.css`), глобальные стили и фактические изменения в `CHANGELOG.md`.

### Закрытые направления (выполнено)

| Направление | Что сделано | Статус |
|------------|-------------|--------|
| Единая шкала отступов и сетка | Введены и применены `--section-padding-y*`, `--section-content-max`, `--section-inner-stack-gap`, `--section-card-padding-block`, `--page-content-offset-top`; секции переведены с «магических» `vh/px` на токены | Выполнено |
| Оптическая иерархия заголовков | В `shared/ui/title/ui/Title.module.css` унифицированы `line-height`, `letter-spacing`, адаптив; согласованы заголовки в `CompanyAboutSections` и `OfferBanner` | Выполнено |
| Длина строки и читаемость | Ограничена длина строки для `pageDetailShell`, `DocumentPage`, длинных блоков `OfferBanner`/`Partners`/`aboutNews` | Выполнено |
| Touch-targets и hover-режим | Минимум 44×44, hover только в `@media (hover: hover)`, `:focus-visible` сохранён | Выполнено |
| Skeleton для динамических секций | Добавлен `shared/ui/section-skeleton/*`; `dynamicSectionImports` переведён на `loading: SectionSkeleton` | Выполнено |
| Карточки и глубина | Карточки услуг/примеров/сметы/прайса приведены к единому `border + shadow`; убраны ключевые pseudo-3D/inset-паттерны | Выполнено |
| Тёмная тема на фото/градиентах | Добавлены `--surface-on-media*`, `--text-on-media*`; применено в `OfferBanner`, `BusinessServicesCard`, `ServicesCards`, `PhotoViewer`, `OfferCard` | Выполнено |
| Аудит контраста dark theme на медиа-страницах (S2) | Ревизия `OfferBanner`, `ServicesCards`, `BusinessServicesCard`, `PhotoViewer`, `OfferCard`: контрастные пары сведены к `--surface-on-media*` / `--text-on-media*`, «светлый текст / светлая зебра» не обнаружены | Выполнено |
| CSP и trusted assets (S3) | Ревизия `next.config.js`: `script-src`, `img-src`, `connect-src` соответствуют ADR `0004`, внешние источники карт ограничены allowlist, `frame-src`/`object-src` закреплены | Выполнено |
| Keyboard-only smoke модалок (S4) | Для `FeedbackModal` и `EstimateModal` добавлен явный fallback закрытия по `Escape` (legacy `<dialog open>`) и unit-покрытие; `PhotoViewer` уже покрыт в `e2e/smoke.spec.ts` (`Escape`) | Выполнено |
| Storybook primitives (QA-04) | Проверено покрытие `shared/ui/primitives/*` сторями с `autodocs`; добавлены play/a11y сценарии в `UiDialog` и `UiInput`; сборка storybook проходит | Выполнено |
| Фокус и клавиатура | Добавлены `--focus-outline-*`, включён глобальный fallback `:focus-visible`, закрыты точечные пропуски (в т.ч. `HomePageChrome`, `ChatBotSidebar`) | Выполнено |

### Открытые улучшения (следующий цикл)

На текущий момент **открытых задач нет**. Оперативный список ведётся в [`AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](./AUDIT_AND_IMPROVEMENT_PLAN_RU.md).

| Задача | Статус |
|--------|--------|
| Формы: `:autofill` / `:-webkit-autofill`, `autocomplete` | Выполнено |
| Микродвижение и `prefers-reduced-motion` | Выполнено (глобальный fallback + проверка декоративных анимаций) |
| Визуальный регресс/контраст в CI | Выполнено (добавлен e2e visual smoke `e2e/visual-regression.spec.ts`) |
| Современные приёмы (опционально) | Закрыто как отложенное улучшение (вне текущего релизного цикла) |

**Как вести раздел дальше:**
- новые незакрытые UI-задачи — в [`AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](./AUDIT_AND_IMPROVEMENT_PLAN_RU.md);
- после реализации — фикс в `premier-design/CHANGELOG.md` и перевод пункта в блок «Выполнено» здесь;
- если меняются гейты/процесс релиза — синхронизировать с [`QUALITY_GATES_SYNC_RU.md`](./QUALITY_GATES_SYNC_RU.md) и [`DEPLOY_READINESS_2026_04_RU.md`](./DEPLOY_READINESS_2026_04_RU.md).

---

## Приложения

- Риски: [`PROJECT_RISK_REGISTER_2026_04_RU.md`](./PROJECT_RISK_REGISTER_2026_04_RU.md).
- Правила: [`.cursor/rules/`](../../.cursor/rules/), [`docs/mempalace/rules/`](../mempalace/rules/).
- История: [`premier-design/CHANGELOG.md`](../../premier-design/CHANGELOG.md).
