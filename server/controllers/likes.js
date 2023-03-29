import db from "../db/connectDb.js"
import {v4 as generateID} from "uuid"

export const getAllLikes = async (req, res, next) => {
    try {
        const [likes] = await db.query('Select userLiked from likes where feedLiked = ?', [req.params.feedId])

        return res.status(200).json({message : 'all Likes', likes : likes.map(like => like.userLiked)})
    } catch (error) {
        return next(error)
    }
}