import { Router } from 'express';
import multer from 'multer';

const uploadProductRouter = Router();

// Configuração do armazenamento de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../backend/uploads/products');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Rota de upload de imagem
uploadProductRouter.post('/uploads/products', upload.single('image'), (req, res) => {
    console.log("Arquivo salvo em:", req.file?.path); // Exibe o caminho completo do arquivo no terminal

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imagePath = `/uploads/products/${req.file.filename}`;
    res.json({ imagePath });
});

export default uploadProductRouter;