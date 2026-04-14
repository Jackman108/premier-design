# Используем образ PostgreSQL в качестве базового образа
FROM postgres:16-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем остальные файлы проекта внутрь контейнера
COPY init.sql /docker-entrypoint-initdb.d/

# Команда для запуска контейнера с PostgreSQL
CMD ["postgres"]
