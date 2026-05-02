## Что сделано

<!-- Кратко: проблема / задача и суть изменений. -->

## Чеклист

- [ ] Локально: из **корня** репозитория (рядом с `package.json`) — **`yarn check:static`** (или **`yarn ci:quality`**, если затронуты границы/сборка — то же имя, что в **febcode**).
- [ ] Документация: при смене CI, скриптов, env или публичных контрактов — запись в [`docs/changelog.md`](../docs/changelog.md) (`[Unreleased]`); при необходимости — [`docs/audit/quality-gates-sync-ru.md`](../docs/audit/quality-gates-sync-ru.md).
- [ ] Кросс-репо: правки [`cross-repo-rule-pack-ru.md`](../docs/guides/cross-repo-rule-pack-ru.md) — §1–§5 **идентично** в **febcode**; в **lendings-vps-infra** обновить §2–§5 и §1-указатель (шапка файла).

## Связанные материалы

<!-- Issue, ADR, пункт аудита — при наличии. -->
