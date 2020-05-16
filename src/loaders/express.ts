import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import {ResponseError} from '../types/Errors';
import AuthRouter from '../routes';
import logger from './logger';

/**
 * @function expressLoader Loads every express middleware.
 * @argument express.Application An express application.
 */
export default async function (app: express.Application): Promise<void> {
  // Log every request
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  // Transforms raw string of requests into json
  app.use(bodyParser.json());

  // "The magic package that prevents frontend developers going nuts"
  app.use(cors());

  // security fixing module
  app.use(helmet());
  
  // Load API routes
  app.use('/auth', AuthRouter);

  // catch 404 and forward to error handler
  app.use((req, _res, next) => {
    logger.info(`404 NOT FOUND: ${req.method} ${req.url}`);
    const err = new ResponseError('Not Found', 404);
    next(err);
  });

  // error handler
  app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    if (req.url === '/auth/signup')
      logger.info(`Signup failed: ${err.message}`);
    else
      logger.debug(`Error handler: ${err}`);
    res.status(err.status || 500);
    res.send(err.message);
    next();
  });
}