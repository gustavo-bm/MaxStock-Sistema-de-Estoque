import { Box, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import UserInfos from "../components/profile/UserInfos";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout();
  };

  return (
    <Box 
      sx={{
        display: 'flex',           
        flexDirection: 'column',    
        justifyContent: 'center',   
        alignItems: 'center',       
        height: '100vh',           
      }}
    >
      <UserInfos />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2em', marginTop: '1em' }}>
        <Button onClick={handleLogout}
          variant="contained"
          color="error"
          sx={{
            "&:hover": {
              backgroundColor: "#FF6F61",
              color: "inherit",
            },
          }}>
          Logout
        </Button>
        <Button onClick={() => { navigate('/app/inventory') }}
          variant="contained"
          color="primary">
          Inventory
        </Button>
      </Box>
    </Box>
  );
}
