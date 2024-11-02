import { Router } from 'express';
import multer from 'multer';

const uploadUserRouter = Router();

// Configuração do armazenamento de imagens dos usuários
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../backend/uploads/users'); // Diretório para imagens de usuários
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Rota de upload de imagem para usuários
uploadUserRouter.post('/uploads/users', upload.single('image'), (req, res) => {
    console.log("Arquivo salvo em:", req.file?.path); // Exibe o caminho completo do arquivo no terminal

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imagePath = `/uploads/users/${req.file.filename}`;
    res.json({ imagePath });
});

export default uploadUserRouter;
