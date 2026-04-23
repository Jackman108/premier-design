# Реестр рисков проекта (апрель 2026)

Индекс: [`docs/README.md`](../README.md) · Базовый аудит: [`AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](./AUDIT_AND_IMPROVEMENT_PLAN_RU.md)

## Цель
Зафиксировать текущие продуктовые и инженерные риски клиент-серверного приложения, их влияние и план снижения.

## Шкала
- Вероятность: `Low / Medium / High`
- Влияние: `Low / Medium / High / Critical`

## Риски

| ID | Риск | Вероятность | Влияние | Наблюдаемый сигнал | Митигирующие действия | Статус |
|----|------|-------------|---------|--------------------|-----------------------|--------|
| RISK-01 | Флейковость e2e smoke в CI из-за нестабильных навигаций и конкуренции dev/HMR | Medium | High | Таймауты `page.goto`, `ERR_ABORTED`, эпизодические падения smoke | CI e2e на production server, `workers=1`, retry/backoff в навигациях, разделение `@core`/`@extended` | Снижен |
| RISK-02 | Ложные падения perf-gate (Lighthouse startup race) | Medium | High | `Lighthouse was unable to reliably load the page` / `ERR_ABORTED` | Retry для Lighthouse, очистка временных профилей, запуск в Linux CI | Снижен |
| RISK-03 | Архитектурный drift через legacy allowlist boundary-check | Medium | Medium | Рост allowlist, просроченные исключения | `expiresOn` для allowlist, ревизия исключений по спринту | В работе |
| RISK-04 | Регрессии accessibility на новых интерактивах | Medium | High | Hover-only поведение, keyboard traps, отсутствие фокуса | `check:regressions`, e2e a11y smoke landmarks, ревью по чеклисту | Снижен |
| RISK-05 | Перегрузка CI времени выполнения из-за расширения проверок | Medium | Medium | Увеличение времени job > SLA | Блокирующий `@core` smoke, `@extended` запускать отдельно (manual/nightly) | Снижен |
| RISK-06 | Регрессии контрактов API/форм (feedback funnel) | Low | High | Рост 4xx/5xx, падение completion rate | Unit/API тесты + smoke method-guard + мониторинг ошибок API | В мониторинге |
| RISK-07 | Накопление шумовых артефактов в workspace/PR | Medium | Medium | Появление `.next/`, test artifacts, временных логов | `check:noise`, `.gitignore` (корень: `/premier-design/.next/`), pre-commit контроль | Снижен |
| RISK-08 | Несогласованность документов и реального состояния quality-gates | Medium | Medium | Разночтение между CI, audit и changelog | Обязательная синхронизация `docs/audit` + `CHANGELOG` при изменении гейтов | В мониторинге |
| RISK-09 | Скрытые уязвимости зависимостей и транзитивных пакетов | Medium | High | `yarn audit`/GH Dependabot alerts, CVE в prod-chain | Еженедельный triage уязвимостей, SLA patch critical/high, pinning + lockfile discipline | В мониторинге |
| RISK-10 | Деградация backend SLO из-за внешних интеграций (SMTP/Telegram/API) | Medium | High | Рост таймаутов API, spike retry в feedback-воронке | Timeouts + retry policy + circuit для интеграций, алерты по latency/error-rate | Снижен (см. [политику RISK-10](#политика-внешних-интеграций-risk-10) и `shared/lib/integrationCircuit.ts`) |
| RISK-11 | Недостаточная наблюдаемость продакшена (ошибки без корреляции) | Medium | High | Ошибки в логах без route/correlation, медленное RCA | Единый error envelope (`route`, `correlationId`, `status`), дашборд 5xx и клиентских JS-ошибок | Частично снижен |
| RISK-12 | Рост стоимости и времени CI из-за расширения матрицы проверок | Medium | Medium | Нестабильный lead time PR, очереди раннеров | Trend-метрики 14d, лимиты по p95 длительности, оптимизация только hot-path гейтов в PR | В мониторинге |

## Реализованные шаги
1. ✅ Вынесен `@extended` e2e в отдельный non-blocking workflow `.github/workflows/e2e-extended.yml` (nightly + `workflow_dispatch`).
2. ✅ Добавлен rolling-отчет по CI (14 дней): `.github/workflows/ci-trends.yml` + `scripts/report-ci-trends.mjs`.
3. 🔄 Плановое сокращение legacy-исключений запущено: allowlist вынесен в `scripts/architecture-allowlist.json` (`maxAllowedCount`), добавлен отчет `report:architecture-allowlist`; baseline уменьшен с 25 до 13.
4. ✅ Этап 1 RISK-11: для `/api/feedback` внедрены `correlationId` в ответ и структурированные server-логи (`route`, `status`, `durationMs`, `timedOut`).
5. ✅ Этап 2 RISK-11: введён общий runtime-наблюдатель `shared/lib/api/apiRequestRuntime.ts` и подключён в `/api/feedback` и `/api/sitemap`.
6. ✅ Для RISK-10 добавлен retry policy в `submitFeedback` для SMTP/Telegram (только для транзиентных ошибок, ограниченные попытки).
7. ✅ Для RISK-10 добавлен in-process **circuit** для путей SMTP (dev) и Telegram: N подряд неуспехов операции (после исчерпания retry) — пауза `openDuration`, затем half-open/проба. HTTP **503** при fast-fail; `FEEDBACK_CIRCUIT_*` (см. ниже).

## Политика внешних интеграций (RISK-10)

| Слой | Механизм | Назначение |
|------|----------|------------|
| API `/api/feedback` | `withTimeout` + SLO-запись | Верхняя граница ожидания, метрики |
| Use case `submitFeedback` | `retryAsync` (транзиенты) + `runWithIntegrationCircuit` (раздельно `feedback-smtp`, `feedback-telegram`) | Снижение штурма и пиков retry при устойчивом сбое |
| Ограничения | In-process, на инстанс/воркер; не замена распределённому circuit в инфраструктуре | Согласие «достаточно для воронки лендинга» до выделенного BFF/очереди |

**Переменные окружения (опционально):** `FEEDBACK_CIRCUIT_ENABLED` (по умолчанию `true` при отсутствии `false`); `FEEDBACK_CIRCUIT_FAILURE_THRESHOLD` (по умолчанию `5`); `FEEDBACK_CIRCUIT_OPEN_MS` (по умолчанию `60000`).

## План снижения оставшихся рисков (май 2026)
1. ✅ Включить fail-only для критичных зависимостей: `yarn audit --level critical` в PR (уже есть) + weekly issue template для high severity.
2. ✅ Добавить SLO-метрики API `/api/feedback`: p95 latency, error rate, timeout rate; ввести пороги алертов.
3. ✅ Формализовать лимит allowlist: каждую итерацию уменьшать `maxAllowedCount` минимум на 1 до полного удаления legacy-исключений.
4. ✅ Принять бюджет по CI: p95 длительность `CI Quality Gates` не выше целевого SLA (фиксируется по `.ci-trends-14d.json`).
