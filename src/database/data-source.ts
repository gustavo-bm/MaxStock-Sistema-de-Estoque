import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsersTable1727202813212 } from './migrations/1727202813212-CreateUsersTable';
import User from "../entities/User";
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [CreateUsersTable1727202813212],
    subscribers: [],
});
