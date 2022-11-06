import { Router } from 'express';
import { registry, singleton } from 'tsyringe';
import { Types } from '../types';
import { AbstractController } from './abstract.controller';
import { getTableFromPath, TableItem } from 'common/tables';
import { DataService } from '../services/data.service';
import { StatusCodes } from 'http-status-codes';

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

        router.get('/:table/:id', async (req, res, next) => {
            const table = this.getTable(req.params.table);

            if (!table) return next();

            try {
                res.status(StatusCodes.OK).send(
                    await this.dataService.getById(table, req.params.id),
                );
            } catch (error) {
                next(error);
            }
        });

        router.delete('/:table', async (req, res, next) => {
            const table = this.getTable(req.params.table);

            if (!table) return next();

            try {
                res.status(StatusCodes.OK).send(
                    await this.dataService.deleteById(table, req.body.id),
                );
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
