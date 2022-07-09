import Joi from 'joi';

// login: async (req, res) => {
//     const { email, password } = req.body;
//     const [statusCode, result] = await userService.login(email, password);

//     return res.status(statusCode).send(result);
//   },

/** moneybook Validator
 * @author 강채현
 * @version 1.0 22.07.04 moneybook Validator 추가
 */
export const getMbtiTypeMoneybook = {
  query: Joi.object({
    mbti: Joi.string().required(),
  }),
};

export const setDeleteMoneybook = {
  params: Joi.object({
    moneybook_id: Joi.required(),
  }),
};

export const setRestoreMoneyBook = {
  params: Joi.object({
    moneybook_id: Joi.required(),
  }),
};

export const updateMoneybook = {
  params: Joi.object({
    moneybook_id: Joi.required(),
  }),
  body: Joi.object({
    title: Joi.string().required(),
    is_shared: Joi.string().required(),
  }),
};
