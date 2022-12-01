import { TableItem } from 'common/tables';
import { singleton } from 'tsyringe';
import { TABLE_ITEMS } from '../config/data';
import { DatabaseService } from './database.service';

@singleton()
export class DataService {
    constructor(private readonly databaseService: DatabaseService) {}

    public async get<K extends keyof TableItem>(
        table: K,
    ): Promise<TableItem[K][]> {
        return this.databaseService.query<TableItem[K]>(
            `SELECT * FROM ${this.getTableName(table)}
                ORDER BY ${this.getIdKey(table)};`,
        );
    }

    public async insert<K extends keyof TableItem>(
        table: K,
        data: Partial<TableItem[K]>,
    ): Promise<void> {
        const id = await this.databaseService.queryOne<{ max: number }>(
            `SELECT max(${this.getIdKey(table)}) 
                FROM ${this.getTableName(table)};`,
        );

        data[this.getIdKey(table)] = id.max + 1;

        await this.databaseService.query(
            `INSERT INTO ${this.getTableName(table)} 
                (${Object.keys(data).join(', ')})
                VALUES (${Object.values(data)
                    .map((_, i) => `$${i + 1}`)
                    .join(', ')});`,
            [...Object.values(data)],
        );
    }

    public async delete<K extends keyof TableItem>(
        table: K,
        id: string | number,
    ): Promise<void> {
        await this.databaseService.query(
            `DELETE FROM ${this.getTableName(table)}
            WHERE ${this.getIdKey(table)} = $1;`,
            [id],
        );
    }

    public async patch<K extends keyof TableItem>(
        table: K,
        id: string | number,
        updates: Partial<TableItem[K]>,
    ): Promise<void> {
        const keys = Object.keys(updates).filter(
            k => k !== this.getIdKey(table),
        );

        await this.databaseService.query(
            `UPDATE ${this.getTableName(table)}
            SET ${keys.map((k, i) => `${k} = $${i + 1}`).join(', ')}
            WHERE ${this.getIdKey(table)} = ${id};`,
            [...keys.map(k => updates[k])],
        );
    }

    private getTableName<K extends keyof TableItem>(table: K): string {
        return TABLE_ITEMS[table].table;
    }

    private getIdKey<K extends keyof TableItem>(table: K): string {
        return String(TABLE_ITEMS[table].idKey);
    }
}
