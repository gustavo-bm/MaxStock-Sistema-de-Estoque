import { useEffect, useState } from 'react';
import './App.css';
import { getUsers } from './services/UserService';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

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
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
