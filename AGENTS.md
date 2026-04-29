# Premier Design — заметки для агента

- **Приложение Next.js** — каталог [`premier-design/`](premier-design/README.md) (отдельно от `docs/` в корне репозитория); **доменные типы только в [`entities/`](premier-design/entities/index.ts)** (`@entities/*`), без дублей в `shared/interface` (PD-R-05).
- **Документация** — [`docs/README.md`](docs/README.md): гайды, аудит, ADR, MemPalace (`docs/mempalace/rules/`), changelog — [`docs/changelog.md`](docs/changelog.md).
- **Правила Cursor:** [`.cursor/rules/agent-mempalace-bootstrap.mdc`](.cursor/rules/agent-mempalace-bootstrap.mdc), [`.cursor/rules/agent-quality-process.mdc`](.cursor/rules/agent-quality-process.mdc) — гейты и синхронизация с [`docs/audit/quality-gates-sync-ru.md`](docs/audit/quality-gates-sync-ru.md).
- **Кросс-репозиторий Feb Code / VPS:** [`docs/audit/cross-repo-alignment-ru.md`](docs/audit/cross-repo-alignment-ru.md), общий rule pack — [`docs/guides/cross-repo-rule-pack-ru.md`](docs/guides/cross-repo-rule-pack-ru.md); инфра VPS — соседний репозиторий **lendings-vps-infra** (compose/nginx не в этом репо).
- **Deploy:** указатель [`deploy/README.md`](deploy/README.md); образ GHCR — `.github/workflows/ghcr-premium-design.yml`.
