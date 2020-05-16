import { Application } from 'express';
import authBodyCheck from './middlewares/authBodyCheck';
import {signup} from '../services/authentification';

export default async(app: Application): Promise<void> => {
    app.use('/signup', authBodyCheck, async (req, res, next) => {
        // extract data from body
        const {email, password} = req.body;

        // use it to sign up
        const token = await signup(email, password)
            .catch(next); //An error occured

        // respond
        res.status(200).send(token);
    });
};