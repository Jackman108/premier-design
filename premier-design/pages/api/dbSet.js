import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER?.toString(),
    host: process.env.DB_HOST?.toString(),
    password: process.env.DB_PASSWORD?.toString(),
    port: 5432,
    database: process.env.DB_DATABASE?.toString(),
});
async function createTables() {
    const client = await pool.connect();

    try {
        await client.query(`
        CREATE TABLE IF NOT EXISTS menu (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            "ruTitle" VARCHAR(255)
        );
        
        CREATE TABLE IF NOT EXISTS title (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            description VARCHAR(255)
        );
        
        CREATE TABLE IF NOT EXISTS button (
            id SERIAL PRIMARY KEY,
            "buttonHeader" VARCHAR(255)            
        );

        CREATE TABLE IF NOT EXISTS news (
            id SERIAL PRIMARY KEY,
            image VARCHAR(255),
            "imagePng" VARCHAR(255),
            title VARCHAR(255),
            text TEXT,
            date VARCHAR(255)
        );
        
        CREATE TABLE IF NOT EXISTS features (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            "iconPng" VARCHAR(255),
            icon VARCHAR(255)
        );
        
        CREATE TABLE IF NOT EXISTS cards_approachCard (
            id SERIAL PRIMARY KEY,
            image VARCHAR(255),
            title VARCHAR(255),
            description TEXT
        );
        
        CREATE TABLE IF NOT EXISTS cards_costingCard (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            image VARCHAR(255)
        );
        
        CREATE TABLE IF NOT EXISTS cards_examplesCard (
            id SERIAL PRIMARY KEY,
            background VARCHAR(255),
            address VARCHAR(255),
            deadlines VARCHAR(255),
            "bathroomIcon" VARCHAR(255),
            "bathroomOption" INTEGER,
            "areaIcon" VARCHAR(255),
            "areaOption" INTEGER,
            "areaSquare" VARCHAR(255),
            images TEXT []
        );
        
        CREATE TABLE IF NOT EXISTS cards_servicesCard (
            id SERIAL PRIMARY KEY,
            text TEXT,
            image VARCHAR(255),
            href VARCHAR(255)
        );
        
        CREATE TABLE IF NOT EXISTS offerList (
            id SERIAL PRIMARY KEY,
            image VARCHAR(255),
            "subTitle" VARCHAR(255),
            description TEXT,
            questions TEXT [],
            tips TEXT
        );
        
        CREATE TABLE IF NOT EXISTS offerProject_designType (
            id SERIAL PRIMARY KEY,
            image VARCHAR(255),
            title VARCHAR(255),
            price VARCHAR(255),
            pros VARCHAR(255),
            cons VARCHAR(255),
            "prosDescription" TEXT [],
            "consDescription" TEXT []
        );
        
        CREATE TABLE IF NOT EXISTS offerProject_repairType (
            id SERIAL PRIMARY KEY,
            image VARCHAR(255),
            title VARCHAR(255),
            price VARCHAR(255),
            pros VARCHAR(255),
            cons VARCHAR(255),
            "prosDescription" TEXT [],
            "consDescription" TEXT []
        );
        
        CREATE TABLE IF NOT EXISTS bannersImages (
            id SERIAL PRIMARY KEY,
            src VARCHAR(255),
            alt VARCHAR(255),
            quality INTEGER,
            width INTEGER,
            height INTEGER
        );
        -- Create other tables here
        `);

        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        client.release();
    }
}

export { pool, createTables };
export default pool;
