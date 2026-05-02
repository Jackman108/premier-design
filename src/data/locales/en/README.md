# Локаль `en` (§9 этап 9.1 / BP-21 / ~~DATA-PREM-01~~)

- **`data.json`** — та же структура, что у **`../ru/data.json`**, проходит **`dataPropsSchema`**; английские пользовательские строки в **`title`** и текстах; поле **`menu[].ruTitle`** совпадает с **`../ru/data.json`** (русская подпись для контракта данных — см. [`Menu.props.ts`](../../../shared/ui/menu/interface/Menu.props.ts)). Первая редакция — MT + **`scripts/generate-en-locale-data.mjs`** (кэш **`_translation-cache.json`** — в `.gitignore`); базовая вычитка и правки верхнего уровня — **`DATA-PREM-01`** (changelog **premier-design**). Файл **`ui.json`** правится вручную рядом с **`ru/ui.json`** (общие ключи).

- Загрузка: **`loadSiteData('en')`**; выбор языка в UI — cookie **`pd_site_locale`**, переключатель в хедере.

- SEO без отдельных URL `/en`: **`hreflang`** (`ru` / `en` / `x-default`) на канон текущего пути — [`hreflangAlternates.ts`](../../../shared/lib/seo/hreflangAlternates.ts) + корневой **`proxy.ts`** (заголовок **`x-pathname`**). Префикс пути **`/en`** не используется.
