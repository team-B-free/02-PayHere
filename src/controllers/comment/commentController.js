import commentService from "../../services/comment/commentService.js";

const commentController = {
  createComment: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.08 댓글 생성
     */
    const { content } = req.body;

    const [statusCode, result] = await commentService.createComment(content);

    return res.status(statusCode).send(result);
  },
  updateComment: async (req, res) => {
    const { comment_id } = req.params;
    const { content } = req.body;

    const [statusCode, result] = await commentService.updateComment(
      comment_id,
      content,
    );

    return res.status(statusCode).send(result);
  },
  deleteComment: async (req, res) => {
    const { comment_id } = req.params;

    const [statusCode, result] = await commentService.deleteComment(comment_id);

    return res.status(statusCode).send(result);
  },
};

export default commentController;
