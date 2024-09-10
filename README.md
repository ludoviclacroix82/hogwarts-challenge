# Hogwarts-challenge

## Description
Hogwarts-challenge est une application de chat en temps réel inspirée de l'univers de Harry Potter. Le projet utilise un backend en Node.js pour gérer l'API et un frontend en Vue.js pour l'interface utilisateur.

## Table des matières
- Installation
- Utilisation
- API
- Contribuer
- Licence

## Installation

### Backend
1. Clone le dépôt :
    ```bash
    git clone https://github.com/ton-utilisateur/hogwarts-chat.git
    cd hogwarts-chat/backend
    ```
2. Installe les dépendances :
    ```bash
    npm install
    ```
3. Copie le fichier `.env.example` en `.env` et remplis les informations nécessaires :
    ```env
    MONGO_USER=user Mongo Db
    MONGO_PWD=password Mongo Db
    PORT=port
    LEVEL_HASH_PWD=level hash
    SECRETKEY=secret key
    EXPIRESTOKEN=1h
    ```
4. Démarre le serveur :
    ```bash
    npm start
    ```

### Frontend
1. Va dans le répertoire frontend :
    ```bash
    cd ../frontend
    ```
2. Installe les dépendances :
    ```bash
    npm install
    ```
3. Démarre l'application Vue.js :
    ```bash
    npm run serve
    ```

## Utilisation
Une fois le serveur backend et l'application frontend démarrés, ouvre ton navigateur et va à l'adresse suivante :

Tu pourras alors commencer à chatter en temps réel avec d'autres utilisateurs.

## API
L'API backend offre plusieurs endpoints pour interagir avec les données de l'application. Voici quelques exemples :

- `GET /api/messages` : Récupère la liste des messages.
- `POST /api/messages` : Envoie un nouveau message.
- `GET /api/users` : Récupère la liste des utilisateurs.
- `POST /api/users` : Crée un nouvel utilisateur.

## Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.


