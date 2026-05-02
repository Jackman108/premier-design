# Аудит проекта — Premier Design (индекс)

Полный индекс документации — [`docs/README.md`](../README.md). Здесь — сводный статус аудита и UI; бэклог: [`audit-and-improvement-plan-ru.md`](./audit-and-improvement-plan-ru.md) · риски: [`project-risk-register-2026-04-ru.md`](./project-risk-register-2026-04-ru.md) · деплой: [`deploy-readiness-ru.md`](./deploy-readiness-ru.md).

Правила агента: [`.cursor/rules/agent-mempalace-bootstrap.mdc`](../../.cursor/rules/agent-mempalace-bootstrap.mdc), [`.cursor/rules/agent-quality-process.mdc`](../../.cursor/rules/agent-quality-process.mdc). Канон норм: [`docs/mempalace/rules/`](../mempalace/rules/).

## Статус сводного аудита по 12 направлениям

Полный разбор (дизайн, архитектура, данные, структура, рефакторинг, паттерны, безопасность, зависимости, перфоманс, API/SLO, документация, правила) **закрыт**: все пункты на момент апреля 2026 приведены к `[x]`. Детальные таблицы по направлениям из документа удалены как выполненные; при необходимости восстановления смотрите историю git и записи в [`changelog.md`](../changelog.md).

**Процесс при новых задачах:** открытые пункты — только в [`audit-and-improvement-plan-ru.md`](./audit-and-improvement-plan-ru.md); после закрытия — [`changelog.md`](../changelog.md), при смене гейтов — [`quality-gates-sync-ru.md`](./quality-gates-sync-ru.md).

## Направления улучшения дизайна, вёрстки и визуального уровня

Раздел показывает **понятный статус по UI-качеству**: что уже закрыто и что остаётся в бэклоге. Основа — токены (`styles/tokens.css`), глобальные стили и фактические изменения в [`changelog.md`](../changelog.md).

### Открытые улучшения (следующий цикл)

Открытые пункты по сводному портфельному аудиту (PART) — в [`audit-and-improvement-plan-ru.md`](./audit-and-improvement-plan-ru.md). Прочие мелкие задачи — там же.

| Задача                                                   | Статус                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------- |
| Формы: `:autofill` / `:-webkit-autofill`, `autocomplete` | Выполнено                                                             |
| Микродвижение и `prefers-reduced-motion`                 | Выполнено (глобальный fallback + проверка декоративных анимаций)      |
| Визуальный регресс/контраст в CI                         | Выполнено (добавлен e2e visual smoke `e2e/visual-regression.spec.ts`) |
| Современные приёмы (опционально)                         | Закрыто как отложенное улучшение (вне текущего релизного цикла)       |

**Как вести раздел дальше:**

- новые незакрытые UI-задачи — в [`audit-and-improvement-plan-ru.md`](./audit-and-improvement-plan-ru.md);
- после реализации — фикс в [`changelog.md`](../changelog.md) и перевод пункта в блок «Выполнено» здесь;
- если меняются гейты/процесс релиза — синхронизировать с [`quality-gates-sync-ru.md`](./quality-gates-sync-ru.md) и [`deploy-readiness-ru.md`](./deploy-readiness-ru.md).

---
