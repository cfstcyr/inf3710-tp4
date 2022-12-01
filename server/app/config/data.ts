import { TableItem } from 'common/tables';

export interface TableItemConfig<T> {
    path: string;
    table: string;
    idKey: keyof T;
}

export const TABLE_ITEMS: {
    [K in keyof TableItem]: TableItemConfig<TableItem[K]>;
} = {
    client: {
        path: 'client',
        table: 'TP4_Livraison.Client',
        idKey: 'idclient',
    },
    telephone: {
        path: 'telephone',
        table: 'TP4_Livraison.Telephone',
        idKey: 'numerotelephone',
    },
    planRepas: {
        path: 'plan-repas',
        table: 'TP4_Livraison.PlanRepas',
        idKey: 'idplanrepas',
    },
    kitRepas: {
        path: 'kit-repas',
        table: 'TP4_Livraison.KitRepas',
        idKey: 'idkitrepas',
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
