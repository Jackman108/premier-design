# Примеры конфигурации Cursor

- **Правила агента (репозиторий):** нормы — в [`../mempalace/rules/`](../mempalace/rules/); в IDE подключаются [`.cursor/rules/agent-mempalace-bootstrap.mdc`](../../.cursor/rules/agent-mempalace-bootstrap.mdc) и [`.cursor/rules/agent-quality-process.mdc`](../../.cursor/rules/agent-quality-process.mdc) (корень git-репозитория).
- **MemPalace MCP:** [`mcp.mempalace.example.json`](mcp.mempalace.example.json) — запуск **stdio-сервера** `python -m mempalace.mcp_server` (не путать с `python -m mempalace mcp`, это только текст подсказки в терминале). В `args` замените путь после `--palace` на каталог вашего дворца (тот же, что в `init`). Полная пошаговая инструкция — [`docs/mempalace/mempalace-agent-memory-ru.md`](../mempalace/mempalace-agent-memory-ru.md).
