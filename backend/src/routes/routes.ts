import { Router } from 'express';
import userRouter from '../controllers/UserController';
import productRouter from '../controllers/ProductController';
import uploadRouter from './uploadRoutes';

const routers = Router();

routers.use('/users', userRouter);
routers.use('/products', productRouter);
routers.use(uploadRouter);

export default routers;