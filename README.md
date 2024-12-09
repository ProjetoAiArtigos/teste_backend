
# Sistema de Gerenciamento de Tarefas

Projeto desenvolvido para Processo Seletivo da empresa Redizz Tecnologia. Este repositório contém o código-fonte de um sistema de gerenciamento de tarefas, incluindo frontend e backend. A aplicação permite aos usuários criar, listar, editar e excluir tarefas, com suporte à autenticação e autorização.

---

## Tecnologias Utilizadas

- **Frontend:**
   - React
   - PrimeReact
   - Axios
   - React Router
- **Backend:**
   - Node.js
   - Express.js
   - Sequelize (ORM)
   - MySQL
- **Infraestrutura:**
   - Docker para containerização
   - Docker Compose para orquestração

---

## Funcionalidades Principais

1. **Autenticação e Autorização**
   - Registro e login de usuários
   - Rotas protegidas para tarefas
2. **Gerenciamento de Tarefas**
   - Criação, edição, exclusão e listagem de tarefas
   - Atualização de status de tarefas
   - Filtros e paginação
3. **Interface Amigável**
   - Layout responsivo com PrimeReact
   - Barra de navegação dinâmica

---

## Estrutura do Projeto

```
├── frontend/              # Código do frontend
│   ├── src/
│   │   ├── api/           # Funções de chamadas à API
│   │   ├── components/    # Componentes React reutilizáveis
│   │   ├── layout/        # Layout principal da aplicação
│   │   ├── pages/         # Páginas principais do app
│   │   └── App.js         # Configuração de rotas
│   └── Dockerfile         # Configuração Docker
├── backend/               # Código do backend
│   ├── src/
│   │   ├── controllers/   # Lógica de controle
│   │   ├── middleware/    # Middlewares
│   │   ├── migrations/    # Migrations
│   │   ├── models/        # Definições de modelos ORM
│   │   ├── routes/        # Definições de rotas
│   │   ├── utils/         # Utilitários
│   │   └── server.js      # Ponto de entrada do servidor
│   └── tests              # Testes unitários
│   └── Dockerfile         # Configuração Docker
└── docker-compose.yml     # Orquestração de serviços
```

---

## Configuração do Ambiente

### Requisitos

- Docker
- Node.js (se desejar executar localmente)

### Passo a Passo

1. Clone este repositório:
   ```bash
   git clone https://github.com/usuario/sistema-tarefas.git
   cd sistema-tarefas
   ```

2. Crie banco de dados para desenvolvimento e teste
   ```bash
    CREATE DATABASE dev_database;
    CREATE DATABASE test_database;
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e preencha as informações necessárias. Preencha o arquivo `.env.test`. Exemplo:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=senha
   DB_NAME=desafio_tarefas
   JWT_SECRET=segredo_jwt
   ```

4. Inicie a aplicação com Docker Compose:
   ```bash
   docker-compose up
   ```

5. Acesse:
   - **Frontend:** `http://localhost:3000`
   - **Backend:** `http://localhost:3001`

---

## Endpoints da API

### **Autenticação**

#### **Registrar Usuário**
- **URL:** `/auth/register`
- **Método:** `POST`
- **Descrição:** Registra um novo usuário na plataforma.
- **Corpo da Requisição:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```

#### **Login**
- **URL:** `/auth/login`
- **Método:** `POST`
- **Descrição:** Autentica um usuário e retorna um token JWT.
- **Corpo da Requisição:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "token": "jwt_token"
  }
  ```

---

### **Gerenciamento de Tarefas**

#### **Listar Todas as Tarefas**
- **URL:** `/tasks`
- **Método:** `GET`
- **Descrição:** Lista todas as tarefas do usuário autenticado.
- **Query Params (opcional):**
   - `page`: Número da página.
   - `limit`: Número de itens por página.
   - `status`: Filtrar por status (e.g., "pending").
   - `title`: Filtrar por título.
- **Resposta de Sucesso:**
  ```json
  {
    "tasks": [
      {
        "id": 1,
        "title": "Task 1",
        "description": "Description",
        "status": "pending",
        "userId": 1
      }
    ],
    "total": 1,
    "page": 1,
    "pages": 1
  }
  ```

#### **Obter Detalhes de uma Tarefa**
- **URL:** `/tasks/:id`
- **Método:** `GET`
- **Descrição:** Retorna os detalhes de uma tarefa específica.
- **Resposta de Sucesso:**
  ```json
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description",
    "status": "pending",
    "userId": 1
  }
  ```

#### **Criar Tarefa**
- **URL:** `/tasks`
- **Método:** `POST`
- **Descrição:** Cria uma nova tarefa para o usuário autenticado.
- **Corpo da Requisição:**
  ```json
  {
    "title": "New Task",
    "description": "Task description",
    "status": "pending"
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "id": 2,
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "userId": 1
  }
  ```

#### **Atualizar Tarefa**
- **URL:** `/tasks/:id`
- **Método:** `PUT`
- **Descrição:** Atualiza os detalhes de uma tarefa existente.
- **Corpo da Requisição:**
  ```json
  {
    "title": "Updated Task",
    "description": "Updated description",
    "status": "in progress"
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "id": 1,
    "title": "Updated Task",
    "description": "Updated description",
    "status": "in progress",
    "userId": 1
  }
  ```

#### **Excluir Tarefa**
- **URL:** `/tasks/:id`
- **Método:** `DELETE`
- **Descrição:** Exclui uma tarefa específica do usuário autenticado.
- **Resposta de Sucesso:** `204 No Content`

#### **Atualizar Status da Tarefa**
- **URL:** `/tasks/:id/status`
- **Método:** `PATCH`
- **Descrição:** Atualiza apenas o status de uma tarefa específica.
- **Corpo da Requisição:**
  ```json
  {
    "status": "completed"
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "message": "Status updated successfully",
    "task": {
      "id": 1,
      "status": "completed",
      "userId": 1
    }
  }
  ```

---

## Observações

- Todos os endpoints de tarefas requerem autenticação via JWT.
- O token JWT deve ser incluído no cabeçalho das requisições:
  ```
  Authorization: Bearer jwt_token
  ```


# Modelagem de Dados

A aplicação utiliza um banco de dados relacional (MySQL) com as seguintes tabelas e seus respectivos relacionamentos.

## Estrutura das Tabelas

### **Tabela: `users`**

| Coluna       | Tipo          | Restrições               | Descrição                           |
|--------------|---------------|--------------------------|--------------------------------------|
| `id`         | INTEGER       | Primary Key, AutoIncrement | Identificador único do usuário.     |
| `name`       | STRING(255)   | NOT NULL                | Nome do usuário.                    |
| `email`      | STRING(255)   | UNIQUE, NOT NULL        | Email único do usuário.             |
| `password`   | STRING(255)   | NOT NULL                | Senha criptografada do usuário.     |
| `createdAt`  | DATETIME      | NOT NULL                | Data de criação do registro.        |
| `updatedAt`  | DATETIME      | NOT NULL                | Data de atualização do registro.    |

---

### **Tabela: `tasks`**

| Coluna       | Tipo          | Restrições               | Descrição                           |
|--------------|---------------|--------------------------|--------------------------------------|
| `id`         | INTEGER       | Primary Key, AutoIncrement | Identificador único da tarefa.      |
| `title`      | STRING(255)   | NOT NULL                | Título da tarefa.                   |
| `description`| TEXT          | NULLABLE                | Descrição detalhada da tarefa.      |
| `status`     | ENUM('pending', 'in progress', 'completed') | Default: 'pending' | Status atual da tarefa. |
| `user_id`    | INTEGER       | Foreign Key (users.id)  | Relaciona a tarefa ao usuário.      |
| `createdAt`  | DATETIME      | NOT NULL                | Data de criação do registro.        |
| `updatedAt`  | DATETIME      | NOT NULL                | Data de atualização do registro.    |

---

## Relacionamentos

1. **Relacionamento entre `users` e `tasks`**:
    - **Tipo**: 1:N (Um usuário pode ter várias tarefas).
    - **Chave Estrangeira**: `tasks.user_id` referencia `users.id`.

---

## Scripts para Migrações

Após configurar o banco de dados e o arquivo `.env`, você pode criar as tabelas usando as migrações do Sequelize.

- Para rodar as migrações:
  ```bash
  npm run migrate
  ```

- Para desfazer as migrações:
  ```bash
  npx sequelize-cli db:migrate:undo --env development
  ```

---

## 🗂️ Diagrama Entidade-Relacionamento (ERD)

Abaixo, um diagrama representando a modelagem de dados:

```plaintext
+--------------------+       +--------------------+
|       users        |       |       tasks        |
+--------------------+       +--------------------+
| id (PK)           |◄──┐   | id (PK)           |
| name              |   └──►| user_id (FK)      |
| email             |       | title             |
| password          |       | description       |
| createdAt         |       | status            |
| updatedAt         |       | createdAt         |
+--------------------+       | updatedAt         |
                             +--------------------+
```

---
