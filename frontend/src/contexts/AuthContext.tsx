import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../services/UserService";

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const isValid = await  verifyToken(token);

                if (isValid) {
                    setIsAuthenticated(true);
                    navigate('/app');
                } else {
                    logout();
                }
            }
        }
        checkToken();
    }, []);

    const login = () => {
        try {
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Erro ao realizar login:", error);
        }
    }

    const logout = (): boolean => {
        try {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/login');
            return true;
        } catch (error) {
            console.error("Erro ao realizar logout:", error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);