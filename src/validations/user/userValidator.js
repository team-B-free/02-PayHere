import Joi from 'joi';

export const login = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};