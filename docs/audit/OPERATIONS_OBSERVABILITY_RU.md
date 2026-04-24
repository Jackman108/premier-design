# Наблюдаемость в проде и RCA (RISK-11)

**Состояние (апрель 2026):** весь **server** JSON для API-ошибок использует `createApiErrorPayload` с полем `correlationId` и заголовок `X-Correlation-Id` (`shared/lib/api/apiRequestRuntime.ts`). Смокируются: `/api/feedback`, `/api/sitemap`. Успех для feedback также возвращает `correlationId` в JSON.

**Клиент:** `shared/lib/postFeedbackClient.ts` на не-2xx читает `correlationId` из тела и заголовка и бросает `PostFeedbackError`; `useFeedback` прокидывает код в `dataLayer` (событие `feedback_form_submit_error`) и показывает «код обращения» пользователю.

## Как копать инцидент (Vercel / self-host)

1. **По X-Correlation-Id** — в логах среды выполнения (функция `/api/...`) ищем строки `[api]` / JSON-объекты в структуре, где `correlationId` совпадает с клиентом.
2. **По SLO-файлу (feedback)** — `FEEDBACK_SLO_EVENTS_FILE` (по умолчанию `.feedback-slo-events.jsonl` в CWD) при `FEEDBACK_SLO_ENABLED` — сэмплы с `statusCode`, `durationMs`, `timedOut` для `/api/feedback`.
3. **Внешние APM (опционально)** — подключение Sentry/Datadog/Log push не встроено в лендинг: при росте требований к «дашборду 5xx» вынести в ADR + интеграцию; до этого достаточно Vercel Logs + корреляции.

## Границы

- In-process **circuit** и SLO-записи **не** заменяют централизованный APM; для одного воркера serverless state circuit отличается между инвокациями.

## Связь с реестром

- RISK-11: статус **снижен** в пределах лендинга (без отдельного APM) за счёт единого envelope, клиентской корреляции и данного runbook; расширение APM — отдельный эпик.
