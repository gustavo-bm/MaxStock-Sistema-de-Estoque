import { Box } from "@mui/material";
import LoginForm from "../components/login";

export default function LoginPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }} >
        <LoginForm />
    </Box>
  )
}


