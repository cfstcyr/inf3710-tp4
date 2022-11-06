import { TableItem } from "common/tables";

export interface TableItemConfig<T> {
    path: string;
    idKey: keyof T;
}

export const TABLE_ITEMS: { [K in keyof TableItem]: TableItemConfig<TableItem[K]> } = {
    planRepas: {
        path: 'plan-repas',
        idKey: 'idplanrepas',
    },
    client: {
        path: 'client',
        idKey: 'idclient',
    }
};

export function getTables(): (keyof TableItem)[] {
    return Object.keys(TABLE_ITEMS) as (keyof TableItem)[];
}

export function getTableFromPath(path: string): keyof TableItem {
    for (const table of getTables()) {
        if (TABLE_ITEMS[table].path === path) return table;
    }

    throw new Error(`No table for path "${path}".`);
}
