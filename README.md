# Encontrei!

Aplicativo mobile para reportar objetos perdidos e encontrados no campus.

## Funcionalidades

- Cadastro e login com e-mail e senha
- Publicar objetos perdidos ou encontrados
- Filtrar publicações por tipo
- Editar e excluir suas próprias publicações
- Regras de segurança: só o dono pode editar ou excluir

## Tecnologias

- React Native com Expo
- Firebase Authentication
- Firebase Firestore

## Como rodar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Crie o arquivo `.env` na raiz com as chaves do Firebase (veja `.env.example`)
4. Rode o projeto: `npx expo start`
5. Escaneie o QR code com o Expo Go

## Estrutura do projeto

```
src/
├── components/      # Componentes reutilizáveis
├── context/         # Contexto de autenticação
├── navigation/      # Configuração de rotas
├── screens/         # Telas do aplicativo
└── services/        # Firebase e Firestore
```

## Equipe

- Pessoa 1 — Estrutura, Firebase e autenticação
- Pessoa 2 — Interface, listagem e consulta
- Pessoa 3 — Formulário, CRUD e segurança