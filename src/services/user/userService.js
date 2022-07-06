import dotenv from 'dotenv';
dotenv.config();
import { logger } from '../../config/winston.js';
import User from '../../models/user.js';
import { signTokens } from '../../utils/jwtUtil.js';
import { response, errResponse } from '../../utils/response.js';
import message from '../../utils/responseMessage.js';
import statusCode from '../../utils/statusCode.js';
import { signUpResponse } from '../../utils/responseData.js';
import CryptoJS from 'crypto-js';

const getUserId = async (email, password) => {
  try{
    const userId = await User.findOne({
      where: { email, password},
      attributes: ['id']
    });

    return userId;
  } catch(err){
    logger.error(`getUserId Service Err: ${err}`);
  }
};

const signUp = async (email, password, nickname) => {
  try{
    const isExistEmail = await User.findOne({
      where: { email },
    });

    if (isExistEmail){
      return [
        statusCode.BAD_REQUEST,
        errResponse(statusCode.BAD_REQUEST, message.ALREADY_EXIST_EMAIL)
      ];
    }

    const isExistNickname = await User.findOne({
      where: { nickname },
    });

    if (isExistNickname){
      return [
        statusCode.BAD_REQUEST,
        errResponse(statusCode.BAD_REQUEST, message.ALREADY_EXIST_NICKNAME)
      ]
    }

    const cipherPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECERT).toString();

    const newUser = await User.create({email, password: cipherPassword, nickname});
    const userId = newUser.user_id;

    const { accessToken, refreshToken } = await signTokens(userId);
    const data = signUpResponse(accessToken, refreshToken);

    return [
      statusCode.OK,
      response(statusCode.OK, message.SUCCESS, data)
    ];

  }catch(err){
    logger.error(`signUp Service Err: ${err}`);
    return [
      statusCode.DB_ERROR,
      errResponse(statusCode.DB_ERROR, message.INTERNAL_SERVER_ERROR)
    ];
  }
};

export default {
  getUserId,
  signUp,
}