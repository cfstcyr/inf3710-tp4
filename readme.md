# INF3710 TP4

## Launching the app

### With Docker

To lauch the docker development containers.
```
make compose
```
Or in detach mode.
```
make compose-detach
```

#### Common problems

##### Port already in use
Docker starts 4 services on each of their respective ports.
  - Client: `4200`
  - Server: `3000`
  - Database: `5432`
  - Pgadmin4: `5050`

It is possible that some of theses ports are in use (for example, a postgresql database on port `5432`). You can override each of these ports with environment variables with the compose command.

```
CLIENT_PORT=4200 SERVER_PORT=3000 DB_PORT=5432 PGADMIN_PORT=5050 make compose
```

### Without Docker

#### Configuration

You have to setup the `.env` files in `server/` and `client/`. Both directories have a `.env.example` file to start from. Then, both apps can be started separatly with `npm start`.