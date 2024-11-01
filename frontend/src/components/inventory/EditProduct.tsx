import { Button, FormLabel, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductsContext";

const EditProduct: React.FC<{ setEdit: (value: boolean) => void, productId: number | undefined }> = ({ setEdit, productId }) => {
    const { products, updateProduct } = useProducts();
    const [product, setProduct] = useState(() => products?.find((p) => p.id === productId) || {
        id: productId,
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        image: null
    });

    // Sincroniza o estado do produto quando os produtos mudam
    useEffect(() => {
        const foundProduct = products?.find((p) => p.id === productId);
        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [products, productId]);

    useEffect(() => {
        console.log("Produto com campo alterado: ", product);
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === "price" || name === "quantity" ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProduct(product);
            console.log("Produto atualizado:", product);
        } catch (error: any) {
            console.error("Erro ao atualizar produto", error.message);
        }
        setEdit(false);
    };

    return (
        <Paper
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50vw",
                maxWidth: "500px",
                padding: "2em",
                margin: "auto",
                marginTop: "5vh",
                boxShadow: 5,
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)"
            }}
            elevation={10}
        >
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <FormLabel
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em"
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Image URL"
                        name="image"
                        type="text"
                        value={product.image}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Price"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={product.quantity}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Update Product
                    </Button>
                </FormLabel>
            </form>
        </Paper>
    );
}

export default EditProduct;
