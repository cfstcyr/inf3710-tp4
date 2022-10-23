import { Router } from 'express';

export abstract class AbstractController {
    public router: Router;
    public path: string;

    constructor(path = '/') {
        this.router = Router();
        this.path = path;
        this.configRouter(this.router);
    }

    protected abstract configRouter(router: Router): void;
}
