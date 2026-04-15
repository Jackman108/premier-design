# Аудит Premier Design — открытый бэклог

Индекс: [`docs/README.md`](../README.md) · ADR: [`docs/adr/`](../adr/README.md)

**Сделано ранее** фиксируется в [`premier-design/CHANGELOG.md`](../../premier-design/CHANGELOG.md) и в истории git; здесь только **незакрытые** задачи (ID сохранены для ссылок в PR и обсуждениях).

---

## P1 — следующими

| ID | Задача | Следующий шаг | Критерий готовности |
|----|--------|---------------|---------------------|
| **B-4** | Каталог `interface/` → `types/` | `git mv interface types`; новый алиас в `tsconfig.paths.json` (**не** `@types/*`); замена импортов; `yarn lint && yarn build` | Каталог `types/`, сборка без регрессий |
| **D-1** | Docker / prod: `output: 'standalone'` | `next.config.js` + `Dockerfile.prod`: `.next/standalone`, `public`, `.next/static`; `docker build` | Образ существенно меньше полного `node_modules` |
| **E-1** | Unit-тесты `utils/` | Покрыть в первую очередь: `findService`, `findRelatedService`, `findItemByTitle`, `getFullCanonicalUrl`, `formatText`, `generateStructuredData` | Jest зелёный; ≥ 6 из 8 файлов по плану покрытия |
| **F-1** *(остаток)* | `FeedbackForm` на примитивах | Имя / email / кнопка уже на `UiInput` / `UiButton`; добить телефон (`PatternFormat`), `textarea`, чекбокс (обёртки или новые примитивы) | Форма на токенах; текущий RTL-тест зелёный |

---

## P2 — по мере итераций

| ID | Задача | Следующий шаг | Критерий готовности |
|----|--------|---------------|---------------------|
| **D-2** | `blurDataURL` в `ServiceDetail` | Tiny placeholder или `placeholder="empty"` для `next/image` | Нет лишней передачи полного URL как blur |
| **D-4** | Тяжёлые слайдеры | `dynamic(..., { ssr: false })` для участков с `react-multi-carousel` / `keen-slider` | Ощутимое снижение First Load JS |
| **E-2** | Hook-тесты | Расширить: `usePageData`, `useLayoutProps`, `useChatMessages`, `useCalculatorHandlers`, `useScrollToElement`, `useThemeToggle` и др. | ≥ 8 хуков с тестами (от текущих 2) |
| **E-3** | Component-тесты | `MenuButton`, `CustomHead`, `OrderButton`, `CookiesBanner`, `UiButton` и др. | ≥ 5 компонентов с RTL |
| **E-4** | Покрытие statements | После E-1–E-3 | `yarn test:coverage` ≥ 60% |
| **F-2** | Цвета: токены вместо legacy | При правке файла: hex / `--brown` → токены из `styles/tokens.css` | Постепенно; мало legacy на файл |
| **F-4** | Карточки: hover / focus | Токены: `transition`, тень, `:hover` / `:focus-visible` в ключевых Card-модулях | Предсказуемый hover и кольцо фокуса |
| **G-2** | CSP | Базовый `Content-Security-Policy` в `next.config.js` headers; при необходимости nonce для inline | Заголовок CSP на ответах приложения |

---

## Ориентир по спринтам (только открытые ID)

| Спринт (из плана) | Открыто сейчас |
|-------------------|----------------|
| Sprint 7 (perf + структура) | **B-4**, **D-1**, **D-2**, **D-4** |
| Sprint 8 (тесты + полировка + безопасность) | **E-1**–**E-4**, **F-2**, **F-4**, **G-2** |
| Вне жёсткой границы спринта | **F-1** (остаток формы) — можно добить в любом ближайшем релизе |

---

## Definition of Done

- `yarn lint`, typecheck (`tsc` / `next build`), `yarn test --watch=false` — зелёные.
- При изменении UI-примитивов / Storybook: `yarn build-storybook`.
- При смене зависимостей: `yarn sync:npm-lock` и коммит `package-lock.json` вместе с `yarn.lock`; критичные находки `npm audit` не замалчивать без записи в задачу/док.
- Публичные URL и контракты API не ломать без явного решения продукта.
