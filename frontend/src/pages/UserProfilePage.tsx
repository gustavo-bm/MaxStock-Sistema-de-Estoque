// exibe informações do usuario: foto de perfil e nome

import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext"
import UserInfos from "../components/profile/UserInfos";

export default function UserProfilePage() {
  const auth = useAuth();

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
    </div>
  )
}
