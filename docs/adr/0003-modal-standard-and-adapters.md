# ADR 0003: Единый стандарт модалок и legacy-адаптеры

## Статус
Принято.

## Контекст
- В проекте исторически coexist-ят два подхода к модалкам: headless `UiDialog` (Radix) и нативный `<dialog>`.
- В рамках Wave 1 (`R-01`) требуется стабилизировать a11y/поведение модалок и зафиксировать единый контракт.
- Регрессии чаще всего появляются в зонах `Esc`, overlay-close, фокус-переходов и ARIA-описаний.

## Решение
1. Базовый стандарт модалки в проекте:
- обязательны `title` и `description` (через `aria-labelledby`/`aria-describedby` или эквивалент в headless-примитиве);
- поддержка закрытия по `Esc`;
- поддержка закрытия кликом по overlay/backdrop;
- корректный возврат фокуса при закрытии.

2. Стратегия для текущего кода:
- `UiDialog` (Radix) используется как основной headless-примитив для новых фич;
- существующие модалки на `<dialog>` считаются legacy-слоем и поддерживаются через thin-adapter-подход без размножения уникальных реализаций.

3. Правило внедрения:
- новые модальные сценарии не создаются "с нуля" вне `UiDialog`/legacy-adapter;
- в PR обязательно прикладывается smoke-тест поведения (overlay + Esc + базовая ARIA-семантика).

## Последствия
- Поведение модалок предсказуемо и унифицировано.
- Снижается вероятность a11y/HMR-регрессий.
- Ускоряется ревью и сопровождение UI-слоя.

## Пример: новости (контролируемый `UiDialog`)
- На странице `/about` рендерятся **два** блока `News` (основной и в футере). Оба вызывают `useNews`; синхронизация `location.hash` при монтировании должна быть **только у одного** экземпляра — в `pages/about.tsx` у `Layout` задаётся **`footerNewsHashSyncOnMount={false}`** (в футер уходит `newsHashSyncOnMount={false}` для `News`). Не использовать **`useRouter` из `next/router` в `Footer`**: общий `Layout` рендерится и под `app/documents/*`, где Pages Router не смонтирован и **падает production build**.
- `TextViewer` на базе `UiDialog`: **`onClose={closeNewsModal}`** и `onOpenChange(false)` должны вызывать **одну** функцию полного выхода из `useNews` — закрытие модалки, сброс `expandedNews`, `resetHash`, скролл к списку (не изолированный `closeModal`, иначе карточка остаётся «развёрнутой» и рассинхрон с Radix). Кнопка «Закрыть» — `Dialog.Close` (`asChild`); тот же сценарий, что overlay/`*Esc*`.
- `News`: у ссылки заголовка — `onClick` с `stopPropagation`, чтобы навигация по `href` не дублировала обработчик карточки.
- Порядок: при закрытии `flushSync(() => { closeModal(); setExpandedNews(null); })` — один commit, полный сход с `UiDialog`/`open`. Затем `resetHash` / скролл, затем **`setTimeout(0)`: `focus` на `#news-list`** (не в том же тике, что снятие `hideNonModal` с `main` — иначе предупреждение a11y). `UiDialog`: `onOpenAutoFocus` с `preventDefault` + `setTimeout(0)` фокус на `Dialog.Content` с `tabIndex={-1}` (иначе `FocusScope` вешает `focus` на первую кнопку в ту же фазу, что и `hideOthers`, и виден `aria-hidden` на предке). `onCloseAutoFocus` / `closeFocusTargetId` — `setTimeout(0)`; для новостей проп `closeFocusTargetId` не задан, фокус в `useNews` после закрытия.

## Пример: legacy `PhotoViewer` (нативный `<dialog>`)

- Компонент `features/examples/ui/PhotoViewer/PhotoViewer.tsx` остаётся в слое **legacy `<dialog>`** (ADR, п. 2): открытие через **`showModal()`** в `useEffect` (top layer), закрытие — **`close()`** в cleanup; иначе при только `open`/абсолютных детях ломается геометрия и навигация по кадрам.
- **Кадр изображения** — контейнер **90vw × 90dvh** (90% ширины и высоты вьюпорта), внутри — `object-fit: contain` и `max-width`/`max-height` на `img`, чтобы крупные фото не обрезались.
- Закрытие: кнопка подложки (scrim), **Escape** (обработчик на `<dialog>`), кнопка «Close».
- **a11y (минимум как у headless):** скрытые `h2` + `p` с `useId()`, связь через `aria-labelledby` / `aria-describedby`; подписи поверх затемнения — **`var(--white)`** + лёгкий `text-shadow` (читаемость в тёмной теме, см. [`docs/mempalace/rules/02_WEB_UI_COMPONENTS_AND_TOKENS_RU.md`](../mempalace/rules/02_WEB_UI_COMPONENTS_AND_TOKENS_RU.md) и [`03_WEB_A11Y_AND_UX_RU.md`](../mempalace/rules/03_WEB_A11Y_AND_UX_RU.md)).
- Юнит-тесты: `PhotoViewer.test.tsx` (роль диалога по заголовку «Просмотр примеров работ»); в **`jest.setup.ts`** — полифилл `HTMLDialogElement.prototype.showModal`/`close` для jsdom.

## Проверка готовности
- В кодовой базе отсутствуют новые нестандартизованные модальные реализации.
- Для критичных модалок есть smoke-тесты закрытия по overlay и `Esc`.
- Документация (`docs/audit`, `CHANGELOG`, ADR) синхронизирована.
