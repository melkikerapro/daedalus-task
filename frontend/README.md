# DaedalusTask - Procedure de demarrage

Ce projet est un monorepo TypeScript avec:

- frontend React + Vite
- backend Express
- infrastructure Amplify Gen 2 (Auth + Data)

## 1. Prerequis

- Node.js 20+
- npm 10+
- Compte AWS configure localement
- Amplify Gen 2 CLI (via scripts npm du workspace amplify)

## 2. Installation

Depuis la racine du monorepo:

```bash
npm install --workspaces
```

## 3. Variables d environnement frontend

Creer un fichier `.env.local` dans `frontend/` avec:

```env
VITE_AWS_REGION=eu-west-3
VITE_APPSYNC_GRAPHQL_ENDPOINT=https://xxxx.appsync-api.eu-west-1.amazonaws.com/graphql
VITE_COGNITO_USER_POOL_ID=eu-west-3_AuNvJHZ1W
VITE_COGNITO_USER_POOL_CLIENT_ID=4bg7bp7hsvshh817oos4su4hd1
VITE_COGNITO_IDENTITY_POOL_ID=eu-west-3:559b930d-3c0c-4222-8a7d-eb2a4a1541a5
```

Optionnel pour REST backend local:

```env
VITE_API_URL=http://localhost:3001/api
```

## 4. Demarrage local

Ouvrir 3 terminaux a la racine du projet.

Terminal 1 - Amplify sandbox:

```bash
npm run dev:sandbox
```

Terminal 2 - Backend Express:

```bash
npm run dev:backend
```

Terminal 3 - Frontend React:

```bash
npm run dev:frontend
```

Applications disponibles:

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Healthcheck backend: http://localhost:3001/health

## 5. Verification rapide

Depuis la racine:

```bash
npm run build:frontend
npm run build:backend
npm run test:all
npm run lint:all
```

## 6. Deploiement Amplify

Depuis la racine:

```bash
npm run deploy --workspace=amplify
```

Pour regenerer les sorties Amplify:

```bash
npm run generate:outputs --workspace=amplify
```

## 7. Commandes utiles

```bash
# Formater tous les workspaces
npm run format:all

# Tests frontend uniquement
npm run test --workspace=frontend

# Tests backend uniquement
npm run test --workspace=backend
```
