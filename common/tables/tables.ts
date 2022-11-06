import { Client } from "./client";
import { PlanRepas } from "./plan-repas";

export interface TableItem {
    planRepas: PlanRepas,
    client: Client,
}
