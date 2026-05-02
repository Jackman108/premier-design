# Локализованный контент сайта

- **`ru/data.json`** — канон продакшена; **`en/data.json`** — бандл контента для **`en`** (см. [`en/README.md`](en/README.md)).
- **`ru/ui.json`** / **`en/ui.json`** — короткие UI-строки (a11y меню, группа переключателя языка и т.д.); читаются через **`getUiMessage`** / **`useLocale().t`** в **`@shared/i18n`** (не смешивать с доменным **`data.json`**).
- Загрузка контента: **`loadSiteData(locale?)`** в `@shared/site-data` (`'ru' | 'en'`), тип **`SiteLocale`** в **`shared/site-data/site-locale.ts`**.
