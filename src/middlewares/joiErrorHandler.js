import message from '../utils/responseMessage.js';
import statusCode from '../utils/statusCode.js';
import { errResponse } from '../utils/response.js';

/** 회원정보 수정 API
 * @author 강채현
 * @version 1.0 22.07.04 Joi Validaiton 에러핸들링
 */
export const joiErrorHandler = (err, res) => {
  const joiError = err.details.body[0];
  console.log(joiError);
  switch (joiError.type) {
    case 'any.required':
      return res
        .status(statusCode.BAD_REQUEST)
        .send(
          errResponse(
            statusCode.BAD_REQUEST,
            joiError.message.replace(`"`, '').replace(`"`, ''),
          ),
        );
    default:
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }
};
