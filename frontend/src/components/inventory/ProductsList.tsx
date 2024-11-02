import { useEffect, useState } from 'react';
import { useProducts } from '../../contexts/ProductsContext';
import { Box, Button, Paper, Typography } from '@mui/material';
import './ProductsList.css';
import EditProduct from './EditProduct';

export default function ProductsList() {
    const { products, getProductsList, removeProduct } = useProducts();
    const [productId, setProductId] = useState<number | undefined>(undefined);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        if (!products) {
            getProductsList().catch(error =>
                console.error("Failed to fetch products:", error)
            );
        }
    }, [products, getProductsList]);

    const handleEdit = (id: number | undefined) => {
        setProductId(id);
        setEdit(true);
    };

    const handleDeletion = (id: number) => {
        removeProduct(id);
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
                        <Paper key={product.id} className="product-card" sx={{ borderRadius: '5px' }} elevation={5}>

                            {product.image && <img src={`http://localhost:3333${product.image}`} alt={product.name} className="product-image" />}
                            <Typography variant='h4' align='center'>{product.name}</Typography>
                            <Typography sx={{ fontSize: '18px' }} align='center'>{product.description}</Typography>
                            <Typography sx={{ fontSize: '18px' }} align='center'>${Number(product.price).toFixed(2)}</Typography>
                            <Typography sx={{ fontSize: '18px' }} align='center'>Quantity: {product.quantity}</Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '1em', marginRight: '1em', marginBottom: '1em'}}>
                                <Button onClick={() => handleEdit(product.id)}>Edit</Button>
                                <Button onClick={() => handleDeletion(product.id!)}>Delete</Button>
                            </Box>
                        </Paper>
                    ))
                )}
            </div>
            {edit && productId !== null && (
                <EditProduct setEdit={setEdit} productId={productId} />
            )}
        </Box>
    );
}
