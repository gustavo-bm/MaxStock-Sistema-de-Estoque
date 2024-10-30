import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, verifyToken } from "../services/UserService";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string) => Promise<void>;
    logout: () => boolean;
    user: User | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
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

    const login = async (email: string) => {
        try {
            // Chama a função para buscar as informações do usuário
            const userInfo = await getUserInfo(email);
            setUser(userInfo);
            setIsAuthenticated(true);
            navigate('/app');
        } catch (error) {
            console.error("Erro ao buscar informações do usuário:", error);
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
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);