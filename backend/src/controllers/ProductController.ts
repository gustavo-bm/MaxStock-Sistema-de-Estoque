import { Request, Response, Router } from "express";
import IProduct from "../interfaces/Product/IProduct";
import ProductRepository from "../repositories/ProductRepository";

const productRouter = Router();

// Lista todos os produtos
productRouter.get("/", async (req: Request, res: Response) => {
  try {
    const products = await ProductRepository.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar usuário(s):", error);
    return res.status(500).json({ message: "Erro ao buscar usuário(s)." });
  }
});

// Catalogar novo produto
productRouter.post("/", async (req: Request, res: Response) => {
  const { image, name, description, price }: IProduct = req.body;

  // Verifica se os dados necessários foram enviados
  if (!name || !price) {
    return res.status(400).json({ message: "Nome e preço são requeridos" });
  }

  try {
    const newProduct = await ProductRepository.createProduct({
      image,
      name,
      description,
      price,
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar product", error });
  }
});

export default productRouter;
