import dotenv from 'dotenv';
dotenv.config();

import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';

const jwtSecret = process.env.JWT_SECRET;

//access token 발급
export const signAccessToken = (userId) => {
  const payload = {
    userId
  };

  return jwt.sign(payload, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};

//access token 검증
export const verifyAccessToken = (token) => {
  let decoded = null;
  try{
    decoded = jwt.verify(token, jwtSecret);
    return {
      ok: true,
      userId: decoded.userId
    };
  }catch(err){
    return {
      ok: false,
      message: err.message,
    };
  }
};

//refresh token 발급
export const signRefreshToken = () => {
  return jwt.sign({}, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '14d'
  });
};

//refresh token 검증
export const verifyRefreshToken = (token, userId) => {
  const getAsync = promisify(redisClient.get).bind(redisClient);
  
  try{
    const data = getAsync(userId);
    if (token === data){
      try {
        jwt.verify(token, jwtSecret);
        return true;
      } catch (err){
        return false;
      }
    } else{
      return false;
    }
  } catch(err){
    return false;
  }
};

//access token, refresh token 발급
export const signTokens = async (userId) => {
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken();

  await redisClient.set(String(userId), refreshToken);  //발급한 refresh token을 redis에 저장

  return { accessToken, refreshToken };
}