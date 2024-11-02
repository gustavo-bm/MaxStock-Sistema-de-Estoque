import React, { useState } from 'react';
import { Box, Button, FormLabel, Paper, TextField } from '@mui/material';
import { useProducts } from '../../contexts/ProductsContext';

const AddProductForm: React.FC<{ setAddForm: (value: boolean) => void }> = ({ setAddForm }) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { addProduct } = useProducts();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        let imagePath = '';
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
    
            const response = await fetch('http://localhost:3333/uploads/products', {
                method: 'POST',
                body: formData,
            });
    
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                imagePath = data.imagePath;
            } catch (error) {
                console.error('Erro ao parsear JSON:', error);
            }
        }
    
        try {
            const newProduct = { name, description, price, quantity, image: imagePath };
            await addProduct(newProduct);
        } catch (error: any) {
            console.error('Erro ao cadastrar produto', error.message);
        }
        
        setAddForm(false);
    };    

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
        }}>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50vw",
                    maxWidth: "500px",
                    padding: "2em",
                    position: "relative",
                    boxShadow: 5
                }}
                elevation={10}
            >
                <Button
                    onClick={() => setAddForm(false)}
                    variant="outlined"
                    color="primary"
                    style={{
                        position: 'absolute',
                        top: '1em',
                        right: '1em',
                        zIndex: '10'
                    }}
                >
                    Fechar
                </Button>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <FormLabel
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1em",
                        }}
                    >
                        <Box sx={{ marginTop: '2em' }}>
                            <Button
                                variant="contained"
                                component="span"
                                color='primary'
                            >
                                Escolher Imagem
                            </Button>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none', width:'10px', height: '5px', zIndex: '0' }}
                            />
                        </Box>
                        {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" width="25%" />}
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
        </div>
    );
}

export default AddProductForm;
