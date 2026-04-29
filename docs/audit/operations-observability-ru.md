# Наблюдаемость в проде и RCA (RISK-11)

**Состояние (апрель 2026):** весь **server** JSON для API-ошибок использует `createApiErrorPayload` с полем `correlationId` и заголовок `X-Correlation-Id` (`shared/lib/api/apiRequestRuntime.ts`). Смокируются: `/api/feedback`, `/api/sitemap`. Успех для feedback также возвращает `correlationId` в JSON.

**Клиент:** `shared/lib/postFeedbackClient.ts` на не-2xx читает `correlationId` из тела и заголовка и бросает `PostFeedbackError`; `useFeedback` прокидывает код в `dataLayer` (событие `feedback_form_submit_error`) и показывает «код обращения» пользователю.

## Как копать инцидент (Vercel / self-host)

1. **По X-Correlation-Id** — в логах среды выполнения (функция `/api/...`) ищем строки `[api]` / JSON-объекты в структуре, где `correlationId` совпадает с клиентом.
2. **По SLO-файлу (feedback)** — `FEEDBACK_SLO_EVENTS_FILE` (по умолчанию `.audit/feedback-slo-events.jsonl` в CWD) при `FEEDBACK_SLO_ENABLED` — сэмплы с `statusCode`, `durationMs`, `timedOut` для `/api/feedback`.
3. **Внешние APM (опционально)** — подключение Sentry/Datadog/Log push не встроено в лендинг: при росте требований к «дашборду 5xx» вынести в ADR + интеграцию; до этого достаточно Vercel Logs + корреляции.

## Границы

- In-process **circuit** и SLO-записи **не** заменяют централизованный APM; для одного воркера serverless state circuit отличается между инвокациями.

## Связь с реестром

- RISK-11: статус **снижен** в пределах лендинга (без отдельного APM) за счёт единого envelope, клиентской корреляции и данного runbook; расширение APM — отдельный эпик.

## RCA drill (S1, 2026-04-27)

- Проверка сценария `feedback`: клиентская ошибка с `correlationId` сопоставляется с ответом `/api/feedback` и серверным логом по `X-Correlation-Id` за один проход.
- Подтверждено, что envelope ошибки (`createApiErrorPayload`) и клиентский парсинг (`PostFeedbackError`) согласованы по `correlationId`.
- Дальнейший шаг: при подключении внешнего APM закрепить тот же `correlationId` как trace-tag (без смены текущего API-контракта).

## Интеграции feedback: таймауты и ретраи (S3, RISK-10)

- SMTP и Telegram для feedback запускаются в `retryAsync` с `maxAttempts=2`, `baseDelayMs=250`, чтобы транзиентные сбои (`ETIMEDOUT`, сетевые 5xx) не приводили к мгновенному отказу.
- Оба канала обёрнуты в `runWithIntegrationCircuit`: при накоплении ошибок circuit открывается и следующий запрос получает контролируемый `503` вместо каскадных таймаутов.
- Для SMTP в DAL закреплены укороченные таймауты транспорта (`connectionTimeout/greetingTimeout/socketTimeout`), чтобы суммарная длительность не выбивала API в `504`.
