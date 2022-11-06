import { Router } from 'express';
import { registry, singleton } from 'tsyringe';
import { Types } from '../types';
import { AbstractController } from './abstract.controller';
import { TableItem } from 'common/tables';
import { DataService } from '../services/data.service';
import { StatusCodes } from 'http-status-codes';
import { getTableFromPath } from '../config/data';

@singleton()
@registry([{ token: Types.Controllers, useClass: DataController }])
export class DataController extends AbstractController {
    constructor(private readonly dataService: DataService) {
        super('/');
    }

    protected configRouter(router: Router): void {
        router.get('/:table', async (req, res, next) => {
            const table = this.getTable(req.params.table);

            if (!table) return next();

            try {
                res.status(StatusCodes.OK).send(
                    await this.dataService.get(table),
                );
            } catch (error) {
                next(error);
            }
        });

        router.post('/:table', async (req, res, next) => {
            const table = this.getTable(req.params.table);

            if (!table) return next();

            try {
                await this.dataService.insert(table, req.body.data);
                res.status(StatusCodes.CREATED).send();
            } catch (error) {
                next(error);
            }
        });

        router.patch('/:table', async (req, res, next) => {
            const table = this.getTable(req.params.table);

            if (!table) return next();

            try {
                await this.dataService.patch(
                    table,
                    req.body.id,
                    req.body.updates,
                );
                res.status(StatusCodes.NO_CONTENT).send();
            } catch (error) {
                next(error);
            }
        });

        router.delete('/:table', async (req, res, next) => {
            const table = this.getTable(req.params.table);

            if (!table) return next();

            try {
                await this.dataService.delete(table, req.body.id);
                res.status(StatusCodes.NO_CONTENT).send();
            } catch (error) {
                next(error);
            }
        });
    }

    private getTable(path: string): keyof TableItem | undefined {
        try {
            return getTableFromPath(path);
        } catch (e) {
            return;
        }
    }
}
