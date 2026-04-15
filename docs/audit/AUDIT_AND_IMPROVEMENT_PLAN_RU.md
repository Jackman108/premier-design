# Аудит Premier Design — открытый бэклог

Индекс: [`docs/README.md`](../README.md) · ADR: [`docs/adr/`](../adr/README.md)

**Сделано** фиксируется в [`premier-design/CHANGELOG.md`](../../premier-design/CHANGELOG.md) и в git.

---

## P1

**Открытых задач уровня P1 нет** (закрыто: B-4, D-1, E-1, F-1 — см. CHANGELOG [Unreleased]). В [Unreleased] также: **D-2**, **D-4**, **D-5**, **F-2**/**F-4** (закрыто: карточки, формы, модалки, глобальный слайдер, чат-бот, лоадер), **E-2** (≥8 хуков с тестами), **E-3** (≥5 компонентов с RTL), **E-4** (`statements` ≥ 60%), **G-2** (CSP в `next.config.js`), предупреждение Next по `scroll-behavior` на `<html>`.

---

## P2 — по мере итераций

| ID | Задача | Следующий шаг | Критерий готовности |
|----|--------|---------------|---------------------|
| **E-2** | Hook-тесты | По желанию: `useCalculatorHandlers`, `useExamplesLogic`, `useResizeEffects`, `useNews` и др. | Базовый порог **≥ 8 хуков** достигнут (см. CHANGELOG) |
| **F-2r** | Регресс токенов | Скрипт `npm run check:regressions` + `lint-staged` для CSS | Автопроверка включена; raw hex вне **`tokens.css`** блокируются (без legacy-исключений) |
| **F-4r** | Регресс a11y | Скрипт `npm run check:regressions` + `lint-staged` для CSS | Автопроверка включена; `:hover` без `:focus-visible/:focus-within` блокируются (без legacy-исключений) |

---

## Ориентир по спринтам

| Спринт | Открыто сейчас |
|--------|----------------|
| Sprint 7 (perf) | bundle-анализ (`yarn analyze`), дальнейший code-splitting |
| Sprint 8 (тесты + полировка + безопасность) | Опционально **E-2**; регресс-контроль **F-2r**/**F-4r** |

---

## Definition of Done

- `yarn lint`, typecheck (`tsc` / `next build`), `yarn test --watch=false` — зелёные.
- При изменении UI-примитивов / Storybook: `yarn build-storybook`.
- При смене зависимостей: `yarn sync:npm-lock` и коммит `package-lock.json` вместе с `yarn.lock`; критичные находки `npm audit` не замалчивать без записи в задачу/док.
- Публичные URL и контракты API не ломать без явного решения продукта.
