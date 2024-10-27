// form com email e senha para login, botao para se registrar caso não haja conta
// As senhas de acesso precisam ser criptografadas com o bcrypt. A autenticação deve incluir o JWT.

import { Box } from "@mui/material";
import LoginForm from "../components/login";

export default function LoginPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }} >
        <LoginForm />
    </Box>
  )
}


