# ADR 0013: `shared/lib` как единый корень обвязки, React Query и Prettier

**Статус:** принято  
**Дата:** 29.04.2026

## Контекст

Корневой каталог **`lib/`** дублировал по смыслу **`shared/lib/`** (обвязка Next.js, SEO-хелперы, клиенты API). Для выравнивания с ожиданиями FSD и кросс-репо-паттерном Feb Code логично держать один каталог **`shared/lib/`**.

Клиентские запросы к API и кеширование результатов удобно стандартизировать через **TanStack Query**, как в Feb Code.

Решение [**ADR 0010**](./0010-formatting-policy-no-prettier.md) о форматировании только ESLint пересмотрено: команда принимает **Prettier** + **`eslint-config-prettier`**, чтобы убрать конфликты правил и упростить выравнивание с Feb Code.

## Решение

1. **Перенос:** содержимое бывшего **`lib/`** перенесено в **`shared/lib/`** (включая `app-router/`, `staticProps/`, `dynamicSectionImports`, `getStaticData` и т.д.). Алиас **`@lib/*`** удалён; импорты — **`@shared/lib/...`**.
2. **React Query:** зависимость **`@tanstack/react-query`**; фабрика **`createQueryClient`** в **`shared/lib/query/react-query-config.ts`**; провайдер **`QueryClientProvider`** в **`app/root-providers.tsx`** (`useState(createQueryClient)` для SSR).
3. **Prettier:** **`prettier`**, **`eslint-config-prettier`**; конфиг **`.prettierrc.json`**, **`.prettierignore`**; скрипты **`yarn format`** / **`yarn format:check`**; **`eslint-config-prettier`** подключён последним блоком в **`eslint.config.mjs`**; lint-staged запускает Prettier перед ESLint.

## Последствия

- [**ADR 0010**](./0010-formatting-policy-no-prettier.md) помечен как **частично замещённый** по пункту Prettier; актуальная политика форматирования — этот ADR + скрипты в `package.json`.
- Скрипт **`check-architecture-boundaries.mjs`**: импорты **`@features/*`** из **`shared/lib/`** разрешены (исключение из общего запрета для остального `shared/`); запрет **`@shared/lib/find*`** из feature-слайсов сохранён.
- **`check:static`** и **`ci:quality`** включают **`format:check`**.

## Проверка готовности

- `yarn format:check && yarn lint && yarn typecheck && yarn test && yarn check:architecture --all && yarn build`.
