import Joi from 'joi';

export const getTests = {
  query: Joi.object({
    search: Joi.string(),
  })
};