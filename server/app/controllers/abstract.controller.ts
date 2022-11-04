import { Application, Router } from 'express';

export abstract class AbstractController {
    private router: Router;
    private path: string;

    constructor(path = '/') {
        this.router = Router();
        this.path = path;
        this.configRouter(this.router);
    }

    public use(app: Application) {
        app.use(this.path, this.router);
    }

    protected abstract configRouter(router: Router): void;
}
