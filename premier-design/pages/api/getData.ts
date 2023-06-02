import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
import { DataProps } from '../../interface/interfaceData';

type QueryParams = unknown[];

dotenv.config();
// Создайте пул соединений к базе данных
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'db',
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: process.env.DB_DATABASE,
});

// Функция для выполнения SQL-запросов к базе данных
const query = async (sql: string, params: QueryParams = [] = []): Promise<QueryResult> => {
    const client = await pool.connect();
    try {
        return await client.query(sql, params);
    } finally {
        client.release();
    }
};

// Получите данные из базы данных
export const getDataFromDB = async (): Promise<DataProps> => {
    try {
        const menuQuery = query('SELECT * FROM menu');
        const buttonQuery = query('SELECT * FROM button');
        const newsQuery = query('SELECT * FROM news');
        const featuresQuery = query('SELECT * FROM features');
        const titleQuery = query('SELECT * FROM title');
        const approachCardQuery = query('SELECT * FROM cards_approachCard');
        const costingCardQuery = query('SELECT * FROM cards_costingCard');
        const examplesCardQuery = query('SELECT * FROM cards_examplesCard');
        const servicesCardQuery = query('SELECT * FROM cards_servicesCard');
        const offerListQuery = query('SELECT * FROM offerList');
        const offerProjectDesignQuery = query('SELECT * FROM offerProject_designType');
        const offerProjectRepairQuery = query('SELECT * FROM offerProject_repairType');
        const bannersImagesQuery = query('SELECT * FROM bannersImages');

        const [
            menu,
            button,
            news,
            features,
            title,
            approachCard,
            costingCard,
            examplesCard,
            servicesCard,
            offerList,
            offerProjectDesign,
            offerProjectRepair,
            bannersImages,
        ] = await Promise.all([
            menuQuery.catch(error => {
                throw new Error(`Error executing menu query: ${error.message}`)
            }),
            buttonQuery.catch(error => {
                throw new Error(`Error executing button query: ${error.message}`)
            }),
            newsQuery.catch(error => {
                throw new Error(`Error executing news query: ${error.message}`)
            }),
            featuresQuery.catch(error => {
                throw new Error(`Error executing features query: ${error.message}`)
            }),
            titleQuery.catch(error => {
                throw new Error(`Error executing title query: ${error.message}`)
            }),
            approachCardQuery.catch(error => {
                throw new Error(`Error executing approachCard query: ${error.message}`)
            }),
            costingCardQuery.catch(error => {
                throw new Error(`Error executing costingCard query: ${error.message}`)
            }),
            examplesCardQuery.catch(error => {
                throw new Error(`Error executing examplesCard query: ${error.message}`)
            }),
            servicesCardQuery.catch(error => {
                throw new Error(`Error executing servicesCard query: ${error.message}`)
            }),
            offerListQuery.catch(error => {
                throw new Error(`Error executing offerList query: ${error.message}`)
            }),
            offerProjectDesignQuery.catch(error => {
                throw new Error(`Error executing offerProjectDesign query: ${error.message}`)
            }),
            offerProjectRepairQuery.catch(error => {
                throw new Error(`Error executing offerProjectRepair query: ${error.message}`)
            }),
            bannersImagesQuery.catch(error => {
                throw new Error(`Error executing bannersImages query: ${error.message}`)
            }),

        ]);

        return {
            menu: menu.rows,
            button: button.rows,
            news: news.rows,
            features: features.rows,
            title: title.rows,
            cards: {
                approachCard: approachCard.rows,
                costingCard: costingCard.rows,
                examplesCard: examplesCard.rows,
                servicesCard: servicesCard.rows,
            },
            offerList: offerList.rows,
            offerProject: {
                designType: offerProjectDesign.rows,
                repairType: offerProjectRepair.rows,
            },
            bannersImages: bannersImages.rows,
        };
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error fetching data from database: ${error.message}`);
        }
        return {} as DataProps;
    }
};
