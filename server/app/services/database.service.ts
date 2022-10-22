import { injectable } from 'inversify';
import * as pg from 'pg';

@injectable()
export class DatabaseService {
    public connectionConfig: pg.ConnectionConfig = {
        user: 'postgres',
        database: 'TP4',
        password: 'root',
        port: 5432, // Warning: can also be 5433 for some users
        host: '127.0.0.1',
        keepAlive: true,
    };

    public pool: pg.Pool = new pg.Pool(this.connectionConfig);
}
