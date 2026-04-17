# Architecture Decision Records (ADR)

Формат: один файл на решение, нумерация `NNNN- короткое-имя.md`.

## Шаблон ADR

Рекомендуемая структура каждого ADR:
- `Статус`
- `Контекст`
- `Решение`
- `Последствия`
- `Проверка готовности`

| № | Файл | Тема | Статус |
|---|--------|------|--------|
| 0001 | [0001-ui-stack-and-design-tokens.md](0001-ui-stack-and-design-tokens.md) | UI-стек, токены, Storybook, путь к опциональной библиотеке компонентов | Принято |
| 0002 | [0002-no-tailwind-panda-css.md](0002-no-tailwind-panda-css.md) | Отказ от Tailwind, выбор Panda CSS как utility/recipe-альтернативы | Принято |
| 0003 | [0003-modal-standard-and-adapters.md](0003-modal-standard-and-adapters.md) | Единый стандарт модалок (UiDialog + legacy-adapter для `<dialog>`) | Принято |
| 0004 | [0004-csp-tightening-and-trusted-svg.md](0004-csp-tightening-and-trusted-svg.md) | Ужесточение CSP (`img-src`, `connect-src`), контракт по SVG для `next/image` | Принято |
| 0005 | [0005-rate-limiting-storage-and-client-ip.md](0005-rate-limiting-storage-and-client-ip.md) | In-memory rate limit, мульти-инстанс, доверие к `x-forwarded-for` | Принято |
| 0006 | [0006-next-api-cors-same-origin.md](0006-next-api-cors-same-origin.md) | API routes same-origin, политика CORS при появлении внешних клиентов | Принято |
| 0007 | [0007-next-pages-and-app-router-split.md](0007-next-pages-and-app-router-split.md) | Гибрид `pages/` + `app/`: зоны ответственности и правила новых маршрутов | Принято |
| 0008 | [0008-react-chatbot-kit-dependency.md](0008-react-chatbot-kit-dependency.md) | Риск и изоляция `react-chatbot-kit` в бандле | Принято |
| 0009 | [0009-web-analytics-deferred.md](0009-web-analytics-deferred.md) | Аналитика (YM/GA4/GTM) — отложено до env, CSP и карты событий | Принято |
