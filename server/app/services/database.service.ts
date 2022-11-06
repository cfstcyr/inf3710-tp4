import * as pg from 'pg';
import { singleton } from 'tsyringe';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { HttpException } from '../models/http-exception';
import { StatusCodes } from 'http-status-codes';

@singleton()
export class DatabaseService {
    private resetSQLFile = '../../../database/TP4_Livraison.sql';

    private connectionConfig: pg.ConnectionConfig = {
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        host: process.env.DB_HOST,
        keepAlive: true,
    };

    public pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public async testConnection() {
        return await this.pool.connect();
    }

    public async resetDatabase() {
        await this.query<never>(
            readFileSync(resolve(__dirname, this.resetSQLFile), 'utf-8'),
        );
    }

    public getResetDatabaseScript() {
        return readFileSync(resolve(__dirname, this.resetSQLFile), 'utf-8');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async query<T>(query: string, values?: any[]): Promise<T[]> {
        const client = await this.pool.connect();
        const res = await client.query(query, values);
        client.release();
        return res.rows;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async queryOne<T>(query: string, values?: any[]): Promise<T> {
        const result = await this.query<T>(query, values);

        if (result.length === 0)
            throw new HttpException(
                'No item found for query',
                StatusCodes.NOT_FOUND,
            );
        if (result.length > 1)
            throw new Error('More than one item found for query');

        return result[0];
    }
}
