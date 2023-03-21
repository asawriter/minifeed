import db from "../db/connectDb.js"
import {v4 as generateID} from "uuid"

export const createLike = async (req, res, next) => {
    try {
        const {userLiked, feedLiked} = req.body;

        const values = [generateID(), userLiked, feedLiked]

        await db.query('Insert into likes (`id`, `userLiked`, `feedLiked`) values (?)', [values])

        return res.status(200).json({message : 'Feed has been liked'})
    } catch (error) {
        return next(error)
    }
}

export const deleteLike = async (req, res, next) => {
    try {
        const {userLiked} = req.body;

        await db.query('Delete from likes where userliked = ? and feedLiked = ?', [userLiked, req.params.feedId])

        return res.status(200).json({message : 'Feed has been unliked'})
    } catch (error) {
        return next(error)
    }
}

export const getAllLikes = async (req, res, next) => {
    try {
        const [likes] = await db.query('Select userLiked from likes where feedLiked = ?', [req.params.feedId])

        return res.status(200).json({message : 'all Likes', likes : likes.map(like => like.userLiked)})
    } catch (error) {
        return next(error)
    }
}