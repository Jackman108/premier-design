# Premier Design — заметки для агента

- **Приложение Next.js** — каталог [`premier-design/`](premier-design/README.md): **App Router** (`app/` — алиасы **`@app`**, **`@app/*`**), без каталога `pages/`; **`@pages`**, **`@pages/*`**, **`@pages-layer/*`** → [`pages-layer/`](premier-design/pages-layer/) (паритет с Feb Code). Доменные типы — **[`entities/`](premier-design/entities/index.ts)** (`@entities/*`, PD-R-05), без дублей в `shared/interface`.
- **Документация** — [`docs/README.md`](docs/README.md): гайды, аудит, ADR, MemPalace (`docs/mempalace/rules/`), changelog — [`docs/changelog.md`](docs/changelog.md).
- **Правила Cursor:** [`.cursor/rules/agent-mempalace-bootstrap.mdc`](.cursor/rules/agent-mempalace-bootstrap.mdc), [`.cursor/rules/agent-quality-process.mdc`](.cursor/rules/agent-quality-process.mdc) — гейты и синхронизация с [`docs/audit/quality-gates-sync-ru.md`](docs/audit/quality-gates-sync-ru.md).
- **Кросс-репозиторий Feb Code / VPS:** [`docs/audit/cross-repo-alignment-ru.md`](docs/audit/cross-repo-alignment-ru.md), общий rule pack — [`docs/guides/cross-repo-rule-pack-ru.md`](docs/guides/cross-repo-rule-pack-ru.md); инфра VPS — соседний репозиторий **lendings-vps-infra** (compose/nginx не в этом репо).
- **Deploy:** указатель [`deploy/README.md`](deploy/README.md); образ GHCR — `.github/workflows/ghcr-premium-design.yml`.
