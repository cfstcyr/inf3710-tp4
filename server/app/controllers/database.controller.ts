import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { registry, singleton } from 'tsyringe';
import { DatabaseService } from '../services/database.service';
import { Script } from 'common/communication/script';
import { AbstractController } from './abstract.controller';
import { Types } from '../types';

@singleton()
@registry([{ token: Types.Controllers, useClass: DatabaseController }])
export class DatabaseController extends AbstractController {
    public constructor(private readonly databaseService: DatabaseService) {
        super('/db');
    }

    protected configRouter(router: Router): void {
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
    }
}
