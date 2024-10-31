import { useEffect, useState } from 'react';
import { useProducts } from '../../contexts/ProductsContext';
import { Box, Button, Typography } from '@mui/material';
import './ProductsList.css';
import { useNavigate } from 'react-router-dom';
import EditProduct from './EditProduct';

export default function ProductsList() {
    const { products, getProductsList } = useProducts();
    const [productId, setProductId] = useState<number | null>(null);
    const [edit, setEdit] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!products) {
            getProductsList().catch(error =>
                console.error("Failed to fetch products:", error)
            );
        }
    }, [products, getProductsList]);

    const handleEdit = (id: number) => {
        setProductId(id);
        setEdit(true);
    };

    return (
        <Box>
            <div className="products-grid">
                {products === null ? (
                    <Typography>Loading products...</Typography>
                ) : products.length === 0 ? (
                    <Typography>No products available.</Typography>
                ) : (
                    products.map((product) => (
                        <Box key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <p>Quantity: {product.quantity}</p>
                            <Button onClick={() => handleEdit(product.id)}>
                                Edit
                            </Button>
                        </Box>
                    ))
                )}
            </div>
            {edit && productId !== null && ( 
                <EditProduct setEdit={setEdit} productId={productId} />
            )}
        </Box>
    );
}
