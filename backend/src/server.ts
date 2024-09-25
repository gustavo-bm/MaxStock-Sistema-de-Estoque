import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import dotenv from 'dotenv';
import routers from './routes/routes';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);

AppDataSource.initialize().then(async () => {
    console.log("Database OK.");
    app.listen(3333, () => {
        console.log("Server started on port 3333.")
    })
});