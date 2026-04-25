# Аудит проекта — Premier Design (индекс, апрель 2026)

Индекс: [`docs/README.md`](../README.md) · Открытый бэклог: [`AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](./AUDIT_AND_IMPROVEMENT_PLAN_RU.md) · Риски: [`PROJECT_RISK_REGISTER_2026_04_RU.md`](./PROJECT_RISK_REGISTER_2026_04_RU.md) · Деплой: [`DEPLOY_READINESS_2026_04_RU.md`](./DEPLOY_READINESS_2026_04_RU.md)

Правила агента: [`.cursor/rules/agent-architecture-clean-code.mdc`](../../.cursor/rules/agent-architecture-clean-code.mdc), [`.cursor/rules/agent-context-bootstrap.mdc`](../../.cursor/rules/agent-context-bootstrap.mdc). Mempalace: [`docs/mempalace/rules/`](../mempalace/rules/).

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

---

## Направления улучшения дизайна, вёрстки и визуального уровня

Список основан на обзоре токенов (`styles/tokens.css`, `panda.config.ts`), глобальных стилей, фокус-состояний и паттернов секций. Не дублирует закрытый аудит perf/a11y — это **продуктово-визуальный** бэклог.

### Прогресс (Этап 1: `Главная` → `services` → `repairs` → `documents` + оставшиеся страницы)

| Направление | Решение | Статус |
|------------|---------|--------|
| Единая шкала отступов и сетка | В `styles/tokens.css`: `--section-padding-y*`, `--section-content-max`, `--section-inner-stack-gap`, `--section-card-padding-block`, `--page-content-offset-top`; главная: `HomePageSection` + `data-rhythm`; внутренние лендинги/хедер/футер/cookies/карточки секций — `var(--section-content-max)` вместо `1440px`, внутренние зазоры — токены вместо `4vh`/`2vh` (см. ADR 0001, `CHANGELOG`) | Выполнено |
| Оптическая иерархия заголовков | `shared/ui/title/ui/Title.module.css`: единые `line-height`, `letter-spacing`, token-driven отступы и мобильные ограничения без «магических» размеров; выровнены блоковые заголовки в `CompanyAboutSections` и `OfferBanner` | Выполнено |
| Длина строки и читаемость | Ограничена длина строки: `shared/ui/page-detail-shell/pageDetailShell.module.css` (`.prose`), `features/documents-content/ui/document-page/DocumentPage.module.css` (`.content`), а также длинные тексты в `OfferBanner`, `Partners`, `aboutNews` | Выполнено |

### Прогресс (Этап 2: touch + hover + skeleton)

| Направление | Решение | Статус |
|------------|---------|--------|
| Интерактивы на touch (>=44px) | Мин. целевой размер **44×44px** (или эквивалент с padding) по интерактивам, перечисленным в `CHANGELOG` (в т.ч. `ThemeButton`, `MobileMenu`, `DocumentBreadcrumbs`, соц-иконки, стрелки, калькулятор, футер, телефон, табы). Соответствует правилу a11y в [`agent-architecture-clean-code.mdc`](../../.cursor/rules/agent-architecture-clean-code.mdc) §6. | Выполнено |
| Hover vs touch | Эффекты **:hover** для устройств с курсором: `@media (hover: hover)`; клавиатура/скринридер: **:focus-visible** не убран. Покрытие — основные `*.module.css` с интерактивом (см. `CHANGELOG`). | Выполнено |
| Skeleton для dynamic секций | Добавлен `shared/ui/section-skeleton/*`; `lib/dynamicSectionImports.ts` переведён на `next/dynamic` с `loading: SectionSkeleton` для ленивых секций | Выполнено |

1. **Единая шкала отступов и сетка** — свести «случайные» отступы в модулях к шагам из токенов (или Panda spacing), проверить выравнивание секций на широких экранах (max-width контейнера + ритм вертикали).
2. **Оптическая иерархия заголовков** — `clamp` уже используется; проверить согласованность `h1–h4` между лендингом и внутренними страницами услуг, избежать скачков веса/межбуквенного без причины.
3. **Длина строки и читаемость** — для длинных текстов (новости, описания услуг) задать `max-width` в `ch` и комфортный `line-height` (уже частично в токенах — довести до всех prose-блоков).
4. **Интерактивы на touch** — убедиться, что все кликабельные зоны ≥ 44×44 px (или эквивалент с padding); плавающая панель уже учитывает `safe-area-inset-bottom` — распространить на остальные fixed/sticky элементы.
5. **Состояния наведения vs touch** — где есть тяжёлые hover-эффекты, добавить `@media (hover: hover)` чтобы на тач не оставалось «липких» подсветок.
6. **Скелетоны и переключение контента** — для `next/dynamic` секций рассмотреть единый skeleton/shimmer вместо пустого `loading: null`, чтобы снизить CLS и ощущение «прыжка».
7. **Карточки и глубина** — унифицировать тени/бордеры (`--shadow-*`, `--color-border`) между карточками услуг, прайса, примеров; избежать смешения «плоских» и «псевдо-3D» карточек в одном скролле без смысла.
8. **Тёмная тема** — пройтись по секциям с фото/градиентами и легаси `--gray*`: везде ли текст остаётся контрастным (не только hero); при необходимости завести семантические фоны для «тёмных плашек поверх изображения».
9. **Фокус и клавиатура** — `focus-visible` уже точечно; аудит оставшихся кнопок/ссылок без явного кольца; единый цвет/толщина outline в токенах.
10. **Формы** — стили `:autofill` / `:-webkit-autofill` для полей, явные `autocomplete`, визуальное равенство плейсхолдера и заполненного значения.
11. **Микродвижение** — для декоративных анимаций проверить `prefers-reduced-motion` (как в тосте успеха); не опираться на motion для смысла.
12. **Современные приёмы (опционально)** — по мере обновления стека: лёгкие View Transitions между страницами, `content-visibility` для длинных списков, `scroll-driven` анимации там, где есть fallback.
13. **Визуальный регресс / контраст** — расширить контроль: периодический прогон axe/pa11y или скриншот-тесты критичных секций в CI (см. существующие гейты в `scripts/`).

---

## Приложения

- Риски: [`PROJECT_RISK_REGISTER_2026_04_RU.md`](./PROJECT_RISK_REGISTER_2026_04_RU.md).
- Правила: [`.cursor/rules/`](../../.cursor/rules/), [`docs/mempalace/rules/`](../mempalace/rules/).
- История: [`premier-design/CHANGELOG.md`](../../premier-design/CHANGELOG.md).
