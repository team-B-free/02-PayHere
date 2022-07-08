import Joi from 'joi';

/** user Validator
 * @author 강채현
 * @version 1.0 22.07.04 user Validator 추가
 */
export const login = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const resignToken = {
  headers: Joi.object({
    authorization: Joi.string().required(),
    refreshtoken: Joi.string().required(),
  }).options({
    allowUnknown: true,
  }),
};

export const signUp = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    nickname: Joi.string().required(),
  }),
};

export const editUser = {
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).options({
    allowUnknown: true,
  }),

  body: Joi.object({
    new_nickname: Joi.string(),
    new_mbti: Joi.string(),
    new_password: Joi.string(),
  }).or('new_nickname', 'new_mbti', 'new_password'),
};

export const deleteUser = {
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).options({
    allowUnknown: true,
  }),
};
