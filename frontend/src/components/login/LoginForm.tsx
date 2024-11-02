import { Box, Button, FormLabel, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface LoginError {
    message: string;
}

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const token = await login(email, password);
            await auth?.login(email);
            localStorage.setItem('token', token);
            navigate('/app');
        } catch (error: any) {
            console.error("Error signing up:", error.response || error);
            setError(error.response?.data.message || "Error signing in. Please check your credentials.");

            setTimeout(() => { 
                setError('');
            }, 1500);
        }
    }

    return (
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }} elevation={10} >
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20, // Margem vertical entre os campos
                }}
            >
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
                <Button fullWidth type="submit" variant="contained" color="primary">
                    Sign In
                </Button>
                <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Typography >Don't have an account?</Typography>
                </Box>
                <Button
                    fullWidth
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/register')}
                >
                    Sign Up
                </Button>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            </form>
        </Paper>
    );
};

export default LoginForm;