import { Client } from 'common/tables/client';
import { singleton } from 'tsyringe';
import { DatabaseService } from './database.service';

@singleton()
export class ClientService {
    constructor(private readonly databaseService: DatabaseService) {}

    public async getClients(): Promise<Client[]> {
        return this.databaseService.query(
            `SELECT * FROM TP4_Livraison.Client;`,
        );
    }
}
