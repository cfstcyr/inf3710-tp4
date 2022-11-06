import { TableItem } from 'common/tables';

export interface TableItemConfig<T> {
    path: string;
    table: string;
    idKey: keyof T;
}

export const TABLE_ITEMS: {
    [K in keyof TableItem]: TableItemConfig<TableItem[K]>;
} = {
    planRepas: {
        path: 'plan-repas',
        table: 'TP4_Livraison.PlanRepas',
        idKey: 'idplanrepas',
    },
    client: {
        path: 'client',
        table: 'TP4_Livraison.Client',
        idKey: 'idclient',
    },
    fournisseur: {
        path: 'fournisseur',
        table: 'TP4_Livraison.Fournisseur',
        idKey: 'idfournisseur',
    },
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
