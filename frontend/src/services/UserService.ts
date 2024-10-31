import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

const getUsers = async () => {
  const users = await api.get("/users");
  return users.data;
};

const getUserInfo = async (email: string) => {
  const user = await api.get("/users", { params: { email } });
  return user.data;
};

const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/users", userData);
  return response.data;
};

const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data.token;
  } catch (error) {
    console.error("Erro ao fazer login", error);
    throw error;
  }
};

const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await api.post("/users/verify-token", { token });
    return response.data.valid;
  } catch (error) {
    console.error("Erro ao verificar o token", error);
    return false;
  }
};

const updateUser = async (
  id: number,
  userData: { name: string; email: string }
) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export {
  getUsers,
  getUserInfo,
  createUser,
  login,
  verifyToken,
  updateUser,
  deleteUser,
};
