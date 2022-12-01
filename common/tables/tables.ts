import { Client } from "./client";
import { Fournisseur } from "./fournisseur";
import { PlanRepas } from "./plan-repas";
import { KitRepas } from "./kit-repas";
import { Telephone } from "./telephone";

export interface TableItem {
    client: Client,
    telephone: Telephone,
    planRepas: PlanRepas,
    kitRepas: KitRepas
    fournisseur: Fournisseur,
}
