# Аудит Premier Design — v3.0 (спринты) и бэклог v3.1

Индекс: [`docs/README.md`](../README.md) · ADR: [`docs/adr/`](../adr/README.md) · История закрытий: [`premier-design/CHANGELOG.md`](../../premier-design/CHANGELOG.md)

## Статус документа

- **v3.0 (спринты 14–17):** задачи визуальной эстетики, CRO и tech enablers закрыты (см. CHANGELOG: Sprint 14–17).
- **v3.1 (бэклог):** ниже — актуальные невыполненные пункты комплексного аудита (апрель 2026). Выполненные строки из таблиц **не дублируются**; фиксации — в `CHANGELOG.md` под `[Unreleased]`.

---

## Definition of Done (v3.0)

1. Дизайн выглядит консистентно на всех устройствах, отступы подчиняются единой сетке (Panda CSS).
2. Анимации (Framer Motion/CSS) работают плавно (60fps), не вызывают layout shift и отключаются при `prefers-reduced-motion`.
3. Типографика имеет четкую иерархию, шрифты загружаются без мелькания (FOUT/FOIT минимизированы).
4. Маркетинговые элементы (квизы, кейсы, социальное доказательство) полностью функциональны, доступны с клавиатуры (a11y) и отправляют данные в аналитику/CRM.
5. Core Web Vitals остаются в зеленой зоне (>90) несмотря на добавление тяжелого визуала (видео, анимации).

---

## Методика бэклога v3.1

Проанализированы: исходный код `premier-design/`, правила `.cursor/rules/`, документация `docs/`, контент `data/data.json`, конфигурации сборки и CI. Для каждого замечания: **что** → **где** → **куда** (решение) → **почему**.

---

## 1. Дизайн, вёрстка и визуальная составляющая

*Снято с бэклога (реализация и ссылки на файлы — `CHANGELOG.md` [Unreleased]):*

- **«Наш подход»:** `ApproachCards.module.css` — сетка `1 → 2 → 4`, без `margin: 0 30vw` и жёстких `vw` у карточек.
- **Юридические страницы:** `app/documents/layout.tsx`, `app/documents/DocumentSiteShell.tsx`, `DocumentBreadcrumbs` — тот же `Layout`, что и на сайте (шапка, подвал, панель), крошки и токены в стилях крошек.
- **Главная:** `HomePageChrome`, `lib/homeSectionNavConfig.ts`, `id`/`aria-label` на секциях в `pages/index.tsx`; progress по скроллу на мобильных, якорное меню на десктопе; `scroll-padding-top` на `html` в `widgets/styles/globals.css`.
- **Storybook:** `LeadQuiz.stories.tsx`, `TrustSignals.stories.tsx`, glob в `.storybook/main.ts`; дальше — отдельные тёмная/светлая оболочка preview и сценарии шагов квиза по мере необходимости.

| # | Что обнаружено | Где | Куда / решение | Почему |
|---|----------------|-----|----------------|--------|
| — | *Открытых строк по §1 нет; новые замечания добавляются сюда по мере аудита.* | — | — | — |

---

## 2. Контент страниц лендинга — маркетинг

| # | Что обнаружено | Где | Куда / решение | Почему |
|---|----------------|-----|----------------|--------|
| 2.1 | USP главной **размытое**; нет конкретики (город, сегмент, ценовой уровень) | `data/data.json` → `title`, `titlesPage`, `HeroBanner.tsx` | Переформулировать USP | Конкретная выгода > абстракция |
| 2.2 | **Метрики** в `TrustSignals` захардкожены в JSX; при малом числе отзывов претензия на `4.9/5` слабо обоснована | `TrustSignals.tsx`, `data/data.json` | Вынести метрики в JSON; согласовать с данными | Доверие и конверсия |
| 2.3 | **Отзывы** идут **после** `LeadQuiz` — часть пользователей не доскролит до social proof | `pages/index.tsx` | Поднять `Reviews` или дублировать цитаты | CRO |
| 2.4 | **Нет блока FAQ** | — | `features/faq/` + `data.json` + `/`, `/design`, `/repairs` | SEO (FAQPage) + конверсия |
| 2.5 | **Новости** датированы **2023** | `data/data.json` → `news` | Обновить или архивировать | Актуальность |
| 2.6 | **«О нас»** — мало контента: нет команды, истории, лицензий | `pages/about.tsx`, `data/data.json` | Секции команда, вехи, лицензии, регион | Premium positioning |
| 2.7 | **Контакты** — нет micro-USP «почему мы» | `pages/contacts.tsx` | 2–3 bullet перед формой | CRO |
| 2.8 | Портфолио без **бюджетных диапазонов** и метрик «в срок» | `data/data.json` → `examplesCard` | Поля `budgetRange`, метрики сдачи | Social proof с числами |
| 2.9 | **`metaTitle`** для public-offer — ошибочный текст («Политика…» вместо оферты) | `data/data.json` → `titlesPage` | Исправить `metaTitle` | SEO |
| 2.10 | «**в течении**» → «**в течение**» | `data/data.json` → `stepsWork` | Исправить | Грамматика |
| 2.11 | `relatedServices.materials` дублирует `expertise` в `benefits` | `data/data.json` | Уникальные тексты | DRY, SEO |
| 2.12 | `designType.Standard` — дубль строки в списке фич | `data/data.json` → `offerProject.designType` | Удалить дубль | Аккуратность контента |

---

## 3. Структура сайта (продающая архитектура)

| # | Что обнаружено | Где | Куда / решение | Почему |
|---|----------------|-----|----------------|--------|
| 3.1 | Нет **отдельной страницы портфолио** | `pages/` | `/portfolio` или `/cases` | Best-in-class |
| 3.2 | Нет **FAQ** и `FAQPage` JSON-LD | — | См. §2.4 + schema | SEO rich snippets |
| 3.3 | **JSON-LD** только `Organization` | `widgets/layout/seo/utils/generateStructuredData.ts` | LocalBusiness, Service, AggregateRating, areaServed | Rich results |
| 3.4 | Нет **видео** отзывов / объектов | — | Секция video | Конверсия |
| 3.5 | **Калькулятор** только в модалке; нет `/calculator` | `CalculatorButton/` | Standalone landing + SEO | Поисковый трафик |
| 3.6 | Гибрид **`pages/` + `app/`** без ADR | `pages/`, `app/` | ADR: стратегия split или миграция | Next.js практика |

---

## 4. Логика и структура проекта

| # | Что обнаружено | Где | Куда / решение | Почему |
|---|----------------|-----|----------------|--------|
| 4.1 | `useFeedback` вызывает API из `shared/ui/order/hooks/` | `useFeedback.ts` | Адаптер в `features/feedback/` или `shared/lib/` | Правило §1: UI — тонкий слой |
| 4.2 | `from: payload.safeName` в SMTP | `services/dal/feedbackDal.ts` | Фиксированный `from` из env; имя в Reply-To | Deliverability |
| 4.3 | Получатель email **захардкожен** | `feedbackDal.ts` | `process.env.FEEDBACK_EMAIL_TO` | Секреты из env |
| 4.4 | `/api/sitemap` — нет ограничения **метода** | `pages/api/sitemap.ts` | `GET` only → 405 иначе | API best practice |
| 4.5 | Sitemap — нет **zod** / явной документации «вход не используется» | `pages/api/sitemap.ts` | Задокументировать или валидировать | Консистентность API |

---

## 5. Безопасность

| # | Что обнаружено | Где | Куда / решение | Почему |
|---|----------------|-----|----------------|--------|
| 5.1 | CSP: **`'unsafe-inline'`** для `script-src` | `next.config.js` | Nonce/hash при возможности | OWASP CSP |
| 5.2 | `img-src` — **`https:`** (любой источник) | `next.config.js` | Сузить до реальных доменов | Attack surface |
| 5.3 | `connect-src` — **`'self' https:`** широко | `next.config.js` | Конкретные домены | Exfiltration |
| 5.4 | `dangerouslyAllowSVG: true` | `next.config.js` | ADR: только доверенные источники | XSS риск |
| 5.5 | Rate limit **in-memory** | `shared/lib/rateLimit.ts` | Edge/KV при multi-instance | Надёжность |
| 5.6 | `x-forwarded-for` — первый hop | `applyApiRateLimit.ts` | Trust proxy только для доверенных | Spoofing |
| 5.7 | Логи ошибок feedback — полный объект ошибки | `submitFeedback.ts` | message + correlation id | Утечки в логах |
| 5.8 | CORS не задокументирован (same-origin) | — | ADR/гайд | Прозрачность |

---

## 6. Производительность

| # | Что обнаружено | Где | Куда / решение | Почему |
|---|----------------|-----|----------------|--------|
| 6.1 | Initial JS **~711 KB / 750 KB** бюджет | `check-initial-js-budget.mjs` | `yarn analyze`, splitting | Правило §8 |
| 6.2 | `react-chatbot-kit` в чанке без открытия чата | `ChatBotSidebar/`, `ButtonsPanel` | `import()` по клику | Ленивая загрузка |
| 6.3 | Нет `preconnect` для карт / внешних ресурсов | `CustomHead/`, `address/` | `<link rel="preconnect">` | Latency |
| 6.4 | `ArrowButton` + `<Image>` — проверить размеры | `ArrowButton.tsx` | Явные width/height | CLS |
| 6.5 | Lighthouse CI на Windows пропускается | `check-lighthouse-budget.mjs` | WSL2 / `PERF_AUDIT_FORCE_LIGHTHOUSE` | `PERF_AND_SEO_CHECKLIST_RU.md` |
| 6.6 | `pageExtensions` включает `mdx`, `md` без контента | `next.config.js` | Убрать лишнее | Router overhead |

---

## 7. Прочее

| # | Что обнаружено | Где | Куда / решение | Почему |
|---|----------------|-----|----------------|--------|
| 7.1 | `robots.txt` — проверить **Sitemap:** | `public/robots.txt` | Явный URL sitemap | SEO crawl |
| 7.2 | `react-chatbot-kit` (2022) — риск зависимости | `package.json` | Альтернативы / ADR | CVE, поддержка |
| 7.3 | Нет **Web Analytics** (YM/GA4) в коде | `_app.tsx`, `app/layout.tsx` | Тег или GTM | `MARKETING_ANALYTICS_DASHBOARD_RU.md` |
| 7.4 | Тесты: покрытие в основном **feedback** | `tests/` | Smoke sitemap, хуки | Пирамида тестов |

---

## Сводка приоритетов (актуальное)

| Приоритет | Ориентир | Примеры ID |
|-----------|----------|------------|
| **Критичный** | Безопасность / корректность | §5.1–5.4, §5.7, §2.9 |
| **Высокий** | Маркетинг / конверсия | §2.1–2.4, §2.6–2.8, §3.2–3.4, §7.4 |
| **Средний** | Структура / SEO / perf | §3.1, §3.3, §3.5–3.6, §4.*, §6.*, §7.5 |
| **Низкий** | Контент-полировка | §2.5, §2.10–2.12, §7.2–7.3 |

---

*Последнее обновление бэклога: 17 апреля 2026. Закрытые пункты прежнего «полного аудита» (в т.ч. § несоответствия правилам) зафиксированы в `premier-design/CHANGELOG.md`.*
