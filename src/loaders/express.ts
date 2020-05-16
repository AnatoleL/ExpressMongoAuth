import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import {ResponseError} from '../types/Errors';
import routes from '../routes';

/**
 * @function expressLoader Loads every express middleware.
 * @argument express.Application An express application.
 */
export default async function (app: express.Application): Promise<void> {

  // Transforms raw string of requests into json
  app.use(bodyParser.json());

  // "The magic package that prevents frontend developers going nuts"
  app.use(cors);

  // security fixing module
  app.use(helmet);
  
  // Load API routes
  app.use(routes);

  /// catch 404 and forward to error handler
  app.use((_req, _res, next) => {
    const err = new ResponseError('Not Found', 404);
    next(err);
  });

  /// error handlers
  app.use((err: ResponseError, _req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status || 401)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err: ResponseError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
}