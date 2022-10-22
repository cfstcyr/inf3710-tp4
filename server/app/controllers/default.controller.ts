import { Router } from 'express';
import { singleton } from 'tsyringe';

@singleton()
export class DefaultController {
    public get router(): Router {
        const router: Router = Router();

        router.get('/', (req, res) => {
            res.json({ status: 'ok' });
        });

        return router;
    }
}
