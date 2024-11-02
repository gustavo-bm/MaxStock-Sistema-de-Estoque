import { Router } from "express";
import userRouter from "../controllers/UserController";
import productRouter from "../controllers/ProductController";
import uploadUserRouter from "./uploadUserRoutes";
import uploadProductRouter from "./uploadProductRoutes";

const routers = Router();

routers.use("/users", userRouter);
routers.use("/products", productRouter);
routers.use(uploadProductRouter);
routers.use(uploadUserRouter);

export default routers;
