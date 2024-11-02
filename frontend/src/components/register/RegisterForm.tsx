import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { createUser } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let imagePath = '';
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await fetch('http://localhost:3333/uploads/users', {
                method: 'POST',
                body: formData,
            });

            const text = await response.text();

            try {
                const data = JSON.parse(text);
                imagePath = data.imagePath;
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }

        try {
            const userData = { name, email, password, image: imagePath };
            await createUser(userData);
            navigate('/login');
        } catch (error: any) {
            console.error("Error creating user:", error);
            setError("Error creating user. Verify the fields and try again.");
            setTimeout(() => { 
                setError('');
            }, 1500);
        }
    }

    return (
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }} elevation={10}>
            <Typography sx={{ marginBottom: '2.5em', textAlign: 'center' }}>Create your account!</Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <Box sx={{ marginTop: '2em' }}>
                    <Button
                        variant="contained"
                        component="span"
                        color='primary'
                        onClick={() => document.getElementById('image-upload')?.click()}
                    >
                        Escolher Imagem
                    </Button>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }} // Esconder o input
                    />
                </Box>
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
                    label="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </Button>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            </form>
        </Paper>
    );
};

export default RegisterForm;
