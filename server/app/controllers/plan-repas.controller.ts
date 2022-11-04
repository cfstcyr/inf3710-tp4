import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { registry, singleton } from 'tsyringe';
import { HttpException } from '../models/http-exception';
import { PlanRepasService } from '../services/plan-repas.service';
import { Types } from '../types';
import { AbstractController } from './abstract.controller';

@singleton()
@registry([{ token: Types.Controllers, useClass: PlanRepasController }])
export class PlanRepasController extends AbstractController {
    constructor(private readonly planRepasService: PlanRepasService) {
        super('/plan-repas');
    }

    protected configRouter(router: Router): void {
        router.get('/', async (req, res, next) => {
            try {
                res.status(StatusCodes.OK).json(
                    await this.planRepasService.getPlanRepas(),
                );
            } catch (e) {
                next(e);
            }
        });
    }
}
