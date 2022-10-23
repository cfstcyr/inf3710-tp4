import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { registry, singleton } from 'tsyringe';
import { Types } from '../types';
import { AbstractController } from './abstract.controller';
import { Status } from 'common/communication/status';
import { DatabaseService } from '../services/database.service';

@singleton()
@registry([{ token: Types.Controllers, useClass: DefaultController }])
export class DefaultController extends AbstractController {
    constructor(private readonly databaseService: DatabaseService) {
        super('/');
    }

    protected configRouter(router: Router): void {
        router.get('/', async (req, res) => {
            const status: Status = {
                server: 'ok',
                db: (await this.databaseService.testConnection())
                    ? 'ok'
                    : 'error',
            };
            res.status(StatusCodes.OK).json(status);
        });
    }
}
