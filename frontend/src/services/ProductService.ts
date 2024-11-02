import axios from "axios";
import Product from "../contexts/ProductsContext";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

const createProduct = async (productData: {
  image: string | null;
  name: string;
  description: string;
  price: number;
  quantity: number;
}) => {
  const newProduct = await api.post("/products", productData);
  return newProduct.data;
};

const getProducts = async () => {
  const products = await api.get("/products");
  return products.data;
};

const updateProductData = async (updatedProduct: Product) => {
  try {
    const updatedProductResponse = await api.patch(
      `/products/${updatedProduct.id}`,
      updatedProduct
    );
    console.log(updatedProductResponse);
    return updatedProductResponse.data;
  } catch (error) {
    console.error("Erro ao atualizar produto", error);
    return null;
  }
};

const removeProductFromDatabase = async (id: number) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error : any) {
    console.error('Erro ao remover product', error.message);
  }
};

export { createProduct, getProducts, updateProductData, removeProductFromDatabase };
