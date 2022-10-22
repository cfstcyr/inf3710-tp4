import { Router } from 'express';
import { singleton } from 'tsyringe';
// import { DatabaseService } from '../services/database.service';
// import Types from '../types';

@singleton()
export class DatabaseController {
    // public constructor(
    // @inject(Types.DatabaseService)
    // private readonly databaseService: DatabaseService,
    // ) { }

    public get router(): Router {
        const router: Router = Router();

        return router;
    }
}
