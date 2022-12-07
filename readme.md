# INF3710 TP4

## Launching the app

### By default

1. Créer la base de donnée en exécutant le script `TP4_Livraison.sql` situé dans le répertoire `database/`.
2. Aller dans le répertoire `server/`,
    1. Créer ou modifier le fichier `.env` avec les même informations que dans le fichier `.env.exemple` avec les informations de la base de donnée.
    2. Dans un terminal, rouler la commande `npm ci` (ou `npm install`) pour installer les dépendances.
    3. Dans un terminal, rouler la commande `npm start` pour lancer le serveur.
3. Aller dans le réperrtoire `client/`
    1. Dans un terminal, rouler la commande `npm ci` (ou `npm install`) pour installer les dépendances.
    2. Dans un terminal, rouler la commande `npm start` pour lancer le serveur.
3. Dans le navigateur, visiter `http://localhost:4200`.

### With Docker

1. Install the npm dependencies in `client/` and `server/`.
2. Lauch the docker development containers.
```shell
make compose
```

#### Common problems

##### Port already in use
Docker starts 4 services on each of their respective ports.
  - Client: `4200`
  - Server: `3000`
  - Database: `5432`
  - Pgadmin4: `5050`

It is possible that some of theses ports are in use (for example, a postgresql database on port `5432`). You can override each of these ports with environment variables with the compose command.

```shell
CLIENT_PORT=4200 SERVER_PORT=3000 DB_PORT=5432 PGADMIN_PORT=5050 make compose
```