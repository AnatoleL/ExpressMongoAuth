import {celebrate, Joi } from 'celebrate';

/**
 * Validate request bodies for
 * to have email and password strings
 */
export default celebrate({
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
});