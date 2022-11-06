import { Client } from "./client";
import { Fournisseur } from "./fournisseur";
import { PlanRepas } from "./plan-repas";

export interface TableItem {
    planRepas: PlanRepas,
    client: Client,
    fournisseur: Fournisseur,
}
