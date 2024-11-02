import { createContext, ReactNode, useContext, useState, useCallback, useEffect } from "react";
import { getProducts, createProduct, updateProductData, removeProductFromDatabase } from "../services/ProductService";

export default interface Product {
    id?: number;
    image: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

interface ProductsContextType {
    getProductsList: () => Promise<Product[]>;
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
    removeProduct: (id: number) => Promise<void>;
    products: Product[] | null;
}

interface ProductsContextProps {
    children: ReactNode;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<ProductsContextProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[] | null>(null);

    const getProductsList = useCallback(async () => {
        if (!products) {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
            return fetchedProducts;
        }
        return products;
    }, [products]);

    const addProduct = useCallback(async (newProduct: Product) => {
        const createdProduct = await createProduct({
            ...newProduct,
            image: newProduct.image ? newProduct.image : null
        });
    
        setProducts((prevProducts) => prevProducts ? [...prevProducts, createdProduct] : [createdProduct]);
    }, []);
    
    const updateProduct = useCallback(async (updatedProductInfo: Product) => {
        const updatedProduct = await updateProductData(updatedProductInfo);
        
        if (updatedProduct) {
            setProducts((prevProducts) => 
                prevProducts
                    ? prevProducts.map((product) => 
                        product.id === updatedProduct.id ? updatedProduct : product
                      )
                    : [updatedProduct]
            );
        } else {
            console.error("Failed to update product: Product data is undefined");
        }
    }, []);
    
    const removeProduct = async (id: number ) => {
        await removeProductFromDatabase(id);

        setProducts((prevProducts) =>
            prevProducts ? prevProducts.filter((product) => product.id !== id) : null
        );
    }

    return (
        <ProductsContext.Provider value={{ getProductsList, addProduct, updateProduct, removeProduct, products }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
};
