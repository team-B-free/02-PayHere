import Comment from "./../../models/comment.js";
import { response, errResponse } from "../../utils/response.js";
import statusCode from "../../utils/statusCode.js";
import message from "../../utils/responseMessage.js";
import { logger } from "../../config/winston.js";

const createComment = async content => {
  try {
    const newComment = await Comment.create({
      content,
    });

    return [
      statusCode.CREATED,
      response(statusCode.CREATED, message.SUCCESS, newComment),
    ];
  } catch (err) {
    logger.error(`Comment Service Err: ${err}`);
    return [
      statusCode.INTERNAL_SERVER_ERROR,
      errResponse(
        statusCode.INTERNAL_SERVER_ERROR,
        message.INTERNAL_SERVER_ERROR,
      ),
    ];
  }
};
const updateComment = async (comment_id, content) => {
  try {
    const newComment = await Comment.update(
      {
        content,
      },
      {
        where: { id: comment_id },
      },
    );

    return [
      statusCode.CREATED,
      response(statusCode.CREATED, message.SUCCESS, newComment),
    ];
  } catch (err) {
    logger.error(`Comment Service Err: ${err}`);
    return [
      statusCode.INTERNAL_SERVER_ERROR,
      errResponse(
        statusCode.INTERNAL_SERVER_ERROR,
        message.INTERNAL_SERVER_ERROR,
      ),
    ];
  }
};
const deleteComment = async comment_id => {
  try {
    const result = await Comment.destroy({
      where: { id: comment_id },
    });

    return [statusCode.OK, response(statusCode.OK, message.SUCCESS, result)];
  } catch (err) {
    logger.error(`Comment Service Err: ${err}`);
    return [
      statusCode.INTERNAL_SERVER_ERROR,
      errResponse(
        statusCode.INTERNAL_SERVER_ERROR,
        message.INTERNAL_SERVER_ERROR,
      ),
    ];
  }
};

export default {
  createComment,
  updateComment,
  deleteComment,
};
