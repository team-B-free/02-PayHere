import { logger } from "../../config/winston.js";
import { response, errResponse } from '../../utils/response.js';
import statusCode from '../../utils/statusCode.js';
import message from '../../utils/responseMessage.js';

export const getTests = async (req, res) => {
  const { search } = req.query;
  try{
    const mockData = [
      {
        id: 1,
        name: 'test1'
      },
      {
        id: 2,
        name: 'test2'
      },
    ];

    return res
    .status(statusCode.OK)
    .send(response(
      statusCode.OK,
      message.SUCCESS,
      mockData,
    ));
  }
  catch(err){
    logger.error(`getTests Err: ${err}`);
    console.log(err);

    return res
    .status(statusCode.INTERNAL_SERVER_ERROR)
    .send(errResponse(
      statusCode.INTERNAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    ));
  }
}