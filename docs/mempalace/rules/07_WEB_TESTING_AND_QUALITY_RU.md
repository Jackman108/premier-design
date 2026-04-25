# Тестирование и качество фронтенда

Пирамида тестов для **предсказуемых релизов** без «всё только e2e».

## Уровни

- **Unit** — чистые функции, утилиты, мапперы данных, разбор валидации.
- **Интеграционные** — компонент + хук + мок порта (без реальной сети), критичные API-роуты с моками БД/почты.
- **E2E smoke** — короткий набор сценариев: главная, ключевая форма, критический путь оплаты/заявки — по необходимости бизнеса.

## Что обязательно покрывать тестами

- Публичные **API-контракты** (статус, форма ошибок).
- **Формы** с валидацией и отправкой (хотя бы один happy path + типовая ошибка).
- Регрессии, которые уже ломались в проде — **зафиксировать тестом** с комментарием со ссылкой на issue.

## Что не гонять в e2e без нужды

- Каждую мелкую вариацию стиля — это визуальные/regression тесты или Storybook, если принято.

## Качество кода

- Линтер и типы — **без ошибок** в CI на защищённых ветках.
- Запрет **`any`** без комментария «почему» и плана замены (если политика проекта это требует).

## Критерии готовности

- Новая критичная функциональность имеет тест или явное обоснование в PR.
- Время прогона CI вменяемо: unit быстрые, e2e — параллельно и кешируемо.

## Размещение unit-тестов хуков (FSD)

- Файл теста живёт в **`hooks/__tests__/` того же слайса**, что и хук: например `shared/hooks/__tests__/usePageData.test.ts`, `widgets/layout/hooks/__tests__/useThemeToggle.test.ts`, `features/coasting/hooks/__tests__/useCostingCardLogic.test.ts`.
- Корневого каталога `premier-design/hooks/` в репозитории нет; путь-алиас `@hooks/*` не используется.

## Моки хуков с полным контрактом

- Если тест `jest.mock('@shared/hooks/…')` подменяет хук целиком через `mockReturnValue`, набор полей **должен совпадать** с публичным return реального хука, иначе падает типизация в TS и/или сценарий в рантайме. Пример: `useScrollToElement` возвращает `{ scrollToElement, scrollToRef }` — в мок передавать **оба** (реф — `createRef<HTMLDivElement | null>()`), см. `premier-design/features/news/hooks/__tests__/useNews.test.ts`.
- Аналогично для хуков, расширяемых в будущем: при добавлении поля в return — обновлять тесты-моки.

## Подмена `process.env` в Jest

- **Не** переназначать `process.env` целиком без необходимости; TypeScript в `@types/node` может пометить `process.env.NODE_ENV` как `read-only`. Присваивать через `(process.env as Record<string, string | undefined>)` или общий хелпер `assignTestEnv` (см. `features/feedback/useCases/__tests__/submitFeedback.test.ts`).
- В `finally` восстанавливать значение или `delete` для опциональных ключей.

## Нативный `<dialog>` в jsdom

- В **`premier-design/jest.setup.ts`** полифилл `HTMLDialogElement.prototype.showModal` / `close` выполняется **только если** в глобальной среде есть `HTMLDialogElement` (jsdom); в среде **`node`** без DOM setup не выполняется — иначе падают чистые unit-тесты.

## Связь с чистым кодом и архитектурой

- Сценарии и тестируемость портов: [`08_CLEAN_ARCHITECTURE_USE_CASES_AND_PORTS_RU.md`](08_CLEAN_ARCHITECTURE_USE_CASES_AND_PORTS_RU.md).
- Качество кода и YAGNI: [`09_CLEAN_CODE_SOLID_DRY_KISS_YAGNI_RU.md`](09_CLEAN_CODE_SOLID_DRY_KISS_YAGNI_RU.md).
- Долг и сфокусированные PR: [`12_REFACTORING_AND_TECHNICAL_DEBT_RU.md`](12_REFACTORING_AND_TECHNICAL_DEBT_RU.md).
