import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
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

        router.get('/client', async (req, res) => {
            res.status(StatusCodes.OK).json(
                await this.databaseService.getClients(),
            );
        });

        return router;
    }
}
