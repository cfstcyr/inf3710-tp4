import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { singleton } from 'tsyringe';
import { DatabaseService } from '../services/database.service';
import { Script } from 'common/communication/script';

@singleton()
export class DatabaseController {
    public constructor(private readonly databaseService: DatabaseService) {}

    public get router(): Router {
        const router: Router = Router();

        router.post('/reset', async (req, res) => {
            await this.databaseService.resetDatabase();
            res.status(StatusCodes.NO_CONTENT).send();
        });

        router.get('/reset/script', async (req, res) => {
            const data: Script = {
                script: this.databaseService.getResetDatabaseScript(),
            };
            res.status(StatusCodes.OK).json(data);
        });

        return router;
    }
}
