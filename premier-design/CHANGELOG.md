# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/),
версии по [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Changed

- Документация репозитория структурирована: [`docs/README.md`](../docs/README.md) — аудит в `docs/audit/`, гайды в `docs/guides/`, ADR в `docs/adr/`.

### Added

- ADR `docs/adr/0001-ui-stack-and-design-tokens.md`: UI-стек (CSS Modules + токены), путь к опциональной миграции на HeroUI/NextUI.
- Слой токенов `styles/tokens.css` и базовые примитивы `components/ui/` (UiButton, UiInput, UiSurface) со stories в Storybook.
- Storybook 10 (`npm run storybook`, `npm run build-storybook`).
- Скрипт `npm run analyze` — отчёт `@next/bundle-analyzer` при сборке.
- `CHANGELOG.md` и регламент версий в `README.md`.

### Changed

- `tsconfig.json`: файлы `*.stories.*` и `.storybook` исключены из проверки типов Next (`next build`), чтобы типы Storybook не конфликтовали с приложением.
- `next/image`: форматы AVIF/WebP и `minimumCacheTTL` для кэширования оптимизаций.
- Чат-бот (`react-chatbot-kit`) подключается через `next/dynamic` с `ssr: false`, чтобы снизить First Load JS.
- Production Docker: контекст `./premier-design`, копирование `public`, `HEALTHCHECK`; dev-образ: `HEALTHCHECK`, исправлен `docker-compose.development.yaml` (убран несуществующий `target: runner`).
