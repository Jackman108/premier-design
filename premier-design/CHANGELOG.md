# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/),
версии по [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added

- ADR `docs/adr/0001-ui-stack-and-design-tokens.md`: UI-стек (CSS Modules + токены), путь к опциональной миграции на HeroUI/NextUI.
- Слой токенов `styles/tokens.css` и базовые примитивы `shared/ui/primitives/` (UiButton, UiInput, UiSurface, UiTextarea, UiCheckbox) со stories в Storybook.
- Storybook 10 (`yarn storybook`, `yarn build-storybook`).
- Скрипт `yarn analyze` — отчёт `@next/bundle-analyzer` при сборке.
- `CHANGELOG.md` и регламент версий в `README.md`.

### Changed

- **Sprint 11 (завершение):** закрыты `P-1`, `P-2`, `R-1`.
  `P-1`: в `next.config.js` включен React Compiler (`experimental.reactCompiler: true`) для production/dev сборок Next.js.
  `P-2`: усилен code splitting тяжелых UI-зависимостей — `CalculatorModal` загружается через `next/dynamic` в `CalculatorButton`, чат-движок `react-chatbot-kit` вынесен в отдельный lazy-runtime `ChatBotRuntime` (рендерится только при открытии чата).
  `R-1`: логика расчета калькулятора вынесена в чистые функции `shared/ui/calculator-modal/utils/calculateEstimate.ts`, хук `useCalculatorHandlers` упрощен и использует pure utils, добавлены unit-тесты `calculateEstimate.test.ts`.
- **Sprint 11 (аудит):** из `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md` удалены выполненные `P-1`, `P-2`, `R-1` и строка `Sprint 11`; в документе сохранены только нереализованные задачи.
- **Sprint 10 (завершение):** закрыты `A-1`, `S-1`, `S-2`, `S-4`.
  `A-1`: use-case `submitFeedback` переведен на DAL-абстракцию `services/dal/feedbackDal.ts`, внешние I/O вызовы вынесены за границу use-case.
  `S-1`: CSP-конфигурация в `next.config.js` действует в runtime c разделением policy по окружениям (dev/prod), заголовки безопасности применяются к страницам.
  `S-2`: добавлен server-side tainting слой `shared/lib/taintSecrets.ts`; секреты SMTP/Telegram маркируются в DAL (best-effort через React 19 taint APIs, без деградации runtime).
  `S-4`: сквозная валидация унифицирована на `zod`-схеме `shared/validates/feedbackSchema.ts`; клиентский `useFeedbackForm` использует ту же схему, что и `/api/feedback`.
- **Sprint 10 (аудит):** из `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md` удалены выполненные `A-1`, `S-1`, `S-2`, `S-4` и строка `Sprint 10`; в документе оставлены только нереализованные задачи.
- **Sprint 9 (завершение):** закрыты `U-4` и `U-2`.  
  `U-4`: в `FeedbackForm` добавлены связи ошибок с полями через `aria-errormessage` + `aria-invalid` для всех ключевых полей, в `CostInput` добавлены label/`aria-errormessage`/`role="alert"`, в `CalculatorModal` добавлен `aria-live="polite"` для блока динамического результата.  
  `U-2`: в критичных компонентах спринта (`CalculatorModal`, `CostInput`, `CollapsibleContainer`) заменены жесткие `vw/vh` на fluid-подход с `clamp()`/`min()` и относительными единицами.
- **Sprint 9 (аудит):** из открытого бэклога `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md` удалены выполненные `U-4` и `U-2`; в аудите оставлены только нереализованные задачи.
- Dev-fix CSP: в `next.config.js` `Content-Security-Policy` теперь учитывает окружение — для development добавлены `unsafe-eval` в `script-src` и `ws/wss/http` в `connect-src` для корректной работы `react-refresh`/HMR; production-политика не ослабляется.
- **D-4 (завершение):** закрыты `UI-AUD-7` и `UI-AUD-8` — для `CollapsibleContainer` вынесено поведение в `hooks/useCollapsibleContainer.ts`, для `Slider` вынесены `Arrow` в `ui/Arrow.tsx`, состояние/навигация в `hooks/useSliderState.ts`, типы стрелки в `interface/Slider.props.ts`.
- **D-4 (dead code):** закрыт `UI-AUD-10` — удален неиспользуемый закомментированный модуль `features/address/ui/YandexMap/*`.
- **D-4 (чистка проп-контракта):** закрыт `UI-AUD-4` — в `shared/ui/arrow-button/ArrowButton.tsx` удалены неиспользуемые поля и избыточный props-интерфейс.
- **D-4 (аудит):** после закрытия `UI-AUD-4/7/8/10` удалены остаточные пункты `D-4` и `UI-AUD-*` из открытого бэклога `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md` (в аудите оставлены только нереализованные задачи).
- **D-4 (продолжение):** закрыты `UI-AUD-2` и `UI-AUD-6` — для `ChatBotSidebar` вынесены props в `interface/ChatBotSidebar.props.ts` и оркестрация состояния в `hooks/useChatBotSidebar.ts`; для `FeedbackForm` вынесена форма-логика в `hooks/useFeedbackForm.ts`, добавлены типы `FeedbackForm.types.ts` и утилиты форматирования телефона `utils/phoneFormatting.ts`.
- **D-4 (аудит):** из таблицы `UI-AUD-*` в `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md` удалены выполненные пункты `UI-AUD-2` и `UI-AUD-6`; оставлены только нереализованные нарушения.
- **D-4 (частичное выполнение):** начат практический рефакторинг `ui`-слоя под новый стандарт структуры — вынесены типы из `DocumentImage` и `Papers` в `interface/*`, для `BackButton` вынесены `BackButtonProps` и навигация в `hooks/useBackNavigation`, в `Features` удален нецелевой `useMemo` и вынесен контракт `FeaturesProps`.
- **D-4 (аудит):** из таблицы `UI-AUD-*` удалены закрытые пункты `UI-AUD-1`, `UI-AUD-3`, `UI-AUD-5`, `UI-AUD-9`; в аудите оставлены только нереализованные нарушения.
- Запущен практический аудит `ui`-слоя на соответствие новым правилам: в `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md` добавлен пункт `D-4` и таблица нарушений `UI-AUD-*` (интерфейсы/утилитарная и бизнес-логика в `ui`, неконсистентные файлы, кандидаты на вынос в `hooks|interface|utils`).
- Добавлены и синхронизированы правила архитектурной дисциплины: в `.cursor/rules/agent-architecture-clean-code.mdc` зафиксированы границы слоя представления (`ui` без хуков/типов/утилит/бизнес-логики), единый нейминг и обязательный вынос переиспользуемого кода.
- Добавлен гайд `docs/guides/CODE_STRUCTURE_AND_NAMING_RU.md` (структура модулей, именование, правила выноса общего кода, чеклист соответствия); индекс документации `docs/README.md` обновлен.
- Аудит синхронизирован с правилом "только нереализованные задачи": выполненный пункт `D-1` удален из `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md`.
- **U-1 (верстка / a11y):** `CalculatorModal`, `FeedbackModal`, `PhotoViewer` переведены на нативный `<dialog>` с `::backdrop`, нативным `Escape` (`onCancel`) и закрытием по клику вне контента; обновлены CSS-модули модалок под новый DOM.
- **U-1 (тесты + аудит):** добавлены RTL smoke-тесты `CalculatorModal.test.tsx` и `FeedbackModal.test.tsx` (закрытие по backdrop и `cancel`); в `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md` удалена выполненная задача `U-1`, чтобы в бэклоге оставались только нереализованные пункты.
- Документация приведена к единому стилю: в `docs/README.md` добавлен стандарт оформления, в `docs/adr/README.md` добавлен единый шаблон ADR, в `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md` добавлен блок статуса документа и унифицирован заголовок `Definition of Done`.
- ADR синхронизированы по структуре и связям: `docs/adr/0002-no-tailwind-panda-css.md` приведен к шаблону с разделом `Проверка готовности` и ссылкой на ADR `0001`, формулировки в `docs/adr/0001-ui-stack-and-design-tokens.md` очищены от устаревшей ссылки на `ADR-002`.
- Документация и правила синхронизированы под новый UI-курс: в `docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md` Tailwind заменен на Panda CSS, обновлены спринты и DoD; в `.cursor/rules/agent-architecture-clean-code.mdc` зафиксирован запрет Tailwind в новых изменениях и курс на Panda CSS + токены.
- Добавлен ADR `docs/adr/0002-no-tailwind-panda-css.md` (отказ от Tailwind, utility/recipe-альтернатива на Panda CSS), обновлен реестр `docs/adr/README.md`.
- **P2 (perf / UX dev):** `next/image` в **`ServiceDetail`** и **`RelatedServiceDetail`** — `placeholder="empty"` вместо полного URL в **`blurDataURL`** (**D-2**); слайдер Keen — обёртка **`SliderLazy`** с **`next/dynamic`**, `ssr: false`, импорты переведены с **`Slider`** (**D-4**); в **`_document`** на **`<Html>`** добавлен **`data-scroll-behavior="smooth"`** (совместимость с **`scroll-behavior: smooth`** в глобальных стилях, см. [missing-data-scroll-behavior](https://nextjs.org/docs/messages/missing-data-scroll-behavior)); в **`globals.css`** убрана лишняя **`;`** у **`z-index`**.
- **D-5:** удалена неиспользуемая зависимость **`react-multi-carousel`**; обновлён **`package-lock.json`** (`yarn sync:npm-lock`).
- **F-2 / F-4:** в **`styles/tokens.css`** добавлены **`--shadow-lg`**, **`--transition-*`**, **`--overlay-on-media`**; в ключевых карточках (`CostingCard`, `ExampleCard`, `OfferCard`, `BusinessServicesCard`, `ServicesCards`, `RelatedServiceCard`, `ReviewCard`, `ApproachCards`) — тени/переходы на токенах, **`ExampleCard`** с **`role="button"`**, **`tabIndex={0}`**, клавиатура **Enter/Space**, стили **`:focus-visible`**; ссылки и интерактив — **`:focus-visible`** / **`:focus-within`** где уместно.
- **F-2 / F-4 (вторая волна):** расширены токены (**`--overlay-scrim*`**, **`--overlay-light`**, **`--overlay-panel`**, **`--shadow-inset-soft`**, **`--color-accent-soft`**, **`--text-shadow-on-light*`**, **`--order-*`** для **`OrderButton`**); hex/rgba → токены и единые тени в **`BackButton`**, **`FeedbackForm`**, **`ServiceDetail`**, **`ServicesCards`**, **`CategoryCollapse`**, **`DocumentPage`**, **`Reviews`**, **`RelatedServices`**, **`MenuButton`**, **`CostInput`**, **`CalculatorModal`**, **`FeedbackModal`**, **`PhotoViewer`**, **`Header`**, **`CookiesBanner`**, **`Features`**, **`TextViewer`**, **`OfferBanner`**, **`Title`**, **`UiButton`**; **`:focus-visible`** / **`transition`** на кнопках, ссылках и сводках (**`CategoryCollapse`**).
- **F-2 / F-4 (финал):** токен **`--shadow-banner-glow-up`** для баннера cookies; дочищены **`FeedbackModal`**, **`CookiesBanner`**; глобальные стили слайдера в **`globals.css`** (точки/стрелки на токенах, **`:focus-visible`**); **`Slider`**: стрелки **`role="button"`**, **`tabIndex`**, **Enter/Space**; **`chatbotConfig`** и **`BrickWallLoader`** — цвета через **`var(...)`**; удалён неиспользуемый **`shared/ui/slider/ui/slider.css`**.
- **E-2:** unit-тесты хуков в **`hooks/__tests__/`** — **`useLayoutProps`**, **`useScrollToElement`**, **`usePageData`**, **`useChatMessages`**, **`useCookiesBanner`**, **`usePrivacyPolicy`**, **`useThemeToggle`**, **`useCostingCardLogic`** (вместе с уже существующими **`useModalState`**, **`useFeedback`** — порог **≥ 8** хуков с тестами выполнен).
- **P2 (тесты + безопасность):** закрыт **E-3** — добавлены RTL-тесты компонентов **`MenuButton`**, **`CustomHead`**, **`OrderButton`**, **`CookiesBanner`**, **`UiButton`** (порог **≥ 5** компонентов с RTL выполнен с запасом); закрыт **G-2** — добавлен заголовок **`Content-Security-Policy`** в `next.config.js` (`headers`); закрыт **E-4** — расширено покрытие тестами для `pages/api`, `shared/utils`, `shared/hooks`, `features/*` и `shared/ui/*`, итог `statements` по `npm run test:coverage -- --runInBand`: **61.05%**.
- **P2 (регресс-контроль):** для **F-2r/F-4r** добавлен guard-скрипт `scripts/check-p2-regressions.mjs` и команда `npm run check:regressions`; подключение к `lint-staged` для `*.css` блокирует новые raw hex вне `styles/tokens.css` и новые `:hover` без `:focus-visible/:focus-within` (legacy-файлы вынесены в baseline allowlist до отдельной санации).
- **P2 (регресс-контроль, ужесточение):** baseline очищен — добавлены `:focus-visible/:focus-within` в legacy CSS-блоки и удалены все `legacy allowlist` из `check-p2-regressions`; guard теперь строгий по всему репозиторию (кроме `styles/tokens.css` и техдиров `node_modules/.git/.next/coverage/storybook-static`).
- **P2 (регресс-контроль, фиксация):** исправлен `npm run check:regressions` — скрипт теперь указывает на реальный файл `scripts/check-p2-regressions.mjs`, консистентно с `lint-staged`.
- TypeScript **6.x**, Jest **30**, `dotenv` **17**, `pg-promise` **12**; `tsconfig`: `moduleResolution: bundler`, алиасы в `paths` с префиксом `./`; `ignoreDeprecations: "6.0"` в `tsconfig.jest.json` (ts-jest); для тестов — `tsconfig.jest.json` и ссылка в `jest.config.cjs`.
- CI: в репозитории закоммичен `package-lock.json`; шаг аудита — `npm audit --omit=dev --audit-level=critical` в `premier-design/`; скрипт **`yarn sync:npm-lock`** после смены зависимостей.
- Sprint 6: таймауты **nodemailer** (SMTP) и **axios** (Telegram); абсолютные URL **og:image** / **twitter:image** и **JSON-LD logo** через `getFullCanonicalUrl`; **next/font** (Inter) в `lib/interFont.ts` + `_document`; из `_document` убраны невалидные httpEquiv cache-мета (**D-3**).
- **P1 (аудит):** каталог **`types/`** и алиас **`@app-types/*`** вместо неиспользуемого `@interface/*`; **`output: 'standalone'`** + обновлённый **`Dockerfile.prod`** (`node server.js`, без полного `node_modules`); **`docker-compose.yaml`** — убран `command`, используется CMD образа; **E-1:** шесть unit-наборов для `findService`, `findRelatedService`, `findItemByTitle`, `getCanonicalPath`, `getFullCanonicalUrl`, `generateStructuredData`; **FeedbackForm** — `UiTextarea`, `UiCheckbox`, маска телефона и select на токенах; исправлена передача **`consent`** при отправке и сообщение ошибки в **`findRelatedService`**.
- `package.json`: `resolutions` — `picomatch@^4.0.4` для единообразия дерева.
- Удалён корневой каталог `components/`: примитивы `Ui*` в `shared/ui/primitives/`, тест `FeedbackForm` в `shared/ui/order/ui/FeedbackForm/__tests__/`.
- `next/image`: устранены сочетания `priority` и `loading="lazy"` (баннер акций и др.); AVIF/WebP и `minimumCacheTTL` для кэша оптимизаций.
- Next.js **16.2** (`next`, `eslint-config-next`, `@next/bundle-analyzer`); `yarn dev` — **Webpack** (`--webpack`), опционально `yarn dev:turbo`; production `next build` по-прежнему может идти через Turbopack (см. вывод CLI). ESLint: flat-конфиг из `eslint-config-next/core-web-vitals` без `FlatCompat`; правки под правила `react-hooks` v7 (хуки, `Slider`, `OfferCard`).
- `next.config.js`: глобальные security-headers не вешаются на `/_next/*` (исключение в `source`), чтобы не ломать dev-ассеты.
- `getStaticProps` / `getData` вынесены из `pages/api/` в `lib/getStaticData.ts` (алиас `@lib/*`) — маршрут `/api/dataProvider` больше не создаётся.
- Документы: каталог `document-page`, стили `DocumentPage.module.css` (исправлена опечатка `Documet`).
- `next.config.js`: убраны no-op rewrites (`/` → `/` и т.п.); `server.js` помечен как deprecated для локального HTTPS.
- Зависимости обновлены (`yarn install`): React 19.2, sharp 0.34, `@typescript-eslint/*`, `@testing-library/dom` и др.; основной lockfile — `yarn.lock`, CI и Docker на Yarn Classic.
- Документация репозитория: [`docs/README.md`](../docs/README.md) — гайды, ADR; [`docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](../docs/audit/AUDIT_AND_IMPROVEMENT_PLAN_RU.md) — открытый бэклог и Definition of Done.
- `tsconfig.json`: `*.stories.*` и `.storybook` исключены из типов `next build`.
- Чат-бот через `next/dynamic` с `ssr: false`.
- Production Docker: контекст `./premier-design`, `public`, `HEALTHCHECK`; dev-образ и `docker-compose.development.yaml` без лишнего `target`.
