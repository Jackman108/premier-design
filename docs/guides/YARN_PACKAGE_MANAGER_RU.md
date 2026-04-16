# Зависимости: только Yarn

## Правило

- **Единственный lock-файл в git:** `premier-design/yarn.lock`.
- **`package-lock.json` не коммитим** (игнор в `premier-design/.gitignore`). Если npm создал файл локально — удалите или не добавляйте в коммит.
- Установка и CI: **`yarn install`**, **`yarn install --frozen-lockfile`** в пайплайнах.

## Аудит уязвимостей

- В CI: `yarn audit --level critical` (см. `.github/workflows/ci.yml`).
- Локально перед релизом: `yarn audit` или с нужным уровнем.

## Не использовать

- Скрипт `npm install --package-lock-only` и хранение `package-lock.json` в репозитории — снято; не возвращать без отдельного ADR.
