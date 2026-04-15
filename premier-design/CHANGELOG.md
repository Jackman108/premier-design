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

- Удалён корневой каталог `components/`: примитивы `Ui*` в `shared/ui/primitives/`, тест `FeedbackForm` в `shared/ui/order/ui/FeedbackForm/__tests__/`.
- `next/image`: устранены сочетания `priority` и `loading="lazy"` (баннер акций и др.); AVIF/WebP и `minimumCacheTTL` для кэша оптимизаций.
- Next.js **16.2** (`next`, `eslint-config-next`, `@next/bundle-analyzer`); Turbopack по умолчанию для `next dev` / `next build` (кастомного `webpack` в проекте нет). ESLint: flat-конфиг из `eslint-config-next/core-web-vitals` без `FlatCompat`; правки под правила `react-hooks` v7 (хуки, `Slider`, `OfferCard`).
- `getStaticProps` / `getData` вынесены из `pages/api/` в `lib/getStaticData.ts` (алиас `@lib/*`) — маршрут `/api/dataProvider` больше не создаётся.
- Документы: каталог `document-page`, стили `DocumentPage.module.css` (исправлена опечатка `Documet`).
- `next.config.js`: убраны no-op rewrites (`/` → `/` и т.п.); `server.js` помечен как deprecated для локального HTTPS.
- Зависимости обновлены (`yarn install`): React 19.2, sharp 0.34, `@typescript-eslint/*`, `@testing-library/dom` и др.; основной lockfile — `yarn.lock`, CI и Docker на Yarn Classic.
- Документация репозитория: [`docs/README.md`](../docs/README.md) — аудит, гайды, ADR.
- `tsconfig.json`: `*.stories.*` и `.storybook` исключены из типов `next build`.
- Чат-бот через `next/dynamic` с `ssr: false`.
- Production Docker: контекст `./premier-design`, `public`, `HEALTHCHECK`; dev-образ и `docker-compose.development.yaml` без лишнего `target`.
