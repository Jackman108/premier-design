# Аудит проекта — Premier Design (индекс, апрель 2026)

Индекс: [`docs/README.md`](../README.md) · Открытый бэклог: [`AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](./AUDIT_AND_IMPROVEMENT_PLAN_RU.md) · Риски: [`PROJECT_RISK_REGISTER_2026_04_RU.md`](./PROJECT_RISK_REGISTER_2026_04_RU.md) · Деплой: [`DEPLOY_READINESS_2026_04_RU.md`](./DEPLOY_READINESS_2026_04_RU.md)

Правила агента: [`.cursor/rules/agent-architecture-clean-code.mdc`](../../.cursor/rules/agent-architecture-clean-code.mdc), [`.cursor/rules/agent-context-bootstrap.mdc`](../../.cursor/rules/agent-context-bootstrap.mdc). Mempalace: [`docs/mempalace/rules/`](../mempalace/rules/).

## Статус сводного аудита по 12 направлениям

Полный разбор (дизайн, архитектура, данные, структура, рефакторинг, паттерны, безопасность, зависимости, перфоманс, API/SLO, документация, правила) **закрыт**: все пункты на момент апреля 2026 приведены к `[x]`. Детальные таблицы по направлениям из документа удалены как выполненные; при необходимости восстановления смотрите историю git и записи в [`premier-design/CHANGELOG.md`](../../premier-design/CHANGELOG.md).

**Процесс при новых задачах:** открытые пункты — только в [`AUDIT_AND_IMPROVEMENT_PLAN_RU.md`](./AUDIT_AND_IMPROVEMENT_PLAN_RU.md); после закрытия — `CHANGELOG.md`, при смене гейтов — [`QUALITY_GATES_SYNC_RU.md`](./QUALITY_GATES_SYNC_RU.md).

---

## Таблица: код и зависимости, расходящиеся со строгим FSD

В проекте включён гейт [`scripts/check-architecture-boundaries.mjs`](../../premier-design/scripts/check-architecture-boundaries.mjs): `shared` → `@features/*` / `@services/*` (запрещено), **cross-feature** между разными слайсами `features/*` (запрещено). Ниже — случаи, которые **гейт не проверяет** или где зависимость **осознанно разрешена** документацией, но выбивается из «идеального» Feature-Sliced Design.

| Участок | Файл(ы) | Суть отклонения | Примечание / направление исправления |
|--------|---------|-----------------|-------------------------------------|
| **shared → widgets (инверсия слоя)** | `shared/ui/title/interface/Title.props.ts` | Типы из `@widgets/layout/seo/CustomHead/CustomHead.props` | Вынести общий контракт SEO-заголовка в `shared/` или в `widgets` только потреблять пропсы без обратного импорта из shared-типов виджета |
| **shared → widgets** | `shared/utils/getCommonProps.ts` | `DataProps` из `@widgets/interface/interfaceData` | Свести тип страничных пропсов к `shared`-уровню (например `shared/types/pageData.ts`) или перенести сборку пропсов на уровень `pages`/`widgets` |
| **shared → widgets** | `shared/hooks/useResizeEffects.ts`, `shared/hooks/usePageData.ts` | Хуки тянут `@widgets/layout/...` | Разорвать цикл: общая логика в `shared`, привязка к layout — в `widgets/layout/hooks` с композицией |
| **shared → widgets (тест)** | `shared/hooks/__tests__/useResizeEffects.test.ts` | Мок/импорт `@widgets/layout/hooks/useMobileMenu` | После рефакторинга хуков — тест только на `shared` |
| **lib → features** | `lib/staticPropsHandler.ts` (+ тест) | Утилиты `findService`, `findRelatedService` из `@features/.../utils` | Зафиксировано в [`docs/guides/CODE_STRUCTURE_AND_NAMING_RU.md`](../guides/CODE_STRUCTURE_AND_NAMING_RU.md) как обвязка Next; строго по FSD — вынести поиск в `shared/lib` или в тонкий «процесс» без привязки к слайсу фичи |
| **widgets → UI фич (глубокая композиция)** | `widgets/layout/ui/footer/Footer.tsx` и др. | Прямой импорт `@features/*/ui/...` | Для строгого FSD иногда предпочитают композицию на `pages` или публичные `index` фич; текущий вариант типичен и допустим как осознанный компромисс |

**Уже соблюдается гейтом:** нет `shared` → `@features` (static/dynamic), нет cross-feature между разными именами слайсов в `features/`.

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
