import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, verifyToken } from "../services/UserService";

export default interface User {
    id: number;
    name: string;
    email: string;
    image: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string) => Promise<void>;
    logout: () => void;
    user: User | null;
    loading: boolean; // Adicione um estado de carregamento
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (token && email) {
                const isValid = await verifyToken(token);

                if (isValid) {
                    setIsAuthenticated(true);
                    try {
                        const userInfo = await getUserInfo(email);
                        setUser(userInfo);
                    } catch (error) {
                        console.error("Erro ao buscar informações do usuário:", error);
                    }
                    navigate('/app');
                } else {
                    logout();
                }
            }
            setLoading(false);
        }
        checkToken();
    }, []);
    
    const login = async (email: string) => {
        try {
            const userInfo = await getUserInfo(email);
            localStorage.setItem('email', email);
            setUser(userInfo);
            setIsAuthenticated(true);
            navigate('/app');
        } catch (error) {
            console.error("Erro ao buscar informações do usuário:", error);
        }
    }

    const logout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error("Erro ao realizar logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);