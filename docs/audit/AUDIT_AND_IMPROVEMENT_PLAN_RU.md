# Аудит и план развития проекта Premier Design

Документ подготовлен по результатам запуска и технического аудита проекта услуг по ремонту и дизайну интерьера.

Индекс всей документации репозитория: [`docs/README.md`](../README.md).

## 1) Что проверено фактически

### Запуск и сборка

- `npm install` (в `premier-design/`) — успешно, зависимости установлены.
- `npm run dev` — успешно, приложение стартует на `http://localhost:3000`.
- `npm run build` — успешно, production-сборка собирается.

### Качество и безопасность

- `npm run lint` — ESLint CLI + flat config.
- `npm test -- --watch=false` — Jest (TS ESM).
- `npm audit --omit=dev` — контроль prod-зависимостей.

## 2) Архив первого аудита (контекст)

Ниже зафиксированы исходные наблюдения до внедрения дорожной карты. **Актуальное состояние задач** — только в таблице §3 и в фиксации спринтов §3.4–3.5.

Исторически отмечались: слабая инженерная зрелость относительно production, необходимость CI, тестов, обновления зависимостей, стандартизации UI и DevOps-практик. Эти направления закрываются в трекере по ID задач.

## 3) Трекер выполнения (таблица для ежедневной отметки)

Статусы: `todo` / `in_progress` / `blocked` / `done`.

| ID | Этап | Задача | Приоритет | Оценка | Статус | Прогресс | Критерий готовности | Комментарий / результат |
|---|---|---|---|---|---|---|---|---|
| S0-1 | Этап 0 | Починить `lint` под ESLint 9 | P0 | 0.5 д | done | 100% | `npm run lint` проходит локально | ESLint CLI + `eslint.config.mjs` (`lint`: `eslint .`) |
| S0-2 | Этап 0 | Зафиксировать Node LTS (`.nvmrc`) | P0 | 0.2 д | done | 100% | `.nvmrc` в репозитории | Добавлен `premier-design/.nvmrc` со значением `22` |
| S0-3 | Этап 0 | Обновить runbook в `README.md` | P0 | 0.5 д | done | 100% | Полный сценарий запуска и диагностики | README переработан: запуск, env, docker, типовые ошибки |
| S0-4 | Этап 0 | Добавить шаблон env | P0 | 0.2 д | done | 100% | `.env.example` в приложении | Добавлены обязательные переменные для feedback-интеграций |
| S1-1 | Этап 1 | Ввести runtime-валидацию API (`zod`) | P0 | 0.5 д | done | 100% | Некорректный payload получает 400 | Реализовано для `pages/api/feedback.ts` |
| S1-2 | Этап 1 | Вынести use-case для feedback | P0 | 0.7 д | done | 100% | Бизнес-логика не в API-роуте | Добавлен `features/feedback/useCases/submitFeedback.ts` |
| S1-3 | Этап 1 | Разделить ответственность API/домен | P1 | 0.5 д | done | 100% | API только orchestration/HTTP-коды | `pages/api/feedback.ts` делает валидацию+коды ответа, бизнес-логика в use-case |
| S1-4 | Этап 1 | Ввести правила границ импортов | P1 | 1.0 д | done | 100% | Линтер запрещает нарушения слоев | Добавлены `no-restricted-imports` правила для защиты границ слоев |
| S2-1 | Этап 2 | ADR по UI-стеку (токены + опция HeroUI/NextUI) | P1 | 0.5 д | done | 100% | ADR с решением по UI-stack | [`docs/adr/0001-ui-stack-and-design-tokens.md`](../adr/0001-ui-stack-and-design-tokens.md): база — CSS Modules + токены; внешняя библиотека — только по отдельному ADR после spike |
| S2-2 | Этап 2 | Слой дизайн-токенов | P1 | 1.0 д | done | 100% | Глобальные токены подключены | `styles/tokens.css` + импорт из `globals.css`; семантические алиасы для новых примитивов |
| S2-3 | Этап 2 | Базовые UI-компоненты | P1 | 1.5 д | done | 100% | Единый слой примитивов | `components/ui/` — UiButton, UiInput, UiSurface + `index.ts` |
| S2-4 | Этап 2 | Storybook и визуальные контракты | P2 | 1.0 д | done | 100% | Storybook собирается в CI | SB 10, job `storybook`, артефакт `storybook-static`; stories у примитивов в `components/ui/*.stories.tsx` |
| S3-1 | Этап 3 | Unit-тесты `utils/validates/services` | P0 | 1.5 д | done | 100% | Покрытие ключевых чистых функций | Добавлены тесты `feedback/schema`, `shared/lib/rateLimit`, `validates/envVar`, `features/feedback/useCases/submitFeedback` |
| S3-2 | Этап 3 | Component-тесты критичных форм | P1 | 1.0 д | done | 100% | Тест отправки формы и ошибок | Подключен RTL/jsdom, тесты `FeedbackForm` покрывают валидацию и submit сценарий |
| S3-3 | Этап 3 | E2E smoke (Playwright) | P1 | 1.0 д | done | 100% | Главная + услуга + feedback сценарий | Добавлены `playwright.config.ts`, `e2e/smoke.spec.ts`, CI job `e2e-smoke`, локальный прогон успешен |
| S3-4 | Этап 3 | Покрытие: CI-отчёт + критический путь | P2 | 0.5 д | done | 100% | Артефакт coverage в CI; ключевые модули feedback pipeline с тестами | DoD спринта: отчёт и gates. Глобально: Statements ~37%, Branches ~38%, Functions ~23%, Lines ~36% (рост до 60% statements — бэклог Sprint 4) |
| S4-1 | Этап 4 | Закрыть high/critical зависимости | P0 | 1.0 д | done | 100% | `npm audit` без high/critical | `nodemailer` обновлен до latest major, high закрыт |
| S4-2 | Этап 4 | Security headers (Nginx + Next) | P0 | 0.7 д | done | 100% | Проверка заголовков в prod-like | Заголовки синхронизированы в `next.config.js`, `nginx.conf.dev`, `nginx.conf.prod` |
| S4-3 | Этап 4 | Санитизация и rate limit API | P0 | 1.0 д | done | 100% | Спам/злоупотребления ограничены | В API добавлены rate limit + `Content-Type` check, в use-case внедрено HTML-экранирование |
| S5-1 | Этап 5 | CI пайплайн quality gates | P0 | 1.0 д | done | 100% | `lint/test/build/audit` в PR checks | Добавлен workflow `.github/workflows/ci.yml` |
| S5-2 | Этап 5 | Husky + lint-staged | P1 | 0.5 д | done | 100% | Предкоммит проверяет качество | Добавлены `husky` и `lint-staged`, pre-commit hook запускает линт staged TS/JS файлов |
| S5-3 | Этап 5 | Docker hardening/healthcheck | P1 | 1.0 д | done | 100% | Контейнеры безопаснее и наблюдаемы | `Dockerfile.prod` под context `./premier-design`: `public`, non-root, `HEALTHCHECK`; `Dockerfile.dev` + healthcheck; compose dev без лишнего `target` |
| S5-4 | Этап 5 | Semver + changelog | P2 | 0.5 д | done | 100% | Формализованный релизный поток | `CHANGELOG.md` + раздел в README (SemVer, Keep a Changelog, Conventional Commits) |
| S6-1 | Этап 6 | Bundle analyzer в процессе разработки | P1 | 0.5 д | done | 100% | Есть отчет по тяжелым чанкам | `@next/bundle-analyzer` в `next.config.js`, скрипт `npm run analyze` |
| S6-2 | Этап 6 | Dynamic imports для тяжелых блоков | P1 | 1.0 д | done | 100% | Снижение First Load JS | `ChatBotSidebar` через `next/dynamic` (`ssr: false`) в `ButtonsPanel` |
| S6-3 | Этап 6 | Оптимизация `next/image`/cache | P1 | 0.7 д | done | 100% | Улучшение LCP и трафика | `formats: avif/webp`, `minimumCacheTTL: 60`; удалённых доменов нет — `remotePatterns` не требуется |
| S6-4 | Этап 6 | Контроль Core Web Vitals и SEO | P2 | 1.0 д | done | 100% | Регламент замеров и SEO | [`docs/guides/PERF_AND_SEO_CHECKLIST_RU.md`](../guides/PERF_AND_SEO_CHECKLIST_RU.md) + Lighthouse/Search Console вручную |

## 3.1) Шаблон еженедельного отчета по плану

| Неделя | Выполнено | В работе | Блокеры | Решение по блокерам | Следующий фокус |
|---|---|---|---|---|---|
| YYYY-WW | `Sx-y, Sx-z` | `Sx-k` | Кратко | Что делаем | Следующие 2-3 задачи |

## 3.2) Спринтовый план (приоритизация и исполнение)

| Спринт | Цель | Включенные задачи | Статус | KPI спринта | Примечание |
|---|---|---|---|---|---|
| Sprint 1 (завершен) | Стабильный baseline и архитектурный каркас | `S0-1..S0-4`, `S1-1..S1-4`, `S3-1`, `S4-1` | done | `lint+test+build` проходят, API feedback валидирует вход, `npm audit` без уязвимостей | Sprint закрыт, baseline стабилен |
| Sprint 2 | Закрыть безопасность и критичный quality gate | `S4-1 (finish)`, `S4-2`, `S4-3`, `S5-1` | done | `npm audit` без high/critical, security headers + rate limit, CI checks обязательны для PR | Спринт завершен: quality gates добавлены |
| Sprint 3 | Тестовый фундамент и стабильная поставка | `S3-1..S3-4`, `S5-2` | done | e2e smoke в CI, артефакт coverage в CI, pre-commit quality gate; критический путь feedback покрыт тестами | Спринт закрыт; целевое **глобальное** 60% statements вынесено в бэклог Sprint 4 |
| Sprint 4 | UI-платформа и DX/Perf масштабирование | `S2-1..S2-4`, `S5-3`, `S5-4`, `S6-1..S6-4` | done | ADR + токены + UI-примитивы + Storybook в CI; Docker healthcheck; SemVer/changelog; analyzer + dynamic import + image defaults + perf/SEO чеклист | Спринт закрыт; бэклог: миграция экранов на `components/ui`, рост тестового покрытия до 60% statements |

## 3.3) Фиксация прогресса Sprint 1

| Пункт | Что сделано | Проверка | Статус |
|---|---|---|---|
| Архитектура feedback | Валидация `zod` + use-case + корректные HTTP-коды | `npm run lint`, `npm run build` | done |
| Guardrails архитектуры | Линтер-ограничения на границы слоев | `npm run lint` | done |
| Тестовая база | Jest (TS ESM) + unit tests для feedback schema | `npm test -- --watch=false` | done |
| Линт future-proof | Миграция на ESLint CLI (`eslint.config.mjs`) | `npm run lint` | done |
| Security batch #1 | Обновлены `next`/`axios` и транзитивные пакеты, закрыты critical | `npm audit --omit=dev` | done |
| Security batch #2 | Обновление `nodemailer` до безопасной major-ветки и адаптация кода | `npm audit --omit=dev` | done |
| Unit tests batch #2 | Добавлены тесты для rate limit и изоляции состояния | `npm test -- --watch=false` | done |
| Unit tests batch #3 | Добавлены тесты для `envVar` и `submitFeedback` c моками интеграций | `npm test -- --watch=false` | done |

## 3.4) Закрытие Sprint 3 (фиксация)

- В CI: `lint`, unit-тесты с coverage-артефактом, `build`, `audit`, отдельный job e2e smoke.
- Локально: Husky + lint-staged на staged TS/JS.
- Покрытие: критический путь feedback (schema, use-case, API handler вне `pages`, форма, rate limit, sanitize) зафиксирован тестами; глобальный процент — измеримая база для роста в Sprint 4.

## 3.5) Закрытие Sprint 4 (фиксация)

- UI: ADR [`docs/adr/0001-ui-stack-and-design-tokens.md`](../adr/0001-ui-stack-and-design-tokens.md), токены `styles/tokens.css`, примитивы `components/ui/*`, Storybook + job в CI, превью импортирует `globals.css`.
- DX/релизы: `CHANGELOG.md`, раздел версий в README, `npm run analyze`.
- Perf: dynamic-импорт чат-бота, настройки `next/image`, чеклист [`docs/guides/PERF_AND_SEO_CHECKLIST_RU.md`](../guides/PERF_AND_SEO_CHECKLIST_RU.md).
- Docker: исправлены пути `Dockerfile.prod`, добавлены `public` + healthcheck; dev-образ и compose синхронизированы.

## 4) План по приоритету (что делать первым)

1. Поднять **глобальное** покрытие к **60% statements** (инкрементально: страницы, хуки, оставшиеся сервисы).
2. Переводить новые и затронутые экраны на примитивы **`components/ui`** и токены (без массового рефакторинга).
3. Опциональный spike **HeroUI / NextUI** — только после отдельного ADR и оценки бандла (см. ADR-0001).
4. Периодически прогонять чеклист **[`docs/guides/PERF_AND_SEO_CHECKLIST_RU.md`](../guides/PERF_AND_SEO_CHECKLIST_RU.md)** и `npm run analyze` перед релизом.

Статус: Sprint 1–4 закрыты по трекеру; дальнейший фокус — покрытие и эволюция UI без нарушения границ слоёв.

## 5) Definition of Done для каждого шага

- Изменение покрыто тестами или есть обоснование, почему пока без теста.
- Линт, typecheck, build проходят локально и в CI.
- Нет новых high/critical уязвимостей.
- Документация обновлена (что сделано, как запускать, как поддерживать).
- Изменение не ломает публичные URL и ключевые пользовательские сценарии.

## 6) Риски и как их снизить

- Риск: массовые обновления зависимостей могут вызвать регрессии.
  - Снижение: делать батчами + smoke/e2e прогон после каждого батча.
- Риск: большой рефакторинг архитектуры остановит поставку фич.
  - Снижение: инкрементальный подход (strangler pattern), только по затронутым зонам.
- Риск: отсутствие единых правил код-стиля вернет "хаос" после улучшений.
  - Снижение: обязательные rules для агента + CI gates + code review checklist.
