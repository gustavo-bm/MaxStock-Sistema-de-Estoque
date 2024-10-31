import React, { useState } from 'react';
import { Button, FormLabel, Paper, TextField } from '@mui/material';
import { useProducts } from '../../contexts/ProductsContext';

const AddProductForm: React.FC<{ setAddForm: (value: boolean) => void }> = ({ setAddForm }) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const { addProduct } = useProducts();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newProduct = { name, description, price, quantity, image };
            await addProduct(newProduct);
            console.log('Created product:', newProduct);
        } catch (error: any) {
            console.error('Erro ao cadastrar produto', error.message);
        }

        setName("");
        setDescription("");
        setPrice(0);
        setQuantity(0);
        setImage("");

        setAddForm(false);
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
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Add Product
                    </Button>
                </FormLabel>
            </form>
        </Paper>
    );
}

export default AddProductForm;
