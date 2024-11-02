import { Router } from 'express';
import multer from 'multer';

const uploadRouter = Router();

// Configuração do armazenamento de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../backend/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Rota de upload de imagem
uploadRouter.post('/uploads', upload.single('image'), (req, res) => {
    console.log("Arquivo salvo em:", req.file?.path); // Exibe o caminho completo do arquivo no terminal

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ imagePath });
});

export default uploadRouter;