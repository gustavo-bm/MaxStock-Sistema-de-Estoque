import { AppDataSource } from "../database/data-source";
import Product from "../entities/Product";
import IProduct from "../interfaces/Product/IProduct";

const productRepository = AppDataSource.getRepository(Product);

// Retorna lista de produtos
const getProducts = (): Promise<IProduct[]> => {
    return productRepository.find();
}

// Criar novo produto
const createProduct = async (ProductData: IProduct): Promise<Product> => {
    const newProduct = productRepository.create(ProductData);
    await productRepository.save(newProduct);
    return newProduct;
}

export default { getProducts, createProduct };
