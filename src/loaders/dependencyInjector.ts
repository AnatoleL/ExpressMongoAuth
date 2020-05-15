import logger from './logger';
import {Container} from 'typedi';

/**
 * @module dependecyInjector Injects instance dependencies
 * into a container so that these instances are available 
 * from everywhere
 */
try {
    Container.set('logger', logger);
    logger.info('Logger inejected into container');
}
catch (error) {
    logger.error('Error on dependency injection loader %o', error);
    process.exit(1);
}
