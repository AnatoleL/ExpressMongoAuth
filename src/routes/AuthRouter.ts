import express, { Request, NextFunction, Response } from 'express';
import authBodyCheck from './middlewares/authBodyCheck';
import { signup } from '../services/authentification';
import { ResponseError } from '../types/Errors';

const router = express.Router();

router.post('/signup', authBodyCheck, async (req: Request, res: Response, next: NextFunction) => {
        // extract data from body
        const {email, password} = req.body;

        // use it to sign up
        signup(email, password)
            .then(token => res.status(200).send(token)) // all good
            .catch(next); //An error occured
});

export default router;