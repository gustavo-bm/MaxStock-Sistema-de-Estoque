// exibe informações do usuario: foto de perfil e nome

import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext"
import UserInfos from "../components/profile/UserInfos";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
  const auth = useAuth();
  const navigate = useNavigate();

    const handleLogout = () => {
      let result = auth?.logout();

      if (result) {
        console.log('Usuário deslogado com sucesso.')
      } else {
        console.log('Erro ao deslogar.')
      }
    }

  return (
    <div>
      <p> Usuário logado com sucesso! </p>
      <Button onClick={handleLogout}>
        Logout
      </Button>
      <UserInfos />
      <Button onClick={() => {navigate('/app/inventory')}}>
        Inventory
      </Button>
    </div>
  )
}
