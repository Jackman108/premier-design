# Аудит проекта — Premier Design (индекс, апрель 2026)

Индекс: [`docs/README.md`](../README.md) · Открытый бэклог: [`AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](./AUDIT_AND_IMPROVEMENT_PLAN_RU.md) · Риски: [`PROJECT_RISK_REGISTER_2026_04_RU.md`](./PROJECT_RISK_REGISTER_2026_04_RU.md) · Деплой: [`DEPLOY_READINESS_2026_04_RU.md`](./DEPLOY_READINESS_2026_04_RU.md)

Правила агента: [`.cursor/rules/agent-architecture-clean-code.mdc`](../../.cursor/rules/agent-architecture-clean-code.mdc), [`.cursor/rules/agent-context-bootstrap.mdc`](../../.cursor/rules/agent-context-bootstrap.mdc). Mempalace: [`docs/mempalace/rules/`](../mempalace/rules/).

## Статус сводного аудита по 12 направлениям

Полный разбор (дизайн, архитектура, данные, структура, рефакторинг, паттерны, безопасность, зависимости, перфоманс, API/SLO, документация, правила) **закрыт**: все пункты на момент апреля 2026 приведены к `[x]`. Детальные таблицы по направлениям из документа удалены как выполненные; при необходимости восстановления смотрите историю git и записи в [`premier-design/CHANGELOG.md`](../../premier-design/CHANGELOG.md).

**Процесс при новых задачах:** открытые пункты — только в [`AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](./AUDIT_AND_IMPROVEMENT_PLAN_RU.md); после закрытия — `CHANGELOG.md`, при смене гейтов — [`QUALITY_GATES_SYNC_RU.md`](./QUALITY_GATES_SYNC_RU.md).

---

## Таблица: отклонения от строгого FSD (актуализация)

Гейт [`scripts/check-architecture-boundaries.mjs`](../../premier-design/scripts/check-architecture-boundaries.mjs): запрет `shared` → `@features/*` / `@services/*`, запрет **cross-feature** между разными слайсами `features/*`.

**Снято рефакторингом (ранее в таблице):** SEO-типы и `getFullCanonicalUrl` вынесены в `shared/interface/seoHead.props.ts` и `shared/utils/getFullCanonicalUrl.ts`; `getCommonProps` + finders перенесены в `lib/`; `useViewportMobile` в `shared`, композиция с меню — `widgets/layout/hooks/useResizeEffects.ts`.

| Участок | Файл(ы) | Суть | Примечание |
|--------|---------|------|------------|
| **lib → shared (данные)** | `lib/getCommonProps.ts`, `lib/findService.ts`, `lib/findRelatedService.ts`, `getStaticData` | Тип **`DataProps`** из **`@shared/validates/dataPropsSchema`** (`z.infer`) | Next-обвязка и виджеты используют один контракт с JSON; см. [`CODE_STRUCTURE_AND_NAMING_RU.md`](../guides/CODE_STRUCTURE_AND_NAMING_RU.md). |
| **widgets → UI фич** | `widgets/layout/ui/footer/Footer.tsx` и др. | Импорт **`@features/<slice>`** из баррелей `features/<slice>/index.ts` | Композиция виджетов; подпись подрядчика — отдельный `DeveloperCredit`, URL в `shared/constants/company.ts`. |

**Соблюдается:** нет `shared` → `@widgets` / `@features` / `@services`; нет cross-feature; фичи не импортируют `find*` из другого слайса через `lib`.

---

## Направления улучшения дизайна, вёрстки и визуального уровня

Список основан на обзоре токенов (`styles/tokens.css`, `panda.config.ts`), глобальных стилей, фокус-состояний и паттернов секций. Не дублирует закрытый аудит perf/a11y — это **продуктово-визуальный** бэклог.

1. **Единая шкала отступов и сетка** — свести «случайные» отступы в модулях к шагам из токенов (или Panda spacing), проверить выравнивание секций на широких экранах (max-width контейнера + ритм вертикали).
2. **Оптическая иерархия заголовков** — `clamp` уже используется; проверить согласованность `h1–h4` между лендингом и внутренними страницами услуг, избежать скачков веса/межбуквенного без причины.
3. **Длина строки и читаемость** — для длинных текстов (новости, описания услуг) задать `max-width` в `ch` и комфортный `line-height` (уже частично в токенах — довести до всех prose-блоков).
4. **Интерактивы на touch** — убедиться, что все кликабельные зоны ≥ 44×44 px (или эквивалент с padding); плавающая панель уже учитывает `safe-area-inset-bottom` — распространить на остальные fixed/sticky элементы.
5. **Состояния наведения vs touch** — где есть тяжёлые hover-эффекты, добавить `@media (hover: hover)` чтобы на тач не оставалось «липких» подсветок.
6. **Скелетоны и переключение контента** — для `next/dynamic` секций рассмотреть единый skeleton/shimmer вместо пустого `loading: null`, чтобы снизить CLS и ощущение «прыжка».
7. **Карточки и глубина** — унифицировать тени/бордеры (`--shadow-*`, `--color-border`) между карточками услуг, прайса, примеров; избежать смешения «плоских» и «псевдо-3D» карточек в одном скролле без смысла.
8. **Тёмная тема** — пройтись по секциям с фото/градиентами и легаси `--gray*`: везде ли текст остаётся контрастным (не только hero); при необходимости завести семантические фоны для «тёмных плашек поверх изображения».
9. **Фокус и клавиатура** — `focus-visible` уже точечно; аудит оставшихся кнопок/ссылок без явного кольца; единый цвет/толщина outline в токенах.
10. **Формы** — стили `:autofill` / `:-webkit-autofill` для полей, явные `autocomplete`, визуальное равенство плейсхолдера и заполненного значения.
11. **Микродвижение** — для декоративных анимаций проверить `prefers-reduced-motion` (как в тосте успеха); не опираться на motion для смысла.
12. **Современные приёмы (опционально)** — по мере обновления стека: лёгкие View Transitions между страницами, `content-visibility` для длинных списков, `scroll-driven` анимации там, где есть fallback.
13. **Визуальный регресс / контраст** — расширить контроль: периодический прогон axe/pa11y или скриншот-тесты критичных секций в CI (см. существующие гейты в `scripts/`).

---

## Приложения

- Риски: [`PROJECT_RISK_REGISTER_2026_04_RU.md`](./PROJECT_RISK_REGISTER_2026_04_RU.md).
- Правила: [`.cursor/rules/`](../../.cursor/rules/), [`docs/mempalace/rules/`](../mempalace/rules/).
- История: [`premier-design/CHANGELOG.md`](../../premier-design/CHANGELOG.md).
