import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../database/data-source";

const userRepository = AppDataSource.getRepository(User);

// Método para buscar todos os usuários
const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
}

// Método para criar um usuário
const createUser = async (userData: IUser): Promise<IUser> => {
    const newUser = userRepository.create(userData); // Cria uma instância do usuário
    await userRepository.save(newUser); // Salva no bd
    return newUser;
}

// Método para atualizar um usuário
const updateUser = async (id: number, userData: IUser): Promise<IUser | null> => {
    const user = await userRepository.findOneBy({ id });
    if (!user) return null;

    // Atualiza os campos do usuário
    user.name = userData.name;
    user.email = userData.email;

    await userRepository.save(user); // Salva as mudanças no bd
    return user;
}

// Método para deletar um usuário
const deleteUser = async (id: number): Promise<boolean> => {
    const user = await userRepository.findOneBy({ id });

    if (!user) return false;

    await userRepository.remove(user);
    return true;
}

export default { getUsers, createUser, updateUser, deleteUser };




