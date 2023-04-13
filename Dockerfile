# Используем образ Node.js версии 16.0.0-alpine в качестве базового образа
FROM node:16.0.0-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта внутрь контейнера
COPY . .

# Собираем приложение в production-режиме
RUN npm run build

# Запускаем приложение при запуске контейнера
CMD ["npm", "start"]
