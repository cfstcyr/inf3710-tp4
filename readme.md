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

### Without Docker

#### Configuration

You have to setup the `.env` files in `server/` and `client/`. Both directories have a `.env.example` file to start from. Then, both apps can be started separatly with `npm start`.