import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import * as logger from 'morgan';
import { DatabaseController } from './controllers/database.controller';
import { HttpException } from './models/http-exception';
import Types from './types';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class Application {
    public app: express.Application;

    public constructor(
        @inject(Types.DatabaseController)
        private databaseController: DatabaseController
    ) {
        this.app = express();
        this.config();
        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    public bindRoutes(): void {
        // Notre application utilise le routeur de notre API
        this.app.use('/database', this.databaseController.router);
        this.errorHandeling();
    }

    private errorHandeling(): void {
        this.app.use(
            (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction
            ) => {
                next(new HttpException('Not Found', StatusCodes.NOT_FOUND));
            }
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.app.use(
            (
                err: Error,
                req: express.Request,
                res: express.Response,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                next: express.NextFunction
            ) => {
                res.status(
                    err instanceof HttpException
                        ? err.status
                        : StatusCodes.INTERNAL_SERVER_ERROR
                );

                res.send({
                    message: err.message,
                    error: err,
                });
            }
        );
    }
}
