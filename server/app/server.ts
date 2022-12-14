import * as http from 'http';
import { AddressInfo } from 'net';
import { singleton } from 'tsyringe';
import { Application } from './app';
import { DatabaseService } from './services/database.service';

@singleton()
export class Server {
    private readonly appPort: string | number | boolean = this.normalizePort(
        process.env.PORT || '3000',
    );
    private readonly baseDix: number = 10;
    private server: http.Server;

    public constructor(
        private application: Application,
        private databaseService: DatabaseService,
    ) {}

    public init(): void {
        this.application.app.set('port', this.appPort);

        this.server = http.createServer(this.application.app);

        this.server.listen(this.appPort);
        this.server.on('error', (error: NodeJS.ErrnoException) =>
            this.onError(error),
        );
        this.server.on('listening', () => this.onListening());
    }

    public async testDBConnection() {
        const res = await this.databaseService.testConnection();
        console.log('DB connection OK');
        return res;
    }

    private normalizePort(val: number | string): number | string | boolean {
        const port: number =
            typeof val === 'string' ? parseInt(val, this.baseDix) : val;
        if (isNaN(port)) {
            return val;
        } else if (port >= 0) {
            return port;
        } else {
            return false;
        }
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind: string =
            typeof this.appPort === 'string'
                ? 'Pipe ' + this.appPort
                : 'Port ' + this.appPort;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListening(): void {
        const addr: string | AddressInfo | null = this.server.address();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const bind: string =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            typeof addr === 'string' ? `pipe ${addr}` : `port ${addr!.port}`;
        console.log(`Listening on ${bind}`);
    }
}
