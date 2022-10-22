import * as http from 'http';
import { AddressInfo } from 'net';
import { singleton } from 'tsyringe';
import { Application } from './app';
import { DatabaseService } from './services/database.service';

@singleton()
export class Server {
    private readonly appPort = this.normalizePort(process.env.PORT) ?? 3000;
    private readonly baseDix: number = 10;
    private server: http.Server;

    public constructor(
        private application: Application,
        private databaseService: DatabaseService,
    ) {}

    public init(): void {
        this.application.app.listen(this.appPort, () =>
            console.log(
                `Server up on port ${this.appPort} (http://127.0.0.1:${this.appPort})`,
            ),
        );
    }

    public async testDBConnection() {
        const res = await this.databaseService.testConnection();
        console.log('DB connection OK');
        return res;
    }

    private normalizePort(val: number | string | undefined): number {
        switch (typeof val) {
            case 'number':
                return val;
            case 'string':
                return parseInt(val);
            default:
                return 3000;
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
