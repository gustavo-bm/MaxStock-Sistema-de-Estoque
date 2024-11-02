import express from 'express';
import path from 'path';
import cors from 'cors';
import uploadRouter from './routes/uploadRoutes'; // Importa sua rota de upload
import routers from './routes/routes';

const app = express();

app.use(cors());

app.use(express.json());

// Caminho absoluto para a pasta `uploads`
const uploadsPath = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

app.use(uploadRouter);
app.use(routers);

app.listen(3333, () => {
    console.log("Server started on port 3333.");
});
