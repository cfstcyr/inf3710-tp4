import 'reflect-metadata';
import 'dotenv/config';
import { container } from 'tsyringe';
import { Server } from './server';

(async () => {
    const server = container.resolve(Server);

    await server.testDBConnection();

    server.init();
})();
