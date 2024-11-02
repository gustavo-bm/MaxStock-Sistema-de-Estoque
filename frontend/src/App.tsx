import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './routes/ProtectedRoute';
import InventoryPage from './pages/InventoryPage';
import AddProductForm from './components/inventory/AddProductForm';
import { createTheme, ThemeProvider } from '@mui/material';



function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#8FC0C7',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: '#6DA2A8', // Cor de fundo ao passar o mouse
              color: '#ffffff', // Cor do texto ao passar o mouse
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/app" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
        <Route path="/app/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
        <Route path="/app/inventory" element={<ProtectedRoute><AddProductForm setAddForm={function (value: boolean): void {
          throw new Error('Function not implemented.');
        }} /></ProtectedRoute>} />
      </Routes>
    </ThemeProvider>

  )
}

export default App
