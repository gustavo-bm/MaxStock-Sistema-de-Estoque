import React, { useState } from 'react';
import { Button, FormLabel, Paper, TextField } from '@mui/material';
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
    
            const response = await fetch('http://localhost:3333/uploads', {
                method: 'POST',
                body: formData,
            });
    
            // Adicione esta linha para verificar o que está retornando
            const text = await response.text();
            console.log('Response Text:', text); // Log da resposta como texto
    
            // Agora tente fazer o parse do JSON
            try {
                const data = JSON.parse(text); // Tente converter o texto em JSON
                imagePath = data.imagePath; // Caminho da imagem retornado pelo servidor
            } catch (error) {
                console.error('Erro ao parsear JSON:', error);
            }
        }
    
        try {
            const newProduct = { name, description, price, quantity, image: imagePath };
            await addProduct(newProduct);
            console.log('Created product:', newProduct);
        } catch (error: any) {
            console.error('Erro ao cadastrar produto', error.message);
        }
    
        // Resetando o estado do formulário
        setName("");
        setDescription("");
        setPrice(0);
        setQuantity(0);
        setImageFile(null);
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
                marginTop: "50vh",
                boxShadow: 5,
                position: "relative",
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
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" width="100%" />}
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
