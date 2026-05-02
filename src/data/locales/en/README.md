# Локаль `en` (§9 этап 9.1 / BP-21)

- **`data.json`** — та же структура, что у **`../ru/data.json`**, проходит **`dataPropsSchema`**; пользовательские строки — английская редакция (генерация и правки — см. **`scripts/generate-en-locale-data.mjs`**, кэш перевода в **`_translation-cache.json`** — в `.gitignore`). Файл **`ui.json`** правится вручную рядом с **`ru/ui.json`** (общие ключи).

- Загрузка: **`loadSiteData('en')`**; выбор языка в UI — cookie **`pd_site_locale`**, переключатель в хедере.

- SEO без отдельных URL `/en`: **`hreflang`** (`ru` / `en` / `x-default`) на канон текущего пути — [`hreflangAlternates.ts`](../../../shared/lib/seo/hreflangAlternates.ts) + корневой **`proxy.ts`** (заголовок **`x-pathname`**). Префикс пути **`/en`** не планируется — **DATA-PREM-01**.
