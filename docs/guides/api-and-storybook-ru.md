# API и Storybook: контракт команды

## Цель

Синхронизировать backend-контракты и UI-документацию, чтобы изменения были предсказуемыми и проверяемыми.

## API контракт (минимум)

- Для каждого публичного endpoint фиксируем метод, `content-type`, коды ответов и валидацию.
- Валидация выполняется через `zod` до бизнес-логики.
- Для ожидаемых ошибок используем явные статусы (`400`, `405`, `415`, `429`), для неожиданных — безопасный `500` без утечки стека.
- Rate limit обязателен для публичных форм.
- Изменения контрактов покрываются тестами в `tests/api/*`.

## Storybook контракт (минимум)

- Каждый новый UI-примитив в `shared/ui/primitives/*` получает story с `autodocs`.
- Для интерактивных примитивов добавляем сценарии:
    - базовый;
    - состояние варианта/размера;
    - a11y- или API-сценарий (например polymorphic `as`).
- Для headless-компонентов добавляем story, показывающий внешний контроль состояний и стили токенами.

## Что проверять перед merge

1. `yarn test` (включая `tests/api/*`).
2. `yarn storybook` или `yarn build-storybook` для визуальной валидации.
3. `yarn lint` и `yarn build`.

## Связанные файлы

- API feedback: `pages/api/feedback.ts`
- Server Action feedback: `features/feedback/useCases/submitFeedbackAction.ts`
- Storybook primitives: `shared/ui/primitives/*.stories.tsx`
