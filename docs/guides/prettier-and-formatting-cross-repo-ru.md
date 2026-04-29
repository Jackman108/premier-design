# Форматирование и Prettier: кросс-репо с Feb Code

**Обновлено**: 29.04.2026

## Решение для этого репозитория (Premier Design)

Канон — [**ADR 0010**](../adr/0010-formatting-policy-no-prettier.md): **Prettier не используем**; форматирование и стиль кода — через **ESLint** (`yarn lint` / `yarn lint:fix`) и ревью.

Проверка из ADR: в `premier-design/package.json` **нет** скриптов `format` / `format:check` на базе Prettier.

## Решение в репозитории Feb Code

В **Feb Code** принят другой контур: в `package.json` есть **`prettier`**, скрипты вроде `format`, в pre-commit — **`prettier --check`** по staged-файлам (подробности — в том репозитории: `package.json`, `lint-staged`, `docs/changelog.md`).

Это **не противоречие**, а осознанное различие между проектами; матрица унификации в [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md) закрывается формулировкой «одна политика **на репозиторий**».

## Как работать при правках в обоих репо

| Действие | Premier Design | Feb Code |
|----------|----------------|----------|
| Перед коммитом | `yarn lint:fix` (и проход lint-staged) | `yarn format` / сценарий из их Husky |
| В IDE | правила ESLint проекта | Prettier + их ESLint, как настроено там |
| CI | `yarn lint` в `ci.yml` | смотреть их workflow |

Не копировать конфиг Prettier из Feb Code в Premier **без нового ADR** и плана миграции (см. последствия в ADR 0010).

## Связанные документы

- [ADR 0010: без Prettier](../adr/0010-formatting-policy-no-prettier.md)
- [`guides/scripts-and-quality-gates-ru.md`](scripts-and-quality-gates-ru.md)
- [`audit/cross-repo-alignment-ru.md`](../audit/cross-repo-alignment-ru.md)
