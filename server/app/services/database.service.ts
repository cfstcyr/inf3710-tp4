import * as pg from 'pg';
import { singleton } from 'tsyringe';
import { Client } from 'common/tables/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@singleton()
export class DatabaseService {
    private resetSQLFile = '../../../database/TP4_Livraison.sql';

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

    public async resetDatabase() {
        const client = await this.pool.connect();
        const query = readFileSync(
            resolve(__dirname, this.resetSQLFile),
            'utf-8',
        );
        await client.query(query);
        client.release();
    }

    public getResetDatabaseScript() {
        return readFileSync(resolve(__dirname, this.resetSQLFile), 'utf-8');
    }

    public async getClients(): Promise<Client[]> {
        const client = await this.pool.connect();
        const query = `SELECT * FROM TP4_Livraison.Client;`;
        const res = await client.query(query);
        client.release();
        return res.rows;
    }
}
