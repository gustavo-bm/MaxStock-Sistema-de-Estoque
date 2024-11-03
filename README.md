# Sistema de Estoque - MaxStock

Este projeto é um sistema de gerenciamento de estoque pensado inicialmente para uma pequena empresa, desenvolvido com o objetivo de simplificar o controle de produtos em estoque. Ele oferece recursos de autenticação de usuário, gerenciamento de produtos e segurança por meio de autenticação baseada em token.

## Funcionalidades

- **Registro de Usuário**: Permite que novos usuários se registrem com uma foto de perfil, nome, e-mail e senha (criptografada).
- **Autenticação e Segurança**: As senhas são protegidas por criptografia, e o sistema utiliza autenticação por JWT (JSON Web Token), com validade de login limitada a 3 horas.
- **Login e Logout**: Usuários registrados podem fazer login para acessar o sistema e também podem fazer logout manualmente.
- **Gerenciamento de Estoque**: O sistema oferece funcionalidades para adicionar, editar e remover produtos do inventário.
- **Produtos**: Cada produto possui imagem, nome, descrição, preço e quantidade.

## Tecnologias Utilizadas

- **Frontend**: React com TypeScript, Material-UI para componentes e estilização, além do axios para fazer requisições HTTP.
- **Backend**: Node.js, Express para gerenciamento das rotas e lógica do servidor.
- **Banco de Dados**: MySQL.
- **Autenticação e Criptografia**: Bcrypt para hash de senha e JWT para autenticação de sessão.

## Estrutura do Sistema

### 1. Registro de Usuário

Os novos usuários podem se registrar fornecendo:

- **Foto de Perfil**
- **Nome**
- **E-mail**
- **Senha** (que é criptografada para segurança)

### 2. Login e Sessão

- Após o registro, o usuário pode fazer login utilizando seu e-mail e senha.
- O login é válido por 3 horas. Após esse período, o usuário será automaticamente desconectado e deverá autenticar-se novamente.
- Na página de informações do usuário, este pode optar por fazer logout ou acessar o inventário (estoque) clicando no botão **Inventory**.

### 3. Gerenciamento de Produtos

Na página do estoque, o usuário tem as seguintes funcionalidades:

- **Adicionar Produto**: O usuário pode cadastrar novos produtos com imagem, nome, descrição, preço e quantidade.
- **Editar Produto**: Permite a atualização dos detalhes de um produto.
- **Remover Produto**: O usuário pode excluir um produto do inventário.

## Estrutura básica do Projeto

**front-end**
```plaintext
src/
├── assets/             # Imagens e logos
├── components/         # Componentes reutilizáveis (e.g., formulários)
├── contexts/           # Contextos de autenticação e do produto
├── pages/              # Páginas principais (LoginPage, RegisterPage, InventoryPage)
├── routes/             # Rotas protegidas e de navegação
├── services/           # Serviços de autenticação e API
├── App.tsx             # Configuração principal do aplicativo
└── main.tsx            # Ponto de entrada do React
```

**back-end**
```plaintext
backend
    dump                    # Exportação do banco de dados com 3 usuários e alguns produtos
    src/
    ├── controllers/         # Lógica dos controladores para gerenciar as requisições e respostas (e.g., UserController, ProductController)
    ├── database/            # Configuração do banco de dados e conexão
    ├── entities/            # Definição das entidades do sistema (e.g., User.ts, Product.ts)
    ├── interfaces/          # Interfaces para definir os tipos de dados e contratos (e.g., IUser, IProduct)
    ├── repositories/        # Repositórios para manipulação dos dados e acesso ao banco (e.g., UserRepository, ProductRepository)
    ├── routes/              # Definição das rotas e endpoints da API (e.g., userRoutes.ts, productRoutes.ts)
    ├── middleware/          # Middlewares para autenticação, autorização e validação (e.g., authMiddleware.ts, errorMiddleware.ts)
    ├── utils/               # Funções utilitárias e helpers para uso geral no projeto (e.g., passwordUtils.ts para hash de senha)
    ├── server.ts            # Arquivo principal para iniciar o servidor e configurar middlewares globais, rotas e conexão
    └── uploads/             # Onde estão salvas as imagens dos usuários e produtos
```
## Configuração do Projeto

### Pré-requisitos

- Node.js e npm instalados
- Express, axios, typeorm, cors
- Reflect-metadata, jsonwebtoken, bcryptjs, dotenv, multer
- MySQL

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/gustavo-bm/Projeto-CRUD-com-TypeScript
   cd crud_basico
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente para MySQL e JWT no arquivo `.env`.

4. Inicie o servidor:

**No diretório frontend:**
   ```bash
   npm run dev
   ```
**No diretório backend:**
   ```bash
   npm run dev:server
   ```

5. O sistema estará disponível em [http://localhost:5173](http://localhost:5173).

## Uso

1. **Registro**: Acesse `/register` para criar uma nova conta.
2. **Login**: Faça login com o e-mail e a senha cadastrados.
3. **Inventário**: No inventário, utilize as opções para adicionar, editar e remover produtos.
4. **Logout**: O logout pode ser feito manualmente ou será automático após 3 horas de inatividade.

---

## Melhorias Futuras

- Implementação de filtros e pesquisa para facilitar a localização de produtos.
- Relatórios de estoque.
- Notificações para produtos com estoque baixo.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Faça um fork do projeto e envie um pull request.

## Licença

Este projeto é distribuído sob a licença MIT.

