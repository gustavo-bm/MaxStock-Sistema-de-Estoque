import { Box } from '@mui/material';
import RegisterForm from '../components/register/RegisterForm';

export default function RegisterPage() {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "100vh", 
        margin: 'auto' 
      }}
    >
      <RegisterForm />
    </Box>
  );
}
