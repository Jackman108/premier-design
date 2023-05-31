/*-- Создание таблицы "menu"
CREATE TABLE IF NOT EXISTS menu (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    "ruTitle" VARCHAR(255) NOT NULL
);
-- Создание таблицы "button"
CREATE TABLE IF NOT EXISTS button (
    id SERIAL PRIMARY KEY,
    "buttonHeader" VARCHAR(255) NOT NULL
);
-- Создание таблицы "news"
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    "imagePng" VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    date DATE NOT NULL
);
-- Создание таблицы "feature"
CREATE TABLE IF NOT EXISTS feature (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    "iconPng" VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL
);
-- Создание таблицы "title"
CREATE TABLE IF NOT EXISTS title (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
-- Создание таблицы "approach_card"
CREATE TABLE IF NOT EXISTS approach_card (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
-- Создание таблицы "costing_card"
CREATE TABLE IF NOT EXISTS costing_card (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);
-- Создание таблицы "example_card"
CREATE TABLE IF NOT EXISTS example_card (
    id SERIAL PRIMARY KEY,
    background VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    deadlines VARCHAR(255) NOT NULL,
    "bathroomIcon" VARCHAR(255) NOT NULL,
    "bathroomOption" INTEGER NOT NULL,
    'areaIcon' VARCHAR(255) NOT NULL,
    "areaOption" INTEGER NOT NULL,
    "areaSquare" VARCHAR(255) NOT NULL,
    images TEXT [] NOT NULL
);
-- Создание таблицы "service_card"
CREATE TABLE IF NOT EXISTS service_card (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    href VARCHAR(255) NOT NULL
);
-- Создание таблицы "offer_list"
CREATE TABLE IF NOT EXISTS offer_list (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    "subTitle" VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    questions TEXT [] NOT NULL,
    tips TEXT NOT NULL
);
-- Создание таблицы "offer_project_design"
CREATE TABLE IF NOT EXISTS offer_project_design (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    pros TEXT NOT NULL,
    cons TEXT NOT NULL,
    "prosDescription" TEXT [] NOT NULL,
    "consDescription" TEXT [] NOT NULL
);
-- Создание таблицы "offer_project_repair"
CREATE TABLE IF NOT EXISTS offer_project_repair (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    pros TEXT NOT NULL,
    cons TEXT NOT NULL,
    "prosDescription" TEXT [] NOT NULL,
    "consDescription" TEXT [] NOT NULL
);
-- Создание таблицы "banner_images"
CREATE TABLE IF NOT EXISTS banner_images (
    src VARCHAR(255) NOT NULL,
    alt VARCHAR(255) NOT NULL,
    quality INTEGER NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL
);*/