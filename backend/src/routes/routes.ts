import { Router } from "express";
import userRouter from "../controllers/UserController";
import productRouter from "../controllers/ProductController";

const routers = Router();

routers.use('/users', userRouter);
routers.use('/products', productRouter);

export default routers;