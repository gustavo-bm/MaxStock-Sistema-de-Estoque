import { Request, Response, Router } from "express";
import User from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import IUser from "../interfaces/IUser";

// Gestor de rotas
const userRouter = Router();

// Rota GET para buscar todos os usuários
userRouter.get('/', async ( _req: Request, res: Response ): Promise<Response> => {
    const users = await UserRepository.getUsers();
    return res.status(200).json(users);
})

// Nova rota POST para criar um usuário
userRouter.post('/', async ( req: Request, res: Response ): Promise<Response> => {
    const { name, email }: IUser = req.body;

    // Verifica se os dados necessários foram enviados
    if (!name || !email) {
        return res.status(400).json({ message: "Nome e email são requeridos"})
    }

    try {
        const newUser = await UserRepository.createUser({ name, email });
        return res.status(201). json(newUser); // Status 201 (criado)
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar user", error });
    }
})

// Rota para atualizar um usuário
userRouter.put('/:id', async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params; // Obtém o id da url
    const userData: IUser = req.body; // Obtém os dados do corpo da requisição

    // Chama o método do repositório para atualizar o usuário
    const updatedUser = await UserRepository.updateUser(Number(id), userData);

    if (updatedUser) {
        return res.status(200).json(updatedUser);
    } else {
        return res.status(404).json({ message: "Usuário não encontrado." })
    }
})

// Remover um usuário
userRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const deleted = await UserRepository.deleteUser(Number(id));

    if (deleted) {
        return res.status(204).send(); // Retorna "204 No Content" se a exclusão for bem-sucedida 
    } else {
        return res.status(404).json({ message: "Usuário não encontrado." })
    }
})

export default userRouter;


