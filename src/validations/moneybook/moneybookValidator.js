import Joi from "joi";

// login: async (req, res) => {
//     const { email, password } = req.body;
//     const [statusCode, result] = await userService.login(email, password);

//     return res.status(statusCode).send(result);
//   },

export const getMbtiTypeMoneybook = {
  query: Joi.object({
    result: Joi.object.required(),
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
