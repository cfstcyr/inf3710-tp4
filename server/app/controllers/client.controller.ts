import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { registry, singleton } from 'tsyringe';
import { ClientService } from '../services/client.service';
import { Types } from '../types';
import { AbstractController } from './abstract.controller';

@singleton()
@registry([{ token: Types.Controllers, useClass: ClientController }])
export class ClientController extends AbstractController {
    constructor(private readonly clientService: ClientService) {
        super('/client');
    }

    protected configRouter(router: Router): void {
        router.get('/', async (req, res) => {
            res.status(StatusCodes.OK).json(
                await this.clientService.getClients(),
            );
        });
    }
}
