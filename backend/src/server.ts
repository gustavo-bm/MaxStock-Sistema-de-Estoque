import express from "express";
import path from "path";
import cors from "cors";
import uploadRouter from "./routes/uploadProductRoutes"; // Importa sua rota de upload
import routers from "./routes/routes";

const app = express();

app.use(cors());

app.use(express.json());

// Caminho absoluto para a pasta `uploads`
const uploadsUserPath = path.resolve(__dirname, "../uploads/users");
app.use("/uploads/users", express.static(uploadsUserPath));

// Caminho absoluto para a pasta `uploads`
const uploadsProductPath = path.resolve(__dirname, "../uploads/products");
app.use("/uploads/products", express.static(uploadsProductPath));

app.use(uploadRouter);
app.use(routers);

app.listen(3333, () => {
  console.log("Server started on port 3333.");
});
