import db from "../db/connectDb.js";
import { v4 as generateID } from "uuid";

export const createComment = async (req, res, next) => {
  try {
    const { content, parentFeed, author, parentId } = req.body;

    if (!content) return res.status(400).json({ message: "Invalid comment." });

    const values = [generateID(), content, parentFeed, author, parentId];

    await db.query(
      "Insert into comments (`id`, `content`, `parentFeed`, `author`, `parentId`) values (?)",
      [values]
    );

    return res.status(200).json({ message: "Comment has been created." });
  } catch (error) {
    return next(error);
  }
};

export const getCommentsByFeedId = async (req, res, next) => {
  try {
    const [comments] = await db.query(
      "Select name, avatar, parentId, author, parentFeed, comments.id as commentId, content, comments.created_at as createdComment from users join comments on users.id = comments.author where parentFeed = ? order by comments.created_at desc",
      [req.params.feedId]
    );

    if (!comments)
      return res.status(404).json({ message: "You have not comment." });

    return res.status(200).json({ message: "Comments of feed.", comments });
  } catch (error) {
    return next(error);
  }
};


