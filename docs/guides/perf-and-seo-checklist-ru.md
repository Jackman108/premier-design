# Чеклист производительности и SEO

Используйте перед релизом и после крупных изменений в вёрстке или контенте.

См. также: [деплой и CI/CD](deploy-ssh-github-actions-ru.md), индекс [документации](../README.md).

## Производительность (Web Vitals)

1. **Сборка и бандл:** `yarn analyze` — найти тяжёлые чанки; тяжёлые виджеты оставлять за `dynamic(..., { ssr: false })` при отсутствии SEO-ценности SSR.
2. **LCP:** крупные изображения через `next/image` с корректными `width`/`height` или `fill` + приоритет для hero.
3. **CLS:** резервировать место под медиа и шрифты; избегать вставки контента над первым экраном без layout.
4. **INP:** минимизировать долгие задачи в обработчиках событий; дробить тяжёлые эффекты.

## Изображения

- Локальные ассеты в `public/`; удалённые источники — только через `images.remotePatterns` в `next.config.js`.
- SVG: оставлять текущую политику CSP/sandbox для векторов из недоверенных источников.

## SEO

- Уникальные `<title>` и мета-описания на ключевых страницах.
- Корректный `sitemap.xml` и отсутствие блокирующих `noindex` на продакшене без причины.
- Структурированные данные — по мере появления схем в проекте (отдельная задача).

## Наблюдаемость

- В CI включен quality-gate `yarn check:perf:ci` (Lighthouse mobile + budget initial JS главной). Пороговые env: `PERF_BUDGET_SCORE`, `PERF_BUDGET_LCP_MS`, `PERF_BUDGET_CLS`, `PERF_BUDGET_INP_MS`, `PERF_BUDGET_TBT_MS`, `INITIAL_JS_BUDGET_KB`.
- Скрипт Lighthouse поднимает production через `node .next/standalone/server.js` (конфиг `output: 'standalone'`); INP в lab-прогоне может отсутствовать — тогда порог INP не применяется.
- **Windows:** по умолчанию шаг Lighthouse в `check:perf:lighthouse` пропускается (нестабильный headless / interstitial). В консоль всё равно выводятся **пороги CI**; фактические цифры — в логе Linux job или в файле `premier-design/.lighthouse-perf-summary.json` после прогона (на Windows при пропуске там `skipped: true`). Полный gate в CI (GitHub Actions). Локально принудительно: `PERF_AUDIT_FORCE_LIGHTHOUSE=true`. Отключить Lighthouse: `PERF_AUDIT_SKIP_LIGHTHOUSE=true`.
- **HTTPS-заголовки:** заголовок `Strict-Transport-Security` включается только при `VERCEL=1` или `ENABLE_HTTPS_SECURITY_HEADERS=true` (и не при `LOCAL_HTTP_STACK=1`). Директива CSP `upgrade-insecure-requests` в приложении не используется — иначе на голом HTTP (локально, docker `:8080`) браузер переводит `/_next/*` на `https://` без TLS. На голом HTTP не включать жёсткий hardened-режим для локальных проверок и Lighthouse.
- Локальная проверка перед PR: `yarn build && yarn check:perf:ci` (на Windows Lighthouse может быть пропущен — см. выше).
- Search Console и ручной Lighthouse-аудит после выкладки.
