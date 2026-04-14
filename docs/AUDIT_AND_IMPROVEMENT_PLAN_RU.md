# Аудит и план развития проекта Premier Design

Документ подготовлен по результатам запуска и технического аудита проекта услуг по ремонту и дизайну.

## 1) Что проверено фактически

### Запуск и сборка
- `npm install` (в `premier-design/`) — успешно, зависимости установлены.
- `npm run dev` — успешно, приложение стартует на `http://localhost:3000`.
- `npm run build` — успешно, production-сборка собирается.

### Качество и безопасность
- `npm run lint` — исправлен и проходит (ESLint CLI + flat config, совместимо с Next 16+).
- `npm test -- --watch=false` — настроен Jest (TS ESM), базовые unit-тесты выполняются успешно.
- `npm audit --omit=dev` — после обновлений уязвимости закрыты (`found 0 vulnerabilities`).

## 2) Ключевые выводы аудита

1. **Проект работоспособен**, но инженерные практики не доведены до production-ready уровня.
2. **Линт-пайплайн сломан** (конфигурация устарела относительно ESLint 9).
3. **Нет тестового покрытия**, что повышает риск регрессий.
4. **Есть критические уязвимости зависимостей**, требуется контролируемое обновление.
5. **README минимальный**, отсутствуют runbook, архитектурные решения, регламенты разработки.
6. **Нужна стандартизация UI-слоя** (в задаче заявлен NextUI, но фактически не используется).
7. **Нужно усилить DX/DevOps**: CI quality gates, предкоммит-хуки, наблюдаемость, прогнозируемый релизный процесс.

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
| S2-1 | Этап 2 | Утвердить NextUI как UI-базу | P1 | 0.5 д | todo | 0% | ADR с решением по UI-stack | Ожидает выбора стратегии |
| S2-2 | Этап 2 | Слой дизайн-токенов | P1 | 1.0 д | todo | 0% | Глобальные токены подключены | После фиксации UI-библиотеки |
| S2-3 | Этап 2 | Базовые UI-компоненты | P1 | 1.5 д | todo | 0% | Button/Input/Modal/Card/Section/Container | Через единый API компонентов |
| S2-4 | Этап 2 | Storybook и визуальные контракты | P2 | 1.0 д | todo | 0% | Storybook запускается в CI-preview | После базовых UI-компонентов |
| S3-1 | Этап 3 | Unit-тесты `utils/validates/services` | P0 | 1.5 д | done | 100% | Покрытие ключевых чистых функций | Добавлены тесты `feedback/schema`, `shared/lib/rateLimit`, `validates/envVar`, `features/feedback/useCases/submitFeedback` |
| S3-2 | Этап 3 | Component-тесты критичных форм | P1 | 1.0 д | done | 100% | Тест отправки формы и ошибок | Подключен RTL/jsdom, тесты `FeedbackForm` покрывают валидацию и submit сценарий |
| S3-3 | Этап 3 | E2E smoke (Playwright) | P1 | 1.0 д | done | 100% | Главная + услуга + feedback сценарий | Добавлены `playwright.config.ts`, `e2e/smoke.spec.ts`, CI job `e2e-smoke`, локальный прогон успешен |
| S3-4 | Этап 3 | Покрытие: CI-отчёт + критический путь | P2 | 0.5 д | done | 100% | Артефакт coverage в CI; ключевые модули feedback pipeline с тестами | DoD спринта: отчёт и gates. Глобально: Statements ~37%, Branches ~38%, Functions ~23%, Lines ~36% (рост до 60% statements — бэклог Sprint 4) |
| S4-1 | Этап 4 | Закрыть high/critical зависимости | P0 | 1.0 д | done | 100% | `npm audit` без high/critical | `nodemailer` обновлен до latest major, high закрыт |
| S4-2 | Этап 4 | Security headers (Nginx + Next) | P0 | 0.7 д | done | 100% | Проверка заголовков в prod-like | Заголовки синхронизированы в `next.config.js`, `nginx.conf.dev`, `nginx.conf.prod` |
| S4-3 | Этап 4 | Санитизация и rate limit API | P0 | 1.0 д | done | 100% | Спам/злоупотребления ограничены | В API добавлены rate limit + `Content-Type` check, в use-case внедрено HTML-экранирование |
| S5-1 | Этап 5 | CI пайплайн quality gates | P0 | 1.0 д | done | 100% | `lint/test/build/audit` в PR checks | Добавлен workflow `.github/workflows/ci.yml` |
| S5-2 | Этап 5 | Husky + lint-staged | P1 | 0.5 д | done | 100% | Предкоммит проверяет качество | Добавлены `husky` и `lint-staged`, pre-commit hook запускает линт staged TS/JS файлов |
| S5-3 | Этап 5 | Docker hardening/healthcheck | P1 | 1.0 д | todo | 0% | Контейнеры безопаснее и наблюдаемы | dev/prod parity |
| S5-4 | Этап 5 | Semver + changelog | P2 | 0.5 д | todo | 0% | Формализованный релизный поток | Conventional commits/release notes |
| S6-1 | Этап 6 | Bundle analyzer в процессе разработки | P1 | 0.5 д | todo | 0% | Есть отчет по тяжелым чанкам | Включать перед релизом |
| S6-2 | Этап 6 | Dynamic imports для тяжелых блоков | P1 | 1.0 д | todo | 0% | Снижение First Load JS | По результатам анализатора |
| S6-3 | Этап 6 | Оптимизация `next/image`/cache | P1 | 0.7 д | todo | 0% | Улучшение LCP и трафика | Проверить `remotePatterns` и TTL |
| S6-4 | Этап 6 | Контроль Core Web Vitals и SEO | P2 | 1.0 д | todo | 0% | Метрики в зеленой зоне | Lighthouse + Search Console |

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
| Sprint 4 | UI-платформа и DX/Perf масштабирование | `S2-1..S2-4`, `S5-3`, `S5-4`, `S6-1..S6-4` | todo | утвержден UI-стандарт, storybook, perf/SEO контроль и релизная дисциплина | Масштабирование разработки |

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

## 4) План по приоритету (что делать первым)

1. Зафиксировать **S2-1** (ADR: UI-stack / NextUI или альтернатива) — разблокирует S2-2..S2-4.
2. **S5-3** Docker hardening и healthcheck (dev/prod parity, наблюдаемость).
3. Поднять **глобальное** покрытие (к цели 60% statements): сервисы без тестов, страницы-обёртки, интеграционные сценарии — итеративно, без регресса CI.
4. **S5-4** semver + changelog (релизная дисциплина).
5. **S6-1..S6-4** по результатам профилирования и SEO-аудита.

Статус: Sprint 1–3 закрыты; security headers, API hardening и CI gates (S4-2, S4-3, S5-1) уже внедрены. Текущий фокус — Sprint 4 (п. 1–2) и наращивание покрытия (п. 3).

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
