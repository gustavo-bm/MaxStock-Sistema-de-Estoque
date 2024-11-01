import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsersTable1727265827543 } from './migrations/1727265827543-CreateUsersTable';
import User from "../entities/User";
import dotenv from 'dotenv';
import Product from "../entities/Product";
import { CreateProductsTable1730304442738 } from "./migrations/1730304442738-CreateProductsTable";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Product],
    migrations: [CreateUsersTable1727265827543, CreateProductsTable1730304442738],
    subscribers: [],
});

// Função assíncrona para inicializar o DataSource
async function initializeDataSource() {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
    }
}

// Chamar a função para inicializar o DataSource
initializeDataSource();