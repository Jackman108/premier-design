# Готовность к деплою и финальные улучшения (апрель 2026)

Документ для **релиза сайта услуг** (ремонт и дизайн интерьеров): что проверить перед выкладкой, какие доработки дают максимум эффекта при минимальном риске, куда смотреть после деплоя.

Связанные материалы: [AUDIT_AND_IMPROVEMENT_PLAN_RU.md](AUDIT_AND_IMPROVEMENT_PLAN_RU.md) · [PERF_AND_SEO_CHECKLIST_RU.md](../guides/PERF_AND_SEO_CHECKLIST_RU.md) · [DEPLOY_SSH_GITHUB_ACTIONS_RU.md](../guides/DEPLOY_SSH_GITHUB_ACTIONS_RU.md) · ADR в [../adr/README.md](../adr/README.md).

---

## 1. Критерий «можно выкатывать»

| Проверка | Команда / артефакт | Ожидание |
|----------|-------------------|----------|
| **Сводная локально (из каталога `premier-design/`)** | `yarn check:deploy:local` | lint + unit + build + initial JS + architecture + ui-purity + feature-structure |
| Линтер | `yarn lint` | без ошибок |
| Юнит-тесты | `yarn test --watch=false` | все зелёные |
| Сборка | `yarn build` | успех |
| Бюджет initial JS главной | `node ./scripts/check-initial-js-budget.mjs` после `yarn build` | ≤ `INITIAL_JS_BUDGET_KB` (дефолт 750 KB) |
| Quality-gate (как в CI) | `yarn check:perf:ci` | Lighthouse + initial JS (на Windows Lighthouse может быть пропущен — см. PERF-гайд) |
| Границы слоёв / UI-чистота | `yarn check:architecture`, `yarn check:ui-purity` | без новых нарушений |
| E2E smoke | `yarn test:e2e` (нужен `yarn dev` или `yarn start` + `baseURL` из Playwright) | ключевые сценарии в `e2e/smoke.spec.ts` |

---

## 2. Окружение и секреты

- Все секреты только из **env** на хосте / в Vercel; в git не коммитить ключи и пароли SMTP.
- Форма обратной связи: переменные из `README` / `feedbackDal` (SMTP, лимиты); проверить доставку на тестовый ящик после деплоя.
- Rate limit API: при деплое за **несколько инстансов** — учесть ограничения in-memory (ADR [0005](../adr/0005-rate-limiting-storage-and-client-ip.md)); при масштабировании — вынести хранилище счётчиков.
- Доверие к `X-Forwarded-For`: включать `RATE_LIMIT_TRUST_FORWARDED_FOR` только за доверенным прокси с корректной подстановкой IP.

---

## 3. Домен, SEO и юридические страницы

- **Canonical и sitemap:** базовый URL `https://premium-interior.by` в `pages/api/sitemap.ts`, `public/robots.txt`, JSON-LD — согласованы с продакшен-доменом.
- **Новые маршруты** (`/portfolio`, `/calculator`): есть в меню, в `data.json` (`titlesPage`), в sitemap; smoke вручную или e2e.
- **Юр. документы** (`app/documents/*`): открытие с основного сайта, крошки, отсутствие регрессий `next/router` на App Router.

---

## 4. Безопасность и заголовки

- CSP, `img-src`, `connect-src` — как в `next.config.js`; при подключении аналитики — отдельный PR с обновлением `script-src` (см. [0004](../adr/0004-csp-tightening-and-trusted-svg.md), [0009](../adr/0009-web-analytics-deferred.md)).
- `Strict-Transport-Security` и `upgrade-insecure-requests` — только при HTTPS (`VERCEL=1` или `ENABLE_HTTPS_SECURITY_HEADERS=true`), иначе локальные проверки и Lighthouse ломаются.

---

## 5. Производительность и UX

- **LCP:** hero с `next/image`, `priority` на главной; без лишних тяжёлых скриптов в первом экране.
- **Анализ бандла:** `yarn analyze`; при необходимости открыть отчёт — `ANALYZE_OPEN=true` (см. комментарий в `next.config.js`).
- **Lighthouse на Windows:** по умолчанию шаг может пропускаться; полный прогон — CI или `PERF_AUDIT_FORCE_LIGHTHOUSE=true` ([PERF_AND_SEO_CHECKLIST_RU.md](../guides/PERF_AND_SEO_CHECKLIST_RU.md)).
- **Шапка (десктоп):** при росте числа пунктов меню — flex + перенос навигации на вторую строку и динамическая высота плейсхолдера при sticky (`useHeaderPlaceholderHeight`).
- **Галерея (PhotoViewer):** закрытие по клику на полупрозрачную подложку (вне кадра изображения), по **Escape**, по кнопке «Закрыть окно»; предупреждения `next/image` по соотношению сторон — устранены.

---

## 6. Маркетинг и конверсия (услуги)

- **Заявки и CTA:** smoke всех точек входа в форму (hero, панель, офферы, услуги).
- **Аналитика:** до внедрения счётчиков — [MARKETING_ANALYTICS_DASHBOARD_RU.md](../guides/MARKETING_ANALYTICS_DASHBOARD_RU.md) и ADR [0009](../adr/0009-web-analytics-deferred.md); после внедрения — проверка событий в превью/проде и согласование с cookies.
- **Контент:** актуальность телефонов, адреса, блока доверия и FAQ под реальные процессы приёма заявок.

---

## 7. После деплоя (короткий чеклист)

1. Главная, `/portfolio`, `/calculator`, типовая услуга, контакты, одна юр. страница.
2. Отправка формы обратной связи (успех + ошибка с `correlationId` в логах, без утечки стека клиенту).
3. `GET /api/sitemap` и `https://<домен>/sitemap.xml` (rewrite).
4. Ручной или автоматический Lighthouse на проде (после стабилизации кэша).

---

## 8. Оставшийся техдолг (не блокирует первый деплой)

- Замена или изоляция `react-chatbot-kit` при появлении рисков по CVE — ADR [0008](../adr/0008-react-chatbot-kit-dependency.md).

---

*Версия документа: апрель 2026. При изменении процесса релиза обновляйте этот файл и ссылку из [docs/README.md](../README.md).*
