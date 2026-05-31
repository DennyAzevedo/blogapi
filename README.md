# BlogAPI - Backend de Blog para Aprendizagem

## Sobre o projeto
Este projeto e um Backend de uma API para um blog simples.
Ele foi pensado para apoiar a aprendizagem dos alunos do curso tecnico integrado ao ensino medio do IFSP, campus Caraguatatuba, na disciplina CARLPRO.

A ideia principal e praticar conceitos essenciais de desenvolvimento web backend, como:
- criacao de rotas
- organizacao em camadas (routes, controllers, libs)
- validacao e fluxo de autenticacao
- persistencia de dados com ORM
- uso de container para ambiente de desenvolvimento

## Objetivo didatico
Com este projeto, o estudante pode aprender a:
1. Estruturar uma API REST com Node.js e TypeScript.
2. Trabalhar com banco relacional usando Prisma ORM.
3. Entender separacao de responsabilidades no codigo.
4. Executar o projeto de formas diferentes (local e Docker).
5. Evoluir um backend incrementalmente, por funcionalidades.

## Tecnologias utilizadas
- Node.js
- TypeScript
- Express
- Prisma ORM
- MySQL
- Docker e Docker Compose (ambiente de desenvolvimento)

## Pacotes principais
Abaixo estao os pacotes mais importantes do projeto e para que servem:

### Dependencias de runtime
- express: framework HTTP para criar as rotas da API.
- cors: permite chamadas de frontend em outros dominios.
- body-parser: faz parse de JSON e formularios.
- @prisma/client: cliente do Prisma para acesso ao banco.
- zod: validacao de dados de entrada.
- jsonwebtoken: criacao e validacao de tokens JWT.
- bcryptjs: hash de senha para autenticacao segura.
- multer: upload de arquivos (exemplo: capas de post).
- slug: geracao de slugs amigaveis para URLs.
- uuid: geracao de identificadores unicos.

### Dependencias de desenvolvimento
- typescript: linguagem tipada sobre JavaScript.
- tsx: executa TypeScript diretamente em modo dev.
- prisma: CLI do Prisma para migracoes e client.
- @types/*: tipos TypeScript para bibliotecas JS.

## Estrutura resumida do projeto
- src/server.ts: inicializacao do servidor Express.
- src/routes: definicao das rotas da API.
- src/controllers: regras de negocio por modulo.
- src/libs/prisma.ts: instancia compartilhada do Prisma.
- prisma/schema.prisma: modelos e configuracao do banco.
- public: arquivos estaticos.

## Rotas atualmente mapeadas
### Autenticacao
- POST /api/auth/signin
- POST /api/auth/signup
- POST /api/auth/validate

### Admin (posts)
- POST /api/admin/posts
- PUT /api/admin/posts/:slug
- DELETE /api/admin/posts/:slug
- GET /api/admin/posts
- GET /api/admin/posts/:slug

### Publicas
- GET /api/teste
- GET /api/posts
- GET /api/posts/:slug
- GET /api/posts/:slug/related

Observacao: os controllers estao em formato de esqueleto (scaffold), entao parte da logica de negocio ainda precisa ser implementada.

## Pre-requisitos
Antes de iniciar, instale:
- Node.js 20+ (recomendado usar versao atual LTS)
- npm
- MySQL em execucao
- Docker e Docker Compose (opcional)

## Configuracao do ambiente
1. Criar arquivo de ambiente:

```bash
cp .env.exemple .env
```

2. Editar a variavel DATABASE_URL no arquivo .env.
Exemplo de formato:

```env
DATABASE_URL="mysql://usuario:senha@host:3306/blogapi"
```

3. Se necessario, ajuste tambem a porta (o servidor usa 4000 no codigo atual).

## Como executar localmente (passo a passo)
1. Instale as dependencias:

```bash
npm install
```

2. Gere o client do Prisma:

```bash
npx prisma generate
```

3. Aplique migracoes no banco:

```bash
npx prisma migrate deploy
```

Em ambiente de estudo/dev, voce tambem pode usar:

```bash
npx prisma migrate dev
```

4. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

5. Teste no navegador ou no Postman:

- http://localhost:4000/api/teste

## Como executar com Docker
O docker-compose deste projeto sobe o container da API.
Importante: o banco MySQL precisa estar acessivel externamente, pois o compose atual nao define um servico de banco.

1. Build e subida do container:

```bash
docker compose up --build
```

2. A API ficara disponivel em:

- http://localhost:4000

3. Para parar os containers:

```bash
docker compose down
```

## Fluxo sugerido para as aulas
1. Subir o projeto e validar rota /api/teste.
2. Implementar cadastro e login no modulo de auth.
3. Implementar CRUD de posts no modulo admin.
4. Implementar listagem publica e posts relacionados.
5. Validar entradas com zod e tratar erros.
6. Evoluir autenticacao com JWT.

## Licenca
MIT

## Autor
Denny Paulista Azevedo Filho
