# Веб-архитектура: слои и границы зависимостей

Нормы для приложений на **React + Next.js** с упором на сопровождаемость и тестируемость.

## Направление зависимостей

- Зависимости направлены **внутрь**: от инфраструктуры и UI к прикладному ядру.
- Слой **`features/`**, **`services/`**, доменные use-case **не** импортирует страницы приложения, layout-монолиты и «общие компоненты-кухню» без явной необходимости.
- **UI — тонкий слой:** разметка, стили, события; бизнес-правила и вызовы внешних API — в хуках/use-case/адаптерах, а не в JSX «на сдачу».

## Модули фичи

Рекомендуемое разбиение (имена могут совпадать с регламентом репозитория):

- `ui/` — только представление.
- `hooks/` — состояние и связь UI с use-case.
- `useCases/` или `application/` — оркестрация сценариев.
- `interface/`, `types/` — контракты.
- `utils/` — чистые функции без побочных эффектов.

**Антипаттерн:** один файл на 800 строк, смешивающий fetch, валидацию и разметку.

## Next.js: где живает логика

- **Server Components / SSR / SSG / ISR** — осознанный выбор под SEO и свежесть данных; не тянуть тяжёлые клиентские библиотеки в серверный бандл без нужды.
- **Клиентские границы** — `use client` только там, где нужны браузерные API или интерактив; остальное оставлять на сервере по возможности.
- **API Routes / Route Handlers** — валидация входа, коды HTTP, лимиты; дублирование доменной логики из use-case избегать: общая валидация и правила — в одном месте.

## Циклические импорты

Запрещены. При конфликте — вынести общее в **`shared/`** или узкий util с однозначным именем, а не «протянуть тип через any».

## Критерии готовности (Definition of Done)

- Новый код не нарушает правило зависимостей (линтер границ, если настроен).
- Публичные функции и API — с явными типами TypeScript.
- Нет скрытых глобальных синглтонов для бизнес-состояния без обоснования.

## Связанные правила (чистая архитектура и код)

- Сценарии и порты: [`08-clean-architecture-use-cases-and-ports-ru.md`](08-clean-architecture-use-cases-and-ports-ru.md).
- SOLID / DRY / KISS / YAGNI: [`09-clean-code-solid-dry-kiss-yagni-ru.md`](09-clean-code-solid-dry-kiss-yagni-ru.md).
- Ошибки и надёжность: [`10-errors-and-reliability-ru.md`](10-errors-and-reliability-ru.md).
- Типы и валидация: [`11-typing-and-validation-ru.md`](11-typing-and-validation-ru.md).
- Рефакторинг и долг: [`12-refactoring-and-technical-debt-ru.md`](12-refactoring-and-technical-debt-ru.md).

## Репозиторий Premier Design (жёсткие инварианты, merge)

Ниже — **проектные** правила поверх общих норм выше. Нарушение блокирует merge (контроль скриптами и CI).

1. **Направление зависимостей.** Слой `shared/` **не** импортирует `@features/*` и `@services/*`. Доменные типы — **только** в **`entities/`** (`@entities/*`); `shared` может импортировать из `entities` лишь как **зависимости полей** составных DTO (без параллельного определения тех же сущностей) — PD-R-05; `entities` **не** импортирует `shared`. Композиция нескольких фич — только в `widgets/` или в `pages/` / `app/`, не через cross-import между `features/<a>` и `features/<b>`. Контроль: `yarn check:architecture`.
2. **UI — тонкий слой.** В `*/ui/*` запрещены бизнес-правила, **реализация** хуков, объявление типов (кроме локальных props компонента), вызовы внешних API/IO и инфраструктуры. Сопутствующее — в `hooks/`, `interface/` (или `types/`), `utils/`, валидаторы в `shared/validates/`, обвязка Next.js в `lib/` (`@lib/*`). Контроль: `yarn check:ui-purity`. Подробности: [`02-web-ui-components-and-tokens-ru.md`](02-web-ui-components-and-tokens-ru.md).
3. **Use-case оркестрирует.** Сценарий не знает про HTTP/JSON; внешние зависимости — за портами. См. [`08-clean-architecture-use-cases-and-ports-ru.md`](08-clean-architecture-use-cases-and-ports-ru.md).
4. **Циклические импорты** запрещены; при риске — вынос в `shared/` или узкий util.
5. **Типизация на границах** и **ввод** — см. [`11-typing-and-validation-ru.md`](11-typing-and-validation-ru.md); публичные API — явные сигнатуры TS; `any` без обоснования и плана замены — не допускается.
6. **Безопасность** — см. [`05-web-security-and-data-ru.md`](05-web-security-and-data-ru.md).
7. **Только Yarn.** Lock — `premier-design/yarn.lock`; `package-lock.json` в git не ведём. См. [`../../guides/yarn-package-manager-ru.md`](../../guides/yarn-package-manager-ru.md).
8. **Структура фичи** — обязательны каталоги `ui/` и `interface/` (или `types/`), публичный баррель `features/<slice>/index.ts`, импорт снаружи через `@features/<slice>`. Контроль: `yarn check:feature-structure`. Нейминг и слои: [`../../guides/code-structure-and-naming-ru.md`](../../guides/code-structure-and-naming-ru.md).
