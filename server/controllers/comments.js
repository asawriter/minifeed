import db from "../db/connectDb.js";
import { v4 as generateID } from "uuid";

export const createComment = async (req, res, next) => {
    try {
        const {message, feedId, userId} = req.body;

        if(!message) return res.status(400).json({message : 'Invalid comment.'})

        const values = [generateID(), message, feedId, userId];

        await db.query('Insert into comments (`id`, `message`, `feedId`, `userId`) values (?)', [values])

        return res.status(200).json({message : 'Comment has been created.'})
    } catch (error) {
        return next(error)
    }
}

export const getCommentOfFeed = async (req, res, next) => {
    try {
        const [comments] = await db.query('Select username, profilePic, comments.id, message, comments.created_at as comment_created from users join comments on users.id = comments.userId where feedId = ? order by comments.created_at desc', [req.params.feedId])

        if(!comments) return res.status(404).json({message : 'You have not comment.'})

        return res.status(200).json({message : 'Comments of feed.', comments})
    } catch (error) {
        return next(error)
    }
}