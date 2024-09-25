import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
}

const createUser = async (userData: { name: string, email: string }) => {
    const response = await api.post('/users', userData);
    return response.data;
}

const updateUser = async (id: number, userData: { name: string, email:string }) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
}

const deleteUser = async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
}

export { getUsers, createUser, updateUser, deleteUser };