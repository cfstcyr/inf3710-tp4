import { TableItem, TABLE_ITEMS } from 'common/tables';
import { StatusCodes } from 'http-status-codes';
import { singleton } from 'tsyringe';
import { HttpException } from '../models/http-exception';
import { DatabaseService } from './database.service';

@singleton()
export class DataService {
    constructor(private readonly databaseService: DatabaseService) {}

    public async get<K extends keyof TableItem>(
        table: K,
    ): Promise<TableItem[K][]> {
        return this.databaseService.query<TableItem[K]>(
            `SELECT * FROM ${TABLE_ITEMS[table].table};`,
        );
    }

    public async getById<K extends keyof TableItem>(
        table: K,
        id: string | number,
    ): Promise<TableItem[K]> {
        const tableName = TABLE_ITEMS[table].table;
        const idKey = String(TABLE_ITEMS[table].idKey);

        const items = await this.databaseService.query<TableItem[K]>(
            `SELECT * FROM ${tableName} t
                WHERE t.${idKey} = ${id}`,
        );

        if (items.length === 0)
            throw new HttpException(
                `No element from "${tableName}" with id "${idKey}".`,
                StatusCodes.NOT_FOUND,
            );

        return items[0];
    }

    public async deleteById<K extends keyof TableItem>(
        table: K,
        id: string | number,
    ): Promise<void> {
        await this.databaseService.query(
            `DELETE FROM ${TABLE_ITEMS[table].table} t
            WHERE t.${String(TABLE_ITEMS[table].idKey)} = ${id};`,
        );
    }
}
