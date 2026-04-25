# MemPalace: память для агента (опционально)

[MemPalace](https://github.com/MemPalace/mempalace) — локальная система долговременной памяти для AI-агентов (semantic search, MCP, без обязательных облачных API). Официальные источники: репозиторий на GitHub, пакет PyPI и документация на [mempalaceofficial.com](https://mempalaceofficial.com) (см. предупреждение о поддельных доменах в README проекта).

## Документы в `docs/mempalace/`

| Файл | Назначение |
|------|------------|
| Этот файл | Установка, `init`, `mine`, MCP, безопасность |
| [`MEMPALACE_USAGE_RU.md`](MEMPALACE_USAGE_RU.md) | Эксплуатация: `search`, `status`, UTF-8, переиндексация, сбои |
| [`README.md`](README.md) | Оглавление набора `rules/*.md` и синхронизация с дворцом |

**Канон норм для агента и команды** — тексты в **`docs/mempalace/rules/`** (`01`–`12`) и [`README.md`](README.md); репозиторные merge-инварианты — в конце [`rules/01_WEB_ARCHITECTURE_AND_BOUNDARIES_RU.md`](rules/01_WEB_ARCHITECTURE_AND_BOUNDARIES_RU.md). В Cursor подключается правило [`.cursor/rules/agent-mempalace-bootstrap.mdc`](../../.cursor/rules/agent-mempalace-bootstrap.mdc) (MemPalace-first: Read из репо + при наличии MCP — семантический поиск по дворцу). Процесс и гейты — [`.cursor/rules/agent-quality-process.mdc`](../../.cursor/rules/agent-quality-process.mdc). MemPalace **вне git** дополняет **личный** контур памяти (RAG), но не подменяет файлы в репозитории.

**Индексация в дворец:** скопируйте в каталог `$mp` (вне git) файлы из [`rules/`](rules/) и при необходимости **эти же гайды** (`MEMPALACE_*_RU.md`), затем выполните `mine $mp` — агент в Cursor с MCP сможет искать по тому же содержимому, что проиндексировано локально.

---

## Пошаговая оптимальная настройка (с комментариями)

Ниже — порядок, в котором обычно делают **первый рабочий контур**: установка → дворец вне git → индексация → проверка → MCP в Cursor.

### Шаг 1. Python и пакет

**Действие:** установить MemPalace в пользовательский site-packages или через pipx.

```bash
pip install --user mempalace
```

**Зачем:** так не нужны права администратора; версия Python та же, что будет у терминала Cursor (желательно 3.9+).

**Проверка:**

```bash
python -c "import mempalace; print('ok')"
```

**Зачем:** убедиться, что `python` в PATH — именно его потом укажете в `mcp.json` как `command`, если не используете полный путь к `python.exe`.

---

### Шаг 2. Кодировка консоли (только Windows, по желанию)

**Действие:** при сбоях `... --help` с `UnicodeEncodeError`:

```powershell
$env:PYTHONIOENCODING='utf-8'
```

**Зачем:** справка CLI может содержать символы вне cp1251; на **работу MCP-сервера** это обычно не влияет. Для **`search`** и других команд с Unicode в выводе задайте также `PYTHONUTF8=1` (см. [`MEMPALACE_USAGE_RU.md`](MEMPALACE_USAGE_RU.md)).

---

### Шаг 3. Каталог дворца вне репозитория

**Действие:** выбрать постоянный путь (не внутри git-клона Premier Design), создать папку. Рекомендуемое имя — с суффиксом проекта, например `mempalace-premier-design`, чтобы не смешивать с другими дворцами.

**Windows (PowerShell):**

```powershell
$mp = "$env:USERPROFILE\Documents\mempalace-premier-design"
New-Item -ItemType Directory -Force -Path $mp | Out-Null
```

**macOS / Linux:**

```bash
MP="$HOME/mempalace-premier-design"
mkdir -p "$MP"
```

**Зачем:** ChromaDB и артефакты не должны попадать в коммиты; проще бэкапить и не путать с кодом сайта.

---

### Шаг 4. `init` — конфиг дворца

**Действие:** `init` принимает **уже существующий** каталог (иначе `Directory not found`).

**Windows:**

```powershell
python -m mempalace init $mp --yes
```

**macOS / Linux:**

```bash
python3 -m mempalace init "$MP" --yes
```

**Зачем:** появится `mempalace.yaml` и базовая структура «комнат»; `--yes` — без интерактива на первом сканировании.

---

### Шаг 5. Индексация (`mine`) — сначала «холостой» прогон

**Действие:** указать **тот же корневой каталог «проекта»**, в котором уже лежит **`mempalace.yaml`** после `init` (MemPalace проверяет это явно).

```powershell
# $mp — тот же путь, что в шаге 3–4 (после init внутри него есть mempalace.yaml)
python -m mempalace mine $mp --dry-run
```

**macOS / Linux:** `python3 -m mempalace mine "$MP" --dry-run` (переменная `MP` из шага 3).

**Зачем:** `--dry-run` показывает, что будет проиндексировано, без записи в векторное хранилище.

**Важно — путь к `mine`:**

- **Нельзя** передать только подпапку репозитория (например `...\premier-design\.cursor\rules`), если там **не** выполняли `init`: будет ошибка `No mempalace.yaml found`. Файл конфигурации комнат должен находиться **в корне аргумента `dir`**.
- Чтобы индексировать **только** правила или `docs/`, не мешая git: заведите каталог вне клона, сделайте `init`, **скопируйте** туда нужные `.md` / `.mdc`, затем `mine` **этого** каталога.

**Важно — «Files: 0» в выводе `mine`:** в каталоге нет файлов, которые MemPalace берёт в режиме `projects` (или все отфильтрованы). Пустой дворец с одним `mempalace.yaml` даст ноль файлов — добавьте содержимое (заметки, копии из `docs/mempalace/rules/`).

**Важно — строка `Palace: .../.mempalace/palace`:** это путь к **векторному хранилищу** по умолчанию; он может отличаться от папки с `mempalace.yaml`. Для MCP в Cursor путь к «логическому» дворцу всё равно задаётся через **`--palace`** у `mcp_server` (шаг 9), как в примере.

**Про `.gitignore`:** при `mine` по дереву с репозиторием по умолчанию игнорируются игнорируемые git’ом пути (меньше шума). Флаги: `python -m mempalace mine --help`.

---

### Шаг 6. Реальная индексация

**Действие:** убрать `--dry-run` (при необходимости задать `--wing`, `--limit` для теста).

```powershell
python -m mempalace mine $mp
```

**macOS / Linux:** `python3 -m mempalace mine "$MP"`.

**Зачем:** заполнить дворец содержимым, по которому потом будет работать поиск и MCP.

---

### Шаг 7. Статус

**Действие:**

```bash
python -m mempalace status
```

**Зачем:** быстро убедиться, что «что-то уже положено в дворец». Подробнее — [`MEMPALACE_USAGE_RU.md`](MEMPALACE_USAGE_RU.md).

---

### Шаг 8. Уточнить команду MCP (официальная подсказка)

**Действие:**

```bash
python -m mempalace mcp
```

**Зачем:** MemPalace выводит актуальную строку для клиентов; для **stdio-сервера** в Cursor нужен именно процесс **`python -m mempalace.mcp_server`**, а не подкоманда `mcp` как долгоживущий процесс (она только печатает подсказку).

---

### Шаг 9. Cursor: `mcp.json`

**Действие:**

1. Открыть `%USERPROFILE%\.cursor\mcp.json` (Windows) или `~/.cursor/mcp.json` (macOS/Linux).
2. В `mcpServers` добавить блок по шаблону [`../cursor/mcp.mempalace.example.json`](../cursor/mcp.mempalace.example.json):  
   `command`: `python` (или полный путь к `python.exe`, если Cursor не видит тот же PATH).  
   `args`: `["-m", "mempalace.mcp_server", "--palace", "<абсолютный путь к каталогу из шага 3–4>"]`.

**Зачем:** `--palace` явно привязывает MCP к вашему дворцу; без этого сервер может смотреть в глобальный конфиг `~/.mempalace/` (если вы его настраивали).

**Слияние JSON:** если в файле уже есть другие серверы — добавьте только ключ `"mempalace"`, не затирая остальное.

---

### Шаг 10. Перезапуск Cursor

**Действие:** полностью перезапустить Cursor или перезагрузить MCP в настройках.

**Зачем:** подхватить новый сервер и переменные окружения процесса.

---

### Шаг 11. Дальше по мере необходимости (кратко)

| Подкоманда   | Комментарий |
|-------------|-------------|
| `search`    | Поиск по тому, что уже замайнено. |
| `wake-up`   | Контекст «пробуждения» для промпта (см. `--help` и официальный README). |
| `compress`  | Сжатие ящиков по их модели (экономия токенов). |
| `repair`    | Пересборка векторного индекса при проблемах. |
| `split`     | Для длинных дампов чатов перед `mine --mode convos`. |

Детали и примеры — в [официальном README](https://github.com/MemPalace/mempalace).

---

## Альтернатива установки: pipx

Изолированное окружение, меньше конфликтов зависимостей с другими Python-проектами:

```bash
pipx install mempalace
```

После pipx в `mcp.json` вместо `python` часто указывают полный путь к `mempalace`-связанному интерпретатору — смотрите `pipx list` и документацию pipx.

---

## Безопасность

- Не индексировать секреты и персональные данные клиентов.
- Дворец и кэши — вне git или в `.gitignore`.

---

## Когда не использовать

- Для воспроизводимости в CI и для команды достаточно `docs/`, ADR и тестов — MemPalace их не заменяет.
