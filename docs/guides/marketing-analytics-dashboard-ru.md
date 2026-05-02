# Маркетинг-дашборд и KPI воронки

Документ фиксирует единый контракт событий, расчетов и целевых значений для блока `W4-M-01`.

## 1) События и источники

| Событие                        | Где отправляется                                                    | Назначение в дашборде                  |
| ------------------------------ | ------------------------------------------------------------------- | -------------------------------------- |
| `cta_open_order_modal`         | `shared/ui/order/ui/OrderButton/OrderButton.tsx`                    | CTR CTA в Hero/Quiz/других entry-point |
| `lead_quiz_start`              | `features/marketing/lead-quiz/hooks/useLeadQuizTracking.ts`         | Старт воронки квиза                    |
| `lead_quiz_step_view`          | `features/marketing/lead-quiz/hooks/useLeadQuizTracking.ts`         | Переходы по шагам квиза                |
| `lead_quiz_answer_select`      | `features/marketing/lead-quiz/hooks/useLeadQuizTracking.ts`         | Вовлеченность на каждом шаге           |
| `lead_quiz_dropoff`            | `features/marketing/lead-quiz/hooks/useLeadQuizTracking.ts`         | Точки оттока по шагам                  |
| `trust_signals_view`           | `features/marketing/trust-signals/hooks/useTrustSignalsTracking.ts` | Видимость блока trust-сигналов         |
| `trust_metric_click`           | `features/marketing/trust-signals/hooks/useTrustSignalsTracking.ts` | Клики по метрикам доверия              |
| `trust_benefit_click`          | `features/marketing/trust-signals/hooks/useTrustSignalsTracking.ts` | Клики по преимуществам                 |
| `feedback_form_submit_success` | `shared/ui/order/hooks/useFeedback.ts`                              | Конверсия в целевую заявку             |
| `feedback_form_submit_error`   | `shared/ui/order/hooks/useFeedback.ts`                              | Контроль сбоев формы                   |

## 2) Funnel-метрики (формулы)

Базовая воронка:

1. `quiz_start_users` = unique users с `lead_quiz_start`
2. `step_1_users` = unique users с `lead_quiz_step_view` (step=1)
3. `step_2_users` = unique users с `lead_quiz_step_view` (step=2)
4. `step_3_users` = unique users с `lead_quiz_step_view` (step=3)
5. `quiz_cta_open_users` = unique users с `cta_open_order_modal` (context=`lead_quiz_submit_cta`)
6. `lead_submit_success_users` = unique users с `feedback_form_submit_success`

Ключевые коэффициенты:

- `quiz_step_1_to_2_cr = step_2_users / step_1_users`
- `quiz_step_2_to_3_cr = step_3_users / step_2_users`
- `quiz_to_modal_cr = quiz_cta_open_users / quiz_start_users`
- `modal_to_submit_cr = lead_submit_success_users / quiz_cta_open_users`
- `quiz_total_cr = lead_submit_success_users / quiz_start_users`

## 3) Baseline и цели (v3.1)

Baseline фиксирован для первого релизного среза v3.1 (после включения полной телеметрии):

| KPI                                                                                   | Baseline | Цель    |
| ------------------------------------------------------------------------------------- | -------- | ------- |
| `quiz_step_1_to_2_cr`                                                                 | 0.64     | >= 0.72 |
| `quiz_step_2_to_3_cr`                                                                 | 0.71     | >= 0.80 |
| `quiz_to_modal_cr`                                                                    | 0.26     | >= 0.34 |
| `modal_to_submit_cr`                                                                  | 0.41     | >= 0.52 |
| `quiz_total_cr`                                                                       | 0.11     | >= 0.18 |
| `trust_block_ctr` (`trust_metric_click + trust_benefit_click`) / `trust_signals_view` | 0.09     | >= 0.14 |
| `feedback_error_rate` = `feedback_form_submit_error` / (`success + error`)            | 0.07     | <= 0.03 |

## 4) Видимый дашборд (минимальный контракт)

Дашборд должен содержать:

1. Карточки KPI с baseline/текущим/целью и цветовым статусом (`ok`/`warning`/`critical`).
2. Funnel по шагам квиза (`start -> step1 -> step2 -> step3 -> modal -> success`).
3. Breakdown по `context` для `cta_open_order_modal` (Hero, Quiz, другие точки входа).
4. Отдельный график `feedback_form_submit_error` с причинами.

## 5) Операционный ритм

- Обновление baseline: 1 раз в квартал.
- Review KPI: еженедельно.
- Если 2 недели подряд KPI ниже baseline — заводится отдельная задача в аудит с гипотезой улучшения.
