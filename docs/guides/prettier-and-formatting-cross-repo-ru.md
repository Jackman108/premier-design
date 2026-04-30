# Форматирование и Prettier: кросс-репо с Feb Code

**Обновлено**: 29.04.2026

## Решение для этого репозитория (Premier Design)

Канон — [**ADR 0013**](../adr/0013-shared-lib-react-query-prettier.md): **Prettier** + **`eslint-config-prettier`**; проверки **`yarn format`** / **`yarn format:check`**; стиль и отсутствие конфликтов с ESLint — см. **`.prettierrc.json`** и последний блок в **`eslint.config.mjs`**.

Исторический контекст отказа только от Prettier — [**ADR 0010**](../adr/0010-formatting-policy-no-prettier.md) (частично замещён по форматированию).

## Решение в репозитории Feb Code

В **Feb Code** свой контур Prettier + ESLint (см. их `package.json`, `lint-staged`). Принцип тот же: одна политика **на репозиторий**; матрица — [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md).

## Как работать при правках в обоих репо

| Действие | Premier Design | Feb Code |
|----------|----------------|----------|
| Перед коммитом | `yarn format:check`, `yarn lint:fix` (lint-staged: Prettier → ESLint) | их Husky / `yarn format` по докам репо |
| CI | `format:check` в составе `check:static` при необходимости | смотреть их workflow |

## Связанные документы

- [ADR 0013: Prettier и tooling](../adr/0013-shared-lib-react-query-prettier.md)
- [ADR 0010 (история)](../adr/0010-formatting-policy-no-prettier.md)
- [`guides/scripts-and-quality-gates-ru.md`](scripts-and-quality-gates-ru.md)
