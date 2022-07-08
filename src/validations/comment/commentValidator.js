import Joi from 'joi';

/** comment Validator
 * @author 강채현
 * @version 1.0 22.07.04 comment Validator 추가
 */
export const createComment = {
  body: Joi.object({
    content: Joi.string().required(),
  }),
};

export const updateComment = {
  params: Joi.object({
    comment_id: Joi.string().required(),
  }),
  body: Joi.object({
    content: Joi.string().required(),
  }),
};

export const deleteComment = {
  params: Joi.object({
    comment_id: Joi.string().required(),
  }),
  body: Joi.object({
    content: Joi.string().required(),
  }),
};
