# Локализованный контент сайта

- **`ru/data.json`** — единственный поддерживаемый сейчас источник текстов и структуры лендинга; загрузка через **`loadSiteData()`** в `@shared/site-data`, проверка **`dataPropsSchema`**.
- Другие языки: добавить каталог `data/locales/<locale>/`, расширить тип **`SiteLocale`** и загрузчик в **`shared/site-data/load-site-data.ts`**.
