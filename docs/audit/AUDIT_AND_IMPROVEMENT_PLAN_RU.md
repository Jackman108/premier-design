# Аудит Premier Design — открытый бэклог

Индекс: [`docs/README.md`](../README.md) · ADR: [`docs/adr/`](../adr/README.md)

**Сделано** фиксируется в [`premier-design/CHANGELOG.md`](../../premier-design/CHANGELOG.md) и в git.

---

## P1

**Открытых задач уровня P1 нет** (закрыто: B-4, D-1, E-1, F-1 — см. CHANGELOG [Unreleased]). В [Unreleased] также: **D-2**, **D-4**, **D-5**, **F-2**/**F-4** (закрыто: карточки, формы, модалки, глобальный слайдер, чат-бот, лоадер), **E-2** (≥8 хуков с тестами), предупреждение Next по `scroll-behavior` на `<html>`.

---

## P2 — по мере итераций

| ID | Задача | Следующий шаг | Критерий готовности |
|----|--------|---------------|---------------------|
| **E-2** | Hook-тесты | По желанию: `useCalculatorHandlers`, `useExamplesLogic`, `useResizeEffects`, `useNews` и др. | Базовый порог **≥ 8 хуков** достигнут (см. CHANGELOG) |
| **E-3** | Component-тесты | `MenuButton`, `CustomHead`, `OrderButton`, `CookiesBanner`, `UiButton` и др. | ≥ 5 компонентов с RTL |
| **E-4** | Покрытие statements | После E-1–E-3 | `yarn test:coverage` ≥ 60% |
| **F-2r** | Регресс токенов | Новые `*.module.css` / инлайн-стили: без «сырого» hex вне **`tokens.css`** | Контроль при ревью |
| **F-4r** | Регресс a11y | Новые кнопки/ссылки: **`:focus-visible`** по гайду существующих блоков | Контроль при ревью |
| **G-2** | CSP | Базовый `Content-Security-Policy` в `next.config.js` headers; при необходимости nonce для inline | Заголовок CSP на ответах приложения |

---

## Ориентир по спринтам

| Спринт | Открыто сейчас |
|--------|----------------|
| Sprint 7 (perf) | bundle-анализ (`yarn analyze`), дальнейший code-splitting |
| Sprint 8 (тесты + полировка + безопасность) | **E-3**, **E-4**, **G-2**; опционально **E-2**; регресс-контроль **F-2r**/**F-4r** |

---

## Definition of Done

- `yarn lint`, typecheck (`tsc` / `next build`), `yarn test --watch=false` — зелёные.
- При изменении UI-примитивов / Storybook: `yarn build-storybook`.
- При смене зависимостей: `yarn sync:npm-lock` и коммит `package-lock.json` вместе с `yarn.lock`; критичные находки `npm audit` не замалчивать без записи в задачу/док.
- Публичные URL и контракты API не ломать без явного решения продукта.
