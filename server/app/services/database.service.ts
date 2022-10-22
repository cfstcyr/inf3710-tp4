import * as pg from 'pg';
import { singleton } from 'tsyringe';

@singleton()
export class DatabaseService {
    private connectionConfig: pg.ConnectionConfig = {
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT), // Warning: can also be 5433 for some users
        host: process.env.DB_HOST,
        keepAlive: true,
    };

    public pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public async testConnection() {
        return await this.pool.connect();
    }
}
