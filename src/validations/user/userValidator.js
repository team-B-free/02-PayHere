import Joi from 'joi';

export const login = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

export const resignToken = {
  headers: Joi.object({
    authorization: Joi.string().required(),
    refreshtoken: Joi.string().required()
  })
};