import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './routes/ProtectedRoute';
import InventoryPage from './pages/InventoryPage';
import AddProductForm from './components/inventory/AddProductForm';

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/app" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
      <Route path="/app/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
      <Route path="/app/inventory" element={<ProtectedRoute><AddProductForm /></ProtectedRoute>} />
    </Routes>

  )
}

export default App
