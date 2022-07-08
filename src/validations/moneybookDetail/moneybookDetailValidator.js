import Joi from 'joi';

/** moneybookDetail Validator
 * @author 강채현
 * @version 1.0 22.07.04 moneybookDetail Validator 추가
 */
export const getMoneybookDetailsetDeleteMoneybook = {
  params: Joi.object({
    moneybook_id: Joi.required(),
  }),
};

export const createMoneybook = {
  params: Joi.object({
    moneybook_id: Joi.required(),
  }),
  body: Joi.object({
    money: Joi.number().required(),
    memo: Joi.string().required(),
    money_type: Joi.number().required(),
    occured_at: Joi.string().required(),
  }),
};

export const getAnotherUsersMoneybook = {
  params: Joi.object({
    moneybook_id: Joi.required(),
  }),
  query: Joi.object({
    type: Joi.string().required(),
  }),
};

export const updateMoneybook = {
  headers: Joi.object({
    authorization: Joi.string().required(),
  }),
  params: Joi.object({
    moneybook_id: Joi.required(),
  }),
  body: Joi.object({
    money: Joi.number().required(),
    memo: Joi.string().required(),
    money_type: Joi.number().required(),
  }),
};

export const deleteMoneybook = {
  params: Joi.object({
    moneybook_id: Joi.required(),
  }),
};

export const recoverMoneybook = {
  params: Joi.object({
    moneybook_id: Joi.required(),
  }),
};
