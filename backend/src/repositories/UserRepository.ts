import User from "../entities/User";
import IUser from "../interfaces/User/IUser";
import { AppDataSource } from "../database/data-source";
import IUserResponse from "../interfaces/User/IUserResponse";

const userRepository = AppDataSource.getRepository(User);

// Buscar todos os usuários
const getUsers = (): Promise<IUser[]> => {
  return userRepository.find();
};

// Buscar um usuário dado seu email
const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await userRepository.findOneBy({ email });
  return user || null;
};

// Trazer algumas informações do usuário sado seu email
const getUserInfoByEmail = async (
  email: string
): Promise<IUserResponse | null> => {
  const user = await userRepository.findOneBy({ email });

  // Criar um novo objeto com os campos desejados
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image
  };
};

// Criar um usuário
const createUser = async (userData: IUser): Promise<IUser> => {
  const newUser = userRepository.create(userData); // Cria uma instância do usuário
  await userRepository.save(newUser); // Salva no bd
  return newUser;
};

// Atualizar um usuário
const updateUser = async (
  id: number,
  userData: IUser
): Promise<IUser | null> => {
  const user = await userRepository.findOneBy({ id });
  if (!user) return null;

  // Atualiza os campos do usuário
  user.name = userData.name;
  user.email = userData.email;

  await userRepository.save(user); // Salva as mudanças no bd
  return user;
};

// Deletar um usuário
const deleteUser = async (id: number): Promise<boolean> => {
  const user = await userRepository.findOneBy({ id });

  if (!user) return false;

  await userRepository.remove(user);
  return true;
};

export default {
  getUsers,
  getUserByEmail,
  getUserInfoByEmail,
  createUser,
  updateUser,
  deleteUser,
};
