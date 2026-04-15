# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/),
версии по [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added

- ADR `docs/adr/0001-ui-stack-and-design-tokens.md`: UI-стек (CSS Modules + токены), путь к опциональной миграции на HeroUI/NextUI.
- Слой токенов `styles/tokens.css` и базовые примитивы `shared/ui/primitives/` (UiButton, UiInput, UiSurface, UiTextarea, UiCheckbox) со stories в Storybook.
- Storybook 10 (`yarn storybook`, `yarn build-storybook`).
- Скрипт `yarn analyze` — отчёт `@next/bundle-analyzer` при сборке.
- `CHANGELOG.md` и регламент версий в `README.md`.

### Changed

- **P2 (perf / UX dev):** `next/image` в **`ServiceDetail`** и **`RelatedServiceDetail`** — `placeholder="empty"` вместо полного URL в **`blurDataURL`** (**D-2**); слайдер Keen — обёртка **`SliderLazy`** с **`next/dynamic`**, `ssr: false`, импорты переведены с **`Slider`** (**D-4**); в **`_document`** на **`<Html>`** добавлен **`data-scroll-behavior="smooth"`** (совместимость с **`scroll-behavior: smooth`** в глобальных стилях, см. [missing-data-scroll-behavior](https://nextjs.org/docs/messages/missing-data-scroll-behavior)); в **`globals.css`** убрана лишняя **`;`** у **`z-index`**.
- **D-5:** удалена неиспользуемая зависимость **`react-multi-carousel`**; обновлён **`package-lock.json`** (`yarn sync:npm-lock`).
- **F-2 / F-4:** в **`styles/tokens.css`** добавлены **`--shadow-lg`**, **`--transition-*`**, **`--overlay-on-media`**; в ключевых карточках (`CostingCard`, `ExampleCard`, `OfferCard`, `BusinessServicesCard`, `ServicesCards`, `RelatedServiceCard`, `ReviewCard`, `ApproachCards`) — тени/переходы на токенах, **`ExampleCard`** с **`role="button"`**, **`tabIndex={0}`**, клавиатура **Enter/Space**, стили **`:focus-visible`**; ссылки и интерактив — **`:focus-visible`** / **`:focus-within`** где уместно.
- **F-2 / F-4 (вторая волна):** расширены токены (**`--overlay-scrim*`**, **`--overlay-light`**, **`--overlay-panel`**, **`--shadow-inset-soft`**, **`--color-accent-soft`**, **`--text-shadow-on-light*`**, **`--order-*`** для **`OrderButton`**); hex/rgba → токены и единые тени в **`BackButton`**, **`FeedbackForm`**, **`ServiceDetail`**, **`ServicesCards`**, **`CategoryCollapse`**, **`DocumentPage`**, **`Reviews`**, **`RelatedServices`**, **`MenuButton`**, **`CostInput`**, **`CalculatorModal`**, **`FeedbackModal`**, **`PhotoViewer`**, **`Header`**, **`CookiesBanner`**, **`Features`**, **`TextViewer`**, **`OfferBanner`**, **`Title`**, **`UiButton`**; **`:focus-visible`** / **`transition`** на кнопках, ссылках и сводках (**`CategoryCollapse`**).
- **F-2 / F-4 (финал):** токен **`--shadow-banner-glow-up`** для баннера cookies; дочищены **`FeedbackModal`**, **`CookiesBanner`**; глобальные стили слайдера в **`globals.css`** (точки/стрелки на токенах, **`:focus-visible`**); **`Slider`**: стрелки **`role="button"`**, **`tabIndex`**, **Enter/Space**; **`chatbotConfig`** и **`BrickWallLoader`** — цвета через **`var(...)`**; удалён неиспользуемый **`shared/ui/slider/ui/slider.css`**.
- **E-2:** unit-тесты хуков в **`hooks/__tests__/`** — **`useLayoutProps`**, **`useScrollToElement`**, **`usePageData`**, **`useChatMessages`**, **`useCookiesBanner`**, **`usePrivacyPolicy`**, **`useThemeToggle`**, **`useCostingCardLogic`** (вместе с уже существующими **`useModalState`**, **`useFeedback`** — порог **≥ 8** хуков с тестами выполнен).
- TypeScript **6.x**, Jest **30**, `dotenv` **17**, `pg-promise` **12**; `tsconfig`: `moduleResolution: bundler`, алиасы в `paths` с префиксом `./`; `ignoreDeprecations: "6.0"` в `tsconfig.jest.json` (ts-jest); для тестов — `tsconfig.jest.json` и ссылка в `jest.config.cjs`.
- CI: в репозитории закоммичен `package-lock.json`; шаг аудита — `npm audit --omit=dev --audit-level=critical` в `premier-design/`; скрипт **`yarn sync:npm-lock`** после смены зависимостей.
- Sprint 6: таймауты **nodemailer** (SMTP) и **axios** (Telegram); абсолютные URL **og:image** / **twitter:image** и **JSON-LD logo** через `getFullCanonicalUrl`; **next/font** (Inter) в `lib/interFont.ts` + `_document`; из `_document` убраны невалидные httpEquiv cache-мета (**D-3**).
- **P1 (аудит):** каталог **`types/`** и алиас **`@app-types/*`** вместо неиспользуемого `@interface/*`; **`output: 'standalone'`** + обновлённый **`Dockerfile.prod`** (`node server.js`, без полного `node_modules`); **`docker-compose.yaml`** — убран `command`, используется CMD образа; **E-1:** шесть unit-наборов для `findService`, `findRelatedService`, `findItemByTitle`, `getCanonicalPath`, `getFullCanonicalUrl`, `generateStructuredData`; **FeedbackForm** — `UiTextarea`, `UiCheckbox`, маска телефона и select на токенах; исправлена передача **`consent`** при отправке и сообщение ошибки в **`findRelatedService`**.
- `package.json`: `resolutions` — `picomatch@^4.0.4` для единообразия дерева.
- Удалён корневой каталог `components/`: примитивы `Ui*` в `shared/ui/primitives/`, тест `FeedbackForm` в `shared/ui/order/ui/FeedbackForm/__tests__/`.
- `next/image`: устранены сочетания `priority` и `loading="lazy"` (баннер акций и др.); AVIF/WebP и `minimumCacheTTL` для кэша оптимизаций.
- Next.js **16.2** (`next`, `eslint-config-next`, `@next/bundle-analyzer`); `yarn dev` — **Webpack** (`--webpack`), опционально `yarn dev:turbo`; production `next build` по-прежнему может идти через Turbopack (см. вывод CLI). ESLint: flat-конфиг из `eslint-config-next/core-web-vitals` без `FlatCompat`; правки под правила `react-hooks` v7 (хуки, `Slider`, `OfferCard`).
- `next.config.js`: глобальные security-headers не вешаются на `/_next/*` (исключение в `source`), чтобы не ломать dev-ассеты.
- `getStaticProps` / `getData` вынесены из `pages/api/` в `lib/getStaticData.ts` (алиас `@lib/*`) — маршрут `/api/dataProvider` больше не создаётся.
- Документы: каталог `document-page`, стили `DocumentPage.module.css` (исправлена опечатка `Documet`).
- `next.config.js`: убраны no-op rewrites (`/` → `/` и т.п.); `server.js` помечен как deprecated для локального HTTPS.
- Зависимости обновлены (`yarn install`): React 19.2, sharp 0.34, `@typescript-eslint/*`, `@testing-library/dom` и др.; основной lockfile — `yarn.lock`, CI и Docker на Yarn Classic.
- Документация репозитория: [`docs/README.md`](../docs/README.md) — гайды, ADR; [`docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](../docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) — открытый бэклог и Definition of Done.
- `tsconfig.json`: `*.stories.*` и `.storybook` исключены из типов `next build`.
- Чат-бот через `next/dynamic` с `ssr: false`.
- Production Docker: контекст `./premier-design`, `public`, `HEALTHCHECK`; dev-образ и `docker-compose.development.yaml` без лишнего `target`.
