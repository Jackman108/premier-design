# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/),
версии по [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added

- ADR `docs/adr/0001-ui-stack-and-design-tokens.md`: UI-стек (CSS Modules + токены), путь к опциональной миграции на HeroUI/NextUI.
- Слой токенов `styles/tokens.css` и базовые примитивы `shared/ui/primitives/` (UiButton, UiInput, UiSurface) со stories в Storybook.
- Storybook 10 (`yarn storybook`, `yarn build-storybook`).
- Скрипт `yarn analyze` — отчёт `@next/bundle-analyzer` при сборке.
- `CHANGELOG.md` и регламент версий в `README.md`.

### Changed

- TypeScript **6.x**, Jest **30**, `dotenv` **17**, `pg-promise` **12**; `tsconfig`: `moduleResolution: bundler`, алиасы в `paths` с префиксом `./`; `ignoreDeprecations: "6.0"` в `tsconfig.jest.json` (ts-jest); для тестов — `tsconfig.jest.json` и ссылка в `jest.config.cjs`.
- CI: в репозитории закоммичен `package-lock.json`; шаг аудита — `npm audit --omit=dev --audit-level=critical` в `premier-design/`; скрипт **`yarn sync:npm-lock`** для обновления lock после `yarn`. Известный high — см. аудит (`react-multi-carousel` → транзитивный `npm`).
- Sprint 6: таймауты **nodemailer** (SMTP) и **axios** (Telegram); абсолютные URL **og:image** / **twitter:image** и **JSON-LD logo** через `getFullCanonicalUrl`; **FeedbackForm** — частично на `UiInput` / `UiButton`; **next/font** (Inter) в `lib/interFont.ts` + `_document`; из `_document` убраны невалидные httpEquiv cache-мета (**D-3**).
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
