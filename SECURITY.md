# Политика безопасности

## Сообщить об уязвимости

Публичные issue для **нераскрытых** проблем безопасности не используйте. Напишите на **admin@premium-design.pro** с темой «Security»: краткое описание, шаги воспроизведения (если есть), затронутые компоненты или URL. Ответ — в разумный срок.

## Поддерживаемые версии

Актуальная линия — **ветка по умолчанию** репозитория и последний задеплоенный production-сборка (`premium-design.pro`). Исправления критичных уязвимостей по возможности бэкпортируются в ту же линию.

## Supply chain

Обновления зависимостей и образов Docker проходят через CI (`yarn audit`, **Trivy** на образе до push в GHCR). Детали процессов — [`docs/guides/scripts-and-quality-gates-ru.md`](docs/guides/scripts-and-quality-gates-ru.md).

---

**English:** For vulnerability reports, email **admin@premium-design.pro** with subject «Security». Do not file public issues for undisclosed vulnerabilities.
