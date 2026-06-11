# DaedalusTask Monorepo

Application de gestion de tâches en TypeScript avec architecture par couches:

- frontend: React + Vite
- backend: Express + TypeScript
- cloud: Amplify Gen 2 (Auth + Data)

## Prérequis

- Node.js 20+
- npm 10+
- Compte AWS configuré localement (credentials + region)

## Installation

Depuis la racine du projet:

```bash
npm install --workspaces
```

## Configuration Frontend (.env.local)

Créer le fichier frontend/.env.local:

```env
VITE_AWS_REGION=eu-west-1
VITE_APPSYNC_GRAPHQL_ENDPOINT=https://xxxx.appsync-api.eu-west-1.amazonaws.com/graphql
VITE_COGNITO_USER_POOL_ID=eu-west-1_xxxxx
VITE_COGNITO_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_COGNITO_IDENTITY_POOL_ID=eu-west-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Optionnel pour cibler le backend REST local:

```env
VITE_API_URL=http://localhost:3001/api
```

## Démarrage local

Lancer 3 terminaux à la racine:

Terminal 1 (Amplify sandbox):

```bash
npm run dev:sandbox
```

Terminal 2 (Backend):

```bash
npm run dev:backend
```

Terminal 3 (Frontend):

```bash
npm run dev:frontend
```

URLs utiles:

- frontend: http://localhost:5173
- backend: http://localhost:3001
- healthcheck: http://localhost:3001/health

## Vérification

```bash
npm run build:frontend
npm run build:backend
npm run test:all
npm run lint:all
```

## Déploiement Amplify

```bash
npm run deploy --workspace=amplify
```

## Commandes utiles

```bash
npm run format:all
npm run test --workspace=frontend
npm run test --workspace=backend
npm run generate:outputs --workspace=amplify
```

## Documentation complémentaire

- Frontend: voir frontend/README.md
