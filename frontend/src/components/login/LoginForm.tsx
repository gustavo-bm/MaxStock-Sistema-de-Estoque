import { Button, FormLabel, Paper, TextField } from "@mui/material";
import { useState } from "react";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Paper
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "50%", marginTop: "20vh", padding: "2em" }}
            elevation={10}
        >
            <FormLabel sx={{ display: "flex", flexDirection: "column", gap: "2em" }}>
                <form>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="E-mail"
                        value={email}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Password"
                        value={password}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        <p>Sign In</p>
                    </Button>
                    <p>- Don't have an account? - </p>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        <p>Sign Un</p>
                    </Button>
                </form>

            </FormLabel>

        </Paper>
    );
}

export default LoginForm;