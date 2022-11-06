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
            `DELETE FROM TP4_Livraison.PlanRepas
            WHERE idplanrepas = ${id};`,
        );
    }

    public async insertPlanRepas(
        plan: Omit<PlanRepas, 'idplanrepas'>,
    ): Promise<void> {
        await this.databaseService.query(
            `INSERT INTO TP4_Livraison.PlanRepas VALUES(${plan.categorie}, ${plan.frequence}, ${plan.nbrpersonne}, ${plan.nbrcalorie}, ${plan.prix}, ${plan.idfournisseur});`,
        );
    }

    public async updatePlanRepas(plan: PlanRepas): Promise<void> {
        await this.databaseService.query(
            `UPDATE TP4_Livraison.PlanRepas 
            SET categorie = ${plan.categorie}, frequence = ${plan.frequence}, nbrpersonne = ${plan.nbrpersonne}, nbrcalorie = ${plan.nbrcalorie}, prix = ${plan.prix}, idfournisseur = ${plan.idfournisseur})
            WHERE idplanrepas = ${plan.idplanrepas};`,
        );
    }
}
