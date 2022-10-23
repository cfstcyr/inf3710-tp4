import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { registry, singleton } from 'tsyringe';
import { DatabaseService } from '../services/database.service';
import { Script } from 'common/communication/script';
import { AbstractController } from './abstract.controller';
import { Types } from '../types';
import { QueryScriptService } from '../services/query-script.service';
import { HttpException } from '../models/http-exception';

@singleton()
@registry([{ token: Types.Controllers, useClass: DatabaseController }])
export class DatabaseController extends AbstractController {
    public constructor(
        private readonly databaseService: DatabaseService,
        private readonly queryScriptService: QueryScriptService,
    ) {
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

        router.get('/script', (req, res) => {
            res.status(StatusCodes.OK).json(
                this.queryScriptService.getQueryScripts('array'),
            );
        });

        router.post('/script', async (req, res, next) => {
            const number = req.body.number;

            if (!number)
                return next(
                    new HttpException(
                        `POST /db/script requires a "number" body argument`,
                        StatusCodes.BAD_REQUEST,
                    ),
                );

            try {
                res.status(StatusCodes.OK).json(
                    await this.queryScriptService.executeQueryScript(number),
                );
            } catch (e) {
                next(e);
            }
        });
    }
}
