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
}
