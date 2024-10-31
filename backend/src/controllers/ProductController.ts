import { Request, Response, Router } from "express";
import IProduct from "../interfaces/Product/IProduct";
import ProductRepository from "../repositories/ProductRepository";
import Product from "../entities/Product";

const productRouter = Router();

// Lista todos os produtos
productRouter.get('/', async (req: Request, res: Response) => {
  try {
    const products = await ProductRepository.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar usuário(s):", error);
    return res.status(500).json({ message: "Erro ao buscar usuário(s)." });
  }
});

// Catalogar novo produto
productRouter.post('/', async (req: Request, res: Response) => {
  const { image, name, description, price, quantity }: IProduct = req.body;

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
      quantity
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar product", error });
  }
});

// Atualizar os campos de um produto
productRouter.patch('/:product_id', async (req: Request, res: Response) => {
  const product_id = parseInt(req.params.product_id, 10);
  const updates: Partial<Product> = req.body;

  console.log("Dados recebidos para atualização:", updates); // Adicionando log

  if (updates.quantity !== undefined && (isNaN(updates.quantity) || updates.quantity < 0)) {
      return res.status(400).json({ message: "Quantidade inválida" });
  }

  if (updates.name !== undefined && typeof updates.name !== 'string') {
      return res.status(400).json({ message: "Nome inválido" });
  }

  if (updates.description !== undefined && typeof updates.description !== 'string') {
      return res.status(400).json({ message: "Descrição inválida" });
  }

  try {
      const updatedProduct = await ProductRepository.updateProduct(product_id, updates);
      if (!updatedProduct) {
          return res.status(404).json({ message: "Produto não encontrado" });
      }
      return res.status(200).json(updatedProduct);
  } catch (error) {
      console.error("Erro ao atualizar produto:", error);

      return res.status(500).json({ message: "Erro ao atualizar produto", error: error.message });
  }
});

// Remover um produto
productRouter.delete(
  '/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const deleted = await ProductRepository.deleteProduct(Number(id));

    if (deleted) {
      return res.status(204).send(); // Retorna "204 No Content" se a exclusão for bem-sucedida
    } else {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
  }
)

export default productRouter;
