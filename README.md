# Car catalog API

## Descrição

-   API Rest desenvolvida utilizando do framework Express (Node.js) com TypeScript que possibilita o registro de usuários e seus respectivos veículos na base de dados;
-   A aplicação visa demonstrar funcionalidades de validação e serialização de dados externos com Zod, autenticação de usuário e proteção de rotas via token JWT e gerenciamento de banco de dados com ORM Prisma e PostgreSQL;
-   Desenvolvimento conforme padrão TDD (test driven development), implementando testes unitários e de integração;
-   Projeto estruturado visando a escalabilidade e melhor manutenção do código. Para isso foi utilizado o padrão de design de software MVC (model-view-controller) e injeção de dependências utilizando a ferramenta Tsyringe;
-   Utilização de logs customizados para melhor manutenção do código.

## Tecnologias utilizadas

-   [Express](https://expressjs.com/): Framework Node.js;
-   [Prisma](https://www.prisma.io/): ORM utilizado em conjunto do PostgreSQL;
-   [PostgreSQL](https://www.postgresql.org/): Sistema de banco de dados relacional;-
-   [Zod](https://zod.dev/): Validação de dados;
-   [Jest](https://jestjs.io/): Framework para desenvolvimento de testes automáticos. Nesse projeto utilizado, em conjunto a ferramenta Supertest, para os testes unitários e de integração;
-   TypeScript: Linguagem de programação utilizada.

## Pré-requisitos

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/en)
-   [PostgreSQL](https://www.postgresql.org/)

## Clonando o projeto

```bash
git clone <github template url> <project_name>
```

## Instalando dependências

Instalando dependências de desenvolvimento e produção:

```bash
cd <project_name>
npm install
```

## Criando os banco de dados PostgreSQL

Banco de dados - ambiente de desenvolvimento:

```bash
psql -c "CREATE DATABASE 'db_name_dev';"
```

Banco de dados - ambiente de teste:

```bash
psql -c "CREATE DATABASE 'db_name_test';"
```

## Variáveis de ambiente

Copie o arquivo '.env.example' e o renomeie para '.env.dev'. Substitua os valores das variáveis de ambiente presentes no arquivo, para os valores de suas credenciais.

Repita esses passos para um novo arquivo chamado '.env.test', o que possibilitará a utilização dos testes automáticos da aplicação.

Esse projeto utiliza as seguintes variáveis de ambiente:

| Nome           | Descrição                                                        | Requerida |
| -------------- | ---------------------------------------------------------------- | --------- |
| DATABASE_URL   | Credenciais do banco de dados                                    | [x]       |
| JWT_SECRET_KEY | Chave secreta do Token                                           | [x]       |
| EXPIRES_IN     | Tempo de expiração do Token (ex.: "1h", "30m", etc.)             | [ ]       |
| PORT           | Porta utilizada para o recebimento das requisições pelo servidor | [ ]       |

## Migração do banco de dados

```bash
npm run migrate:dev
```

```bash
npm run migrate:test
```

## Inicialização dos testes automáticos

```bash
npm run test
```

## Inicialização do servidor

O servidor da API roda, por padrão, na porta 3000.

```bash
npm run dev
```

Navegue até http://localhost:3000 para acessar a API.

## Documentação

Acesse a documentação das rotas da API em http://localhost:3000/docs

Acesse a documentação do Swagger no formato `json` em http://localhost:3000/docs.json

### Rotas da aplicação

#### Endpoint /cars

**Rotas não autenticadas**

**GET**

Listar todos os veículos registrados.

Não há a necessidade de envio de corpo na requisição.

Padrão de resposta da requisição:

-   Status 200 - OK:

```json
[
    {
        "id": "ba9e8eef-0fa6-44fb-b08d-f839713903db",
        "name": "Car_name",
        "description": "Car_description",
        "brand": "Car_brand",
        "year": 1990,
        "km": 10000,
        "userId": "f8397139-b08d-b08d-b08d-f839713903db"
    }
]
```

**Rotas autenticadas**

**POST**

Registrar um novo veículo.

Autorização:

```json
{
    "headers": {
        "authorization": "Bearer {token}"
    }
}
```

Padrão de corpo da requisição:

```json
{
    "name": "Car_name",
    "description": "Car_description",
    "brand": "Car_brand",
    "year": 1990,
    "km": 10000,
    "userId": "f8397139-b08d-b08d-b08d-f839713903db"
}
```

Padrão de resposta da requisição:

-   Status 201 - OK:

```json
{
    "id": "ba9e8eef-0fa6-44fb-b08d-f839713903db",
    "name": "Car_name",
    "description": "Car_description",
    "brand": "Car_brand",
    "year": 1990,
    "km": 10000,
    "userId": "f8397139-b08d-b08d-b08d-f839713903db"
}
```

-   Status 400 - BAD REQUEST:

```json
{
    "errors": {
        "km": ["Expected number, received string"]
    }
}
```

-   Status 401 - UNAUTHORIZED:

```json
{
    "error": "Token is required."
}
```

-   Status 404 - NOT FOUND:

```json
{
    "error": "Resource not found."
}
```

#### Endpoint /cars/{id}

**Rotas não autenticadas**

**GET**

Listar um veículo específico.

Parâmetro da rota (obrigatório):

-   id

Não há a necessidade de envio de corpo na requisição.

Padrão de resposta da requisição:

-   Status 200 - OK:

```json
{
    "id": "ba9e8eef-0fa6-44fb-b08d-f839713903db",
    "name": "Car_name",
    "description": "Car_description",
    "brand": "Car_brand",
    "year": 1990,
    "km": 10000,
    "userId": "f8397139-b08d-b08d-b08d-f839713903db"
}
```

-   Status 404 - NOT FOUND:

```json
{
    "error": "Resource not found."
}
```

**Rotas autenticadas**

**PATCH**

Atualizar dados de um veículo específico.

Parâmetro da rota (obrigatório):

-   id

Autorização:

```json
{
    "headers": {
        "authorization": "Bearer {token}"
    }
}
```

Padrão de corpo da requisição (todos os campos opcionais):

```json
{
    "name": "Car_name",
    "description": "Car_description",
    "brand": "Car_brand",
    "year": 1990,
    "km": 10000
}
```

Padrão de resposta da requisição:

-   Status 200 - OK:

```json
{
    "id": "ba9e8eef-0fa6-44fb-b08d-f839713903db",
    "name": "Car_name",
    "description": "Car_description",
    "brand": "Car_brand",
    "year": 1990,
    "km": 10000,
    "userId": "f8397139-b08d-b08d-b08d-f839713903db"
}
```

-   Status 400 - BAD REQUEST:

```json
{
    "errors": {
        "km": ["Expected number, received string"]
    }
}
```

-   Status 401 - UNAUTHORIZED:

```json
{
    "error": "Token is required."
}
```

-   Status 403 - FORBIDDEN:

```json
{
    "error": "User must be the car owner."
}
```

-   Status 404 - NOT FOUND:

```json
{
    "error": "Resource not found."
}
```

**DELETE**

Excluir dados de um veículo específico.

Parâmetro da rota (obrigatório):

-   id

Autorização:

```json
{
    "headers": {
        "authorization": "Bearer {token}"
    }
}
```

Não há a necessidade de envio de corpo na requisição.

Padrão de resposta da requisição:

-   Status 204 - NO CONTENT
-   Status 401 - UNAUTHORIZED:

```json
{
    "error": "Token is required."
}
```

-   Status 403 - FORBIDDEN:

```json
{
    "error": "User must be the car owner."
}
```

-   Status 404 - NOT FOUND:

```json
{
    "error": "Resource not found."
}
```

#### Endpoint /users

**Rotas não autenticadas**

**POST**

Registrar um novo usuário.

Padrão de corpo da requisição:

```json
{
    "name": "User_name",
    "email": "User_email",
    "password": "User_password"
}
```

Padrão de resposta da requisição:

-   Status 201 - CREATED:

```json
{
    "id": "ba9e8eef-0fa6-44fb-b08d-f839713903db",
    "name": "User_name",
    "email": "User_email"
}
```

-   Status 400 - BAD REQUEST:

```json
{
    "errors": {
        "name": ["Expected string, received number"]
    }
}
```

-   Status 409 - CONFLICT:

```json
{
    "error": "E-mail already registered."
}
```

**Rotas autenticadas**

**POST**

Listar dados de um usuário específico.

Autorização:

```json
{
    "headers": {
        "authorization": "Bearer {token}"
    }
}
```

Não há a necessidade de envio de corpo na requisição.

Padrão de resposta da requisição:

-   Status 200 - OK:

```json
{
    "id": "ba9e8eef-0fa6-44fb-b08d-f839713903db",
    "name": "User_name",
    "email": "User_email"
}
```

-   Status 401 - UNAUTHORIZED:

```json
{
    "error": "Token is required."
}
```

-   Status 404 - NOT FOUND:

```json
{
    "error": "Resource not found."
}
```

#### Endpoint /users/login

**Rotas não autenticadas**

**POST**

Efetuar login de usuário.

Padrão de corpo da requisição:

```json
{
    "email": "User_email",
    "password": "User_password"
}
```

Padrão de resposta da requisição:

-   Status 200 - OK:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "user": {
        "id": "63a39781-ef3b-41a8-a022-4b835c2e0d09",
        "name": "User_name",
        "email": "User_email"
    }
}
```

-   Status 400 - BAD REQUEST:

```json
{
    "errors": {
        "name": ["Expected string, received number"]
    }
}
```

-   Status 401 - UNAUTHORIZED:

```json
{
    "error": "E-mail and password doesn't match."
}
```

-   Status 404 - NOT FOUND:

```json
{
    "error": "Resource not found."
}
```
