import { useEffect, useState } from 'react';
import './App.css';
import { getUsers } from './services/UserService';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getUsers();
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Sistema de gerenciamento de Projetos.</h1>
      <div className="card">
        <p>Registrar, visualizar,
          editar e remover projetos e tarefas de um 
          usuário, controlando o status das tarefas e projetos.
        </p>
      </div>
      <h2>Lista de usuários:</h2>
      <div>
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
