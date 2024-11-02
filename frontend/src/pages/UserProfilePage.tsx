import { Box, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext"
import UserInfos from "../components/profile/UserInfos";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
  const auth = useAuth();
  const navigate = useNavigate();

    const handleLogout = () => {
      auth?.logout();
    }

  return (
    <Box>
      <Button onClick={handleLogout}>
        Logout
      </Button>
      <UserInfos />
      <Button onClick={() => {navigate('/app/inventory')}}>
        Inventory
      </Button>
    </Box>
  )
}
