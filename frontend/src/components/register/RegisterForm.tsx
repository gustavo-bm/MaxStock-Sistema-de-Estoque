import { Button, FormLabel, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { createUser } from '../../services/UserService';

interface RegisterError {
    message: string;
}

const RegisterForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const userData = { name, email, password };
            await createUser(userData);
            console.log("Usuário criado com sucesso!");
        } catch (error: any) {
            setError(error.message || "Erro ao criar usuário. Verifique os dados e tente novamente.");
            console.error("Erro ao criar usuário:", error);
        }
    }

    return (
        <Paper
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "50vw", marginTop: "20vh", padding: "2em" }}
            elevation={10}
        >
            <FormLabel sx={{ display: "flex", flexDirection: "column", gap: "2em" }}>
                <form onSubmit={handleSubmit}>
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </FormLabel>
        </Paper>
    );
};

export default RegisterForm;