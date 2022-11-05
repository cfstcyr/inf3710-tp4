import { singleton } from 'tsyringe';
import { DatabaseService } from './database.service';
import { PlanRepas } from 'common/tables/plan-repas';

@singleton()
export class PlanRepasService {
    constructor(private readonly databaseService: DatabaseService) {}

    public async getPlanRepas(): Promise<PlanRepas[]> {
        return this.databaseService.query(
            `SELECT * FROM TP4_Livraison.PlanRepas;`,
        );
    }

    public async deletePlanRepas(id: string): Promise<void> {
        await this.databaseService.query(
            `DELETE * FROM TP4_Livraison.PlanRepas
            WHERE idPlanRepas = ${id};`,
        );
    }

    public async insertPlanRepas(
        plan: Omit<PlanRepas, 'idPlanRepas'>,
    ): Promise<void> {
        await this.databaseService.query(
            `INSERT INTO TP4_Livraison.PlanRepas VALUES(${plan.categorie}, ${plan.frequence}, ${plan.nbrPersonne}, ${plan.nbrCalorie}, ${plan.prix}, ${plan.idFournisseur});`,
        );
    }

    public async updatePlanRepas(plan: PlanRepas): Promise<void> {
        await this.databaseService.query(
            `UPDATE TP4_Livraison.PlanRepas 
            SET categorie = ${plan.categorie}, frequence = ${plan.frequence}, nbrPersonne = ${plan.nbrPersonne}, nbrCalorie = ${plan.nbrCalorie}, prix = ${plan.prix}, idFournisseur = ${plan.idFournisseur})
            WHERE idPlanRepas = ${plan.idPlanRepas};`,
        );
    }
}
