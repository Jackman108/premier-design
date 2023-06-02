import { pool, createTables } from './dbSet.js';
import data from '../../data/data.json' assert { type: "json" };
createTables().then(() => importData()).catch(console.error);

async function importData() {
    await createTables();
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query('TRUNCATE TABLE menu, button, news, features, title, cards_approachCard, cards_costingCard, cards_examplesCard, cards_servicesCard, offerList, offerProject_designType, offerProject_repairType, bannersImages RESTART IDENTITY');

        const { menu, button, news, features, title, cards, offerList, offerProject, bannersImages } = data;

        // Вставка данных таблицы menu
        for (const item of menu) {
            await client.query('INSERT INTO menu (id, title, "ruTitle") VALUES ($1, $2, $3)', [item.id, item.title, item.ruTitle]);
        }

        // Вставка данных таблицы button
        for (const item of button) {
            await client.query('INSERT INTO button (id, "buttonHeader") VALUES ( $1, $2)', [item.id, item.buttonHeader]);
        }

        // Вставка данных таблицы news
        for (const item of news) {
            await client.query('INSERT INTO news (id, image, "imagePng", title, text, date) VALUES ($1, $2, $3, $4, $5, $6)', [item.id, item.image, item.imagePng, item.title, item.text, item.date]);
        }

        // Вставка данных таблицы features
        for (const item of features) {
            await client.query('INSERT INTO features (id, title, "iconPng", icon) VALUES ($1, $2, $3, $4)', [item.id, item.title, item.iconPng, item.icon]);
        }

        // Вставка данных таблицы title
        for (const item of title) {
            await client.query('INSERT INTO title (id, title, description) VALUES ($1, $2, $3)', [item.id, item.title, item.description]);
        }

        // Вставка данных таблицы cards_approachCard
        for (const item of cards.approachCard) {
            await client.query('INSERT INTO cards_approachCard (id, image, title, description) VALUES ($1, $2, $3, $4)', [item.id, item.image, item.title, item.description]);
        }

        // Вставка данных таблицы cards_costingCard
        for (const item of cards.costingCard) {
            await client.query('INSERT INTO cards_costingCard (id, title, image) VALUES ($1, $2, $3)', [item.id, item.title, item.image]);
        }

        // Вставка данных таблицы cards_examplesCard
        for (const item of cards.examplesCard) {
            await client.query('INSERT INTO cards_examplesCard (id, background, address, deadlines, "bathroomIcon", "bathroomOption", "areaIcon", "areaOption", "areaSquare", images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [item.id, item.background, item.address, item.deadlines, item.bathroomIcon, item.bathroomOption, item.areaIcon, item.areaOption, item.areaSquare, item.images]);
        }

        // Вставка данных таблицы cards_servicesCard
        for (const item of cards.servicesCard) {
            await client.query('INSERT INTO cards_servicesCard (id, text, image, href) VALUES ($1, $2, $3, $4)', [item.id, item.text, item.image, item.href]);
        }

        // Вставка данных таблицы offerList
        for (const item of offerList) {
            await client.query('INSERT INTO offerList (id, image, "subTitle", description, questions, tips) VALUES ($1, $2, $3, $4, $5, $6)', [item.id, item.image, item.subTitle, item.description, item.questions, item.tips]);
        }

        // Вставка данных таблицы offerProject_designType
        for (const item of offerProject.designType) {
            await client.query('INSERT INTO offerProject_designType (id, image, title, price, pros, cons, "prosDescription", "consDescription") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [item.id, item.image, item.title, item.price, item.pros, item.cons, item.prosDescription, item.consDescription]);
        }

        // Вставка данных таблицы offerProject_repairType
        for (const item of offerProject.repairType) {
            await client.query('INSERT INTO offerProject_repairType (id, image, title, price, pros, cons, "prosDescription", "consDescription") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [item.id, item.image, item.title, item.price, item.pros, item.cons, item.prosDescription, item.consDescription]);
        }

        // Вставка данных таблицы bannersImages
        for (const item of bannersImages) {
            await client.query('INSERT INTO bannersImages (id, src, alt, quality, width, height) VALUES ($1, $2, $3, $4, $5, $6)', [item.id, item.src, item.alt, item.quality, item.width, item.height]);
        }

        await client.query('COMMIT');
        console.log('Data imported successfully.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error importing data:', error);
    } finally {
        client.release();
    }
}

importData();
