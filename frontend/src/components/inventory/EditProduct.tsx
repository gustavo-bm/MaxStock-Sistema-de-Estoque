import { Button, FormLabel, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductsContext";

const EditProduct: React.FC<{ setEdit: (value: boolean) => void, productId: number | undefined }> = ({ setEdit, productId }) => {
    const { products, updateProduct } = useProducts();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [product, setProduct] = useState(() => products?.find((p) => p.id === productId) || {
        id: productId,
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        image: ""
    });

    // Sincroniza o estado do produto quando os produtos mudam
    useEffect(() => {
        const foundProduct = products?.find((p) => p.id === productId);
        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [products, productId]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === "price" || name === "quantity" ? parseFloat(value) : value
        }));
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

            const text = await response.text();

            try {
                const data = JSON.parse(text);
                imagePath = data.imagePath;
            } catch (error) {
                console.error('Erro ao parsear JSON:', error);
            }
        }

        try {
            const updatedProduct = {
                id: productId, 
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                image: imagePath || product.image
            };

            await updateProduct(updatedProduct);
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
                    {imageFile ? (
                        <img src={URL.createObjectURL(imageFile)} alt="Preview" width="100%" />
                    ) : product.image && (
                        <img src={`http://localhost:3333${product.image}`} alt={product.name} className="product-image" />
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
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
