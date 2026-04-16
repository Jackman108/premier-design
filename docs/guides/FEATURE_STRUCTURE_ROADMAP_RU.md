# Feature Structure Roadmap (RU)

## Цель
Привести все модули `features/*` к единому шаблону:
- `ui/`
- `hooks/`
- `interface/`
- `utils/`
- `__tests__/` (по мере критичности сценария)

## Текущий механизм контроля
- Скрипт: `premier-design/scripts/check-feature-structure.mjs`
- Команда: `yarn check:feature-structure`
- Интеграция: CI + `lint-staged`

## Принцип внедрения
1. Не ломать существующие фичи массовым переносом за один PR.
2. Мигрировать поэтапно:
   - сначала новые и активно изменяемые фичи,
   - затем legacy-модули.
3. Для legacy использовать временный allowlist с задачей на снятие.

## Критерий завершения
- `check-feature-structure` проходит без allowlist-исключений.
- Новые PR не добавляют модулей вне шаблона.
