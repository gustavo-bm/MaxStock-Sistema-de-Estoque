import { AppDataSource } from "../database/data-source";
import Product from "../entities/Product";
import IProduct from "../interfaces/Product/IProduct";

const productRepository = AppDataSource.getRepository(Product);

// Retorna lista de produtos
const getProducts = (): Promise<IProduct[]> => {
    return productRepository.find();
};

// Criar novo produto
const createProduct = async (ProductData: IProduct): Promise<Product> => {
    const newProduct = productRepository.create(ProductData);
    await productRepository.save(newProduct);
    return newProduct;
};

// Atualiza campos do produto
const updateProduct = async (product_id: number, updates: Partial<Product>): Promise<Product> => {
    const product = await productRepository.findOne({ where: { id: product_id } });

    if (!product) {
        throw new Error("Produto não encontrado");
    }

    // Atualiza os campos do produto com os valores fornecidos
    Object.assign(product, updates);
    await productRepository.save(product);

    return product;
};

const deleteProduct = async (id: number): Promise<boolean> => {
    const product = await productRepository.findOneBy({ id });

    if (!product) return false;

    await productRepository.remove(product);
    return true;
}

export default { getProducts, createProduct, updateProduct, deleteProduct };
