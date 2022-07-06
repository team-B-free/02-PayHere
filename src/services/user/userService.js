import { logger } from '../../config/winston.js';
import User from '../../models/user.js';

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

export default {
  getUserId,
}