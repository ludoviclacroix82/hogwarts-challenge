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
    npm start server.js
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
    npm run build
    npm run preview
    ```

## Utilisation
Une fois le serveur backend et l'application frontend démarrés
Tu pourras alors commencer à chatter en temps réel avec d'autres utilisateurs.

##  API Documentation
L'API backend offre plusieurs endpoints pour interagir avec les données de l'application.:

| Endpoint                | Method | Params | Heeaders |  Body                                   | Response                                                                                                               |
| ----------------------- | ------ | ------------- | ---------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| /api/register           | POST   |              |           | email , user_name , password| A message stating the user has been created                                          |
| /api/login              | POST   |               |            |email, passwo | A JSON Data                                                                     |
| /api/lobby              | POST   |   house        |  x-auth-token   | -   email [Email User Login]                                  | An array containing all the message from the lobby                                                                     |
| /api/lobby/[id]         | POST    | id           |    x-auth-token         |    email [Email User Login]                             | A single message object from the lobby                                                                                 |
| /api/lobby              | POST   |            |   x-auth-token        | content : , email:             | A message stating the message has been posted                                        |
| /api/users              | GET    | yes           | x-auth-token   |                                             | A list of users, if the user is an admin gets all the registered users, if not only gets the users from the same house |
| /api/users/[id]         | GET    | yes           |   x-auth-token          | -                                            | A single user. If the user is not an admin, can only get details from people that are in the same house.               |
| /api/users/[id]/promote | POST   | yes           | x-auth-token         | -                                            | Gives admin right to the user                                                                                          |
| /api/users/[id]/demote  | POST   | yes           | x-auth-token         | -                                            | Removes admin right from the user (cannot be done on self)                                                             |
| /api/lobby/[id]         | PATCH  | yes           | x-auth-token   | An object containing the message patches     | Edit a message. Users can only edit their own messages, unless they are admins.                                        |
| /api/lobby/[id]         | DELETE | yes           | x-auth-token   | -                                            | Delete a message. Users can only edit their own messages, unless they are admins.                                      |


## Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.


