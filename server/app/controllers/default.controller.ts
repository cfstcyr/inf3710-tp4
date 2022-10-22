import { Router } from 'express';
import { singleton } from 'tsyringe';
import { DatabaseService } from '../services/database.service';

@singleton()
export class DefaultController {
    constructor(private databaseService: DatabaseService) {}

    public get router(): Router {
        const router: Router = Router();

        router.get('/', (req, res) => {
            res.json({ status: 'ok' });
        });

        router.get('/user', async (req, res) => {
            res.json(await this.databaseService.getClients());
        });

        return router;
    }
}
