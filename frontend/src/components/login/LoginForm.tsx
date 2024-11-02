import { Button, FormLabel, Paper, TextField } from "@mui/material";
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

            // Função de autenticação para permissões de acesso a rotas da aplicação, também carrega as informações do usuário
            await auth?.login(email);

            localStorage.setItem('token', token);
            
            navigate('/app'); // Redireciona para a aplicação após o login bem-sucedido
        } catch (error: any) {
            console.error("Erro ao fazer login:", error.response || error);
            setError(error.response?.data.message || "Erro ao fazer login. Verifique suas credenciais.");
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
                        Sign In
                    </Button>
                    <p>- Don't have an account? - </p>
                    <Button
                        fullWidth
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/register')}
                    >
                        Sign Up
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </FormLabel>
        </Paper>
    );
};

export default LoginForm;