import 'reflect-metadata';
import { container } from 'tsyringe';
import { Server } from './server';

// const server: Server = container.get<Server>(Types.Server);

// server.init();

(() => {
    const server = container.resolve(Server);

    server.init();
})();
