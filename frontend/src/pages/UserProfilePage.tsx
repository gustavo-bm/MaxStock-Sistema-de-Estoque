import { Box, Button, Paper } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UserInfos from "../components/profile/UserInfos";

export default function UserProfilePage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout();
  };

  return (
    <Paper
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: "center",
        padding: '2em',
        margin: '2em 2em 2em 2em',
        backgroundColor: '#8FC0C7'
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
    </Paper>
  );
}
