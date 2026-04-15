# Аудит и план развития проекта Premier Design (v2)

Индекс документации: [`docs/README.md`](../README.md) | ADR: [`docs/adr/`](../adr/README.md)

> Спринты 1–4 **закрыты** и вынесены в архив (git history). Ниже — только **нерешённые** задачи, сгруппированные по направлениям. Каждая задача имеет шаги, критерий готовности и приоритет.

---

## A. Зависимости и инструменты

| ID | Задача | Текущее | Целевое | Приоритет | Шаги | Критерий готовности |
|---|---|---|---|---|---|---|
| A-1 | Обновить Next.js | 15.x | **16.2.x** (done) | P0 | 1) `yarn add next@^16 eslint-config-next@^16 @next/bundle-analyzer@^16` 2) Flat ESLint: `eslint-config-next/core-web-vitals` без FlatCompat 3) `yarn lint && yarn test && yarn build` 4) E2E smoke | CI: lint + test; локально после чистого `yarn install` — `yarn build` |
| A-2 | Обновить TypeScript | 5.9 | 6.x | P1 | 1) `npm i -D typescript@latest` 2) Исправить новые strict-ошибки 3) `npm run build` | Сборка без TS-ошибок |
| A-3 | Выровнять Jest / jsdom | jest 29 + jsdom 30 | jest 30 + jsdom 30 | P1 | 1) `npm i -D jest@latest @types/jest@latest ts-jest@latest` 2) Проверить совместимость с ESM-пресетом 3) `npm test` | Все 15 suites зелёные |
| A-4 | Убрать `@types/next` | @types/next 8.x | удалить | P0 | 1) `npm uninstall @types/next` 2) `npm run build` | Сборка ок; пакет отсутствует |
| A-5 | Убрать `@types/webpack-env` | в devDeps | удалить (не нужен Next 15+) | P2 | 1) `npm uninstall @types/webpack-env` 2) Если typecheck падает — вернуть | Сборка ок |
| A-6 | Обновить sharp | 0.33 | 0.34 | P2 | 1) `npm i sharp@latest` 2) `npm run build` | Сборка + images работают |
| A-7 | Обновить dotenv | 16 | 17 | P2 | 1) `npm i dotenv@latest` 2) Проверить env-переменные | Feedback API работает |
| A-8 | Обновить pg-promise | 11 | 12 | P2 | 1) `npm i pg-promise@latest` 2) Проверить подключение к БД | Нет ошибок |
| A-9 | Перенести `@types/pg` в devDeps | dependencies | devDependencies | P2 | `npm i -D @types/pg && npm uninstall @types/pg` | `npm ls @types/pg` в devDeps |
| A-10 | Зафиксировать lock-файл | после обновлений | — | P0 | `npm i --package-lock-only && npm audit --omit=dev` | 0 high/critical |

---

## B. Архитектура и структура проекта

| ID | Задача | Проблема | Приоритет | Шаги | Критерий готовности |
|---|---|---|---|---|---|
| B-1 | Вынести `dataProvider` из `pages/api/` | **Сделано:** `lib/getStaticData.ts`, алиас `@lib/*`; `/api/dataProvider` не создаётся | P0 | — | Роут `/api/dataProvider` отсутствует |
| B-2 | Устранить дубликат `getServiceIdFromCanonical` | **Снято:** в коде используется общий `getCanonicalPath` (`findService` / `findRelatedService`) | P1 | — | Дубликата функции нет |
| B-3 | Убрать cross-layer import `getNewsStyles` | **Снято:** `features/news/utils/getNewsStyles.ts`, импорт только из `News.tsx` | P2 | — | Нет импорта из `widgets` |
| B-4 | Переименовать `interface/` → `types/` | Имя совпадает с TS-ключевым словом, сбивает инструменты | P2 | 1) `git mv interface types` 2) Bulk-замена импортов 3) `npm run lint && npm run build` | Каталог `types/`, сборка ок |
| B-5 | Переименовать `DocumetPage.module.css` | **Сделано:** `document-page/DocumentPage.module.css` | P2 | — | Нет опечатки |

---

## C. Качество и читаемость кода

| ID | Задача | Проблема | Приоритет | Шаги | Критерий готовности |
|---|---|---|---|---|---|
| C-1 | Добавить `<label>` к полям `FeedbackForm` | Placeholder ≠ label; экранные читалки не озвучат | P0 | 1) Добавить `<label htmlFor>` или использовать `UiInput` (уже с label) 2) `aria-label` на select стран | Lighthouse a11y ≥ 90 |
| C-2 | `MenuButton` → `<button>` с ARIA | `<div onClick>` без клавиатуры и роли | P0 | 1) Заменить `<div>` на `<button type="button">` 2) Добавить `aria-expanded`, `aria-controls`, `aria-label` | Фокус Tab, Enter/Space открывает меню |
| C-3 | `FeedbackModal` → `role="dialog"` | Нет `aria-modal`, `aria-labelledby` | P1 | 1) Добавить `role="dialog"` + `aria-modal="true"` + `aria-labelledby` на заголовок | Модалка объявляется screen reader |
| C-4 | `useChatMessages` — `try/catch` на `JSON.parse` | Коррупция `localStorage` → uncaught | P1 | Обернуть в try/catch с fallback `[]` | Не крашит при битом storage |
| C-5 | `fileService` — обработка ошибок I/O | `readFileSync`/`writeFileSync` без try/catch | P1 | Обернуть; при ошибке логировать и возвращать fallback | Сервис не роняет process |
| C-6 | Таймауты на `emailService` / `telegramService` | Нет ограничения; зависание внешнего API блокирует ответ | P1 | 1) `nodemailer` — `connectionTimeout` / `greetingTimeout` 2) `axios` — `timeout: 10_000` | Тест: мок с задержкой не зависает |
| C-7 | Абсолютные OG/Twitter image URL | `/logo.png` — относительный; кроулеры могут не распознать | P1 | Использовать `getFullCanonicalUrl` + `/logo.png` для `og:image` и `twitter:image` | `og:image` начинается с `https://` |
| C-8 | JSON-LD `logo` — абсолютный URL | `"logo": "/logo.png"` | P2 | Аналогично C-7 | Валидный по schema.org |
| C-9 | `sitemap.ts` — не leak `error.message` | 500 с `details: error.message` | P2 | Убрать `details`; залогировать внутренне | 500 без деталей |
| C-10 | Удалить `server.js` или пометить deprecated | **Сделано:** комментарий DEPRECATED в `server.js` | P2 | При желании удалить файл и `scripts.server` | Явная пометка |
| C-11 | Убрать no-op rewrites в `next.config.js` | **Сделано:** остались sitemap и `/documents/*` | P2 | — | Меньше конфига |

---

## D. Производительность

| ID | Задача | Проблема | Приоритет | Шаги | Критерий готовности |
|---|---|---|---|---|---|
| D-1 | `output: 'standalone'` в Docker-prod | Сейчас копируется весь `node_modules` (~700MB) | P1 | 1) Добавить `output: 'standalone'` в `next.config.js` 2) Обновить `Dockerfile.prod`: копировать `.next/standalone` + `public` + `.next/static` 3) `docker build` | Образ < 300MB |
| D-2 | `blurDataURL` в `ServiceDetail` | Передаётся полный URL изображения вместо маленького base64 | P2 | Сгенерировать tiny placeholder или использовать `placeholder="empty"` | Нет лишних запросов |
| D-3 | Убрать `httpEquiv` cache из `_document.tsx` | `Expires: "31536000"` — не валидная HTTP-date; кэширование уже через `next.config.js` headers | P2 | Удалить мета-теги `Expires`, `Pragma`, `Cache-Control` из `<Head>` | Чистый `_document` |
| D-4 | Lazy-load тяжёлых слайдеров | `react-multi-carousel` и `keen-slider` загружаются сразу | P2 | `dynamic(() => import(...), { ssr: false })` для компонентов, использующих эти библиотеки | Снижение First Load JS на ≥ 5 KB |

---

## E. Тестовое покрытие

| ID | Задача | Текущее | Целевое | Приоритет | Шаги | Критерий готовности |
|---|---|---|---|---|---|---|
| E-1 | Unit-тесты `utils/` | 0 из 8 файлов | ≥ 6 | P1 | Тесты для `findService`, `findRelatedService`, `findItemByTitle`, `getFullCanonicalUrl`, `formatText`, `generateStructuredData` | Jest зелёные |
| E-2 | Hook-тесты | 2 из 18 | ≥ 8 | P2 | `usePageData`, `useLayoutProps`, `useChatMessages`, `useCalculatorHandlers`, `useScrollToElement`, `useThemeToggle` | Jest зелёные |
| E-3 | Component-тесты | 1 (FeedbackForm) | ≥ 5 | P2 | `MenuButton`, `CustomHead` (meta-рендер), `OrderButton`, `CookiesBanner`, `UiButton` | RTL + jest |
| E-4 | Глобальное покрытие ≥ 60% stmts | ~37% | 60% | P2 | Итеративно после E-1..E-3 | `npm run test:coverage` ≥ 60% |

---

## F. Дизайн и UI

| ID | Задача | Проблема | Приоритет | Шаги | Критерий готовности |
|---|---|---|---|---|---|
| F-1 | Перевести `FeedbackForm` на `UiInput` / `UiButton` | Форма использует raw `<input>` без label-системы | P1 | 1) Заменить поля на `<UiInput label="…">` 2) Кнопку на `<UiButton>` 3) Проверить тест | Форма визуально на токенах; a11y labels |
| F-2 | Единообразие цветов: токены вместо hex | ~40+ CSS-модулей ссылаются на legacy hex / legacy var-имена | P2 | При касании файла — заменять `--brown` → `--color-text`, hex → var(--…) | Постепенно; ≤ 5 legacy hex на файл |
| F-3 | Современный шрифт + `next/font` | `font-family: 'Public Sans'` через CSS — нет оптимизации шрифтов | P1 | 1) `import { Public_Sans } from 'next/font/google'` в `_app.tsx` 2) CSS-variable 3) Убрать внешний CDN-запрос (если есть) | Нет CLS от шрифта; нет внешнего запроса |
| F-4 | Современный hover / focus / transition для карточек | Статичные карточки без визуального отклика | P2 | Добавить `transition`, `box-shadow`, `:hover` / `:focus-visible` в ключевые Card-модули через токены | Плавный hover; focus ring |

---

## G. Безопасность

| ID | Задача | Проблема | Приоритет | Шаги | Критерий готовности |
|---|---|---|---|---|---|
| G-1 | `npm audit` после обновлений (A-*) | Новые зависимости могут принести уязвимости | P0 | `npm audit --omit=dev` | 0 high/critical |
| G-2 | CSP-header (Content-Security-Policy) | Нет CSP; XSS-вектор через inline-стили/скрипты | P2 | Добавить базовый CSP в `next.config.js` headers; nonce для inline-скриптов если нужно | Заголовок `Content-Security-Policy` присутствует |

---

## Спринтовый план (Sprint 5+)

| Спринт | Цель | Задачи | KPI |
|---|---|---|---|
| Sprint 5 | Обновление зависимостей + архитектурная гигиена | A-1..A-10, B-1, B-2, B-3, B-5, C-10, C-11 | `npm outdated` — 0 major; `npm audit --omit=dev` — 0 high/critical; нет `/api/dataProvider` роута |
| Sprint 6 | Доступность + читаемость + SEO | C-1..C-9, F-1, F-3 | Lighthouse a11y ≥ 90; `og:image` абсолютный; формы с labels |
| Sprint 7 | Производительность + Docker | D-1..D-4, B-4 | Standalone Docker образ < 300MB; First Load JS снижен |
| Sprint 8 | Покрытие + дизайн-полировка | E-1..E-4, F-2, F-4, G-2 | Coverage ≥ 60% stmts; CSP header |

---

## Definition of Done (любая задача)

- Линт, typecheck, `npm run build` проходят локально.
- `npm test -- --watch=false` зелёные (15+ suites).
- `npm run build-storybook` — если затронуты UI-примитивы.
- `npm audit --omit=dev` — 0 high/critical.
- Документация обновлена при изменении поведения / команд.
- Нет регрессий публичных URL и ключевых сценариев.
