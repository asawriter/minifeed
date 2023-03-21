import db from "../db/connectDb.js";
import { v4 as generateID} from "uuid";

export const createFeed = async (req, res, next) => {
    try {
        const { content, userId, feedImg, saved } = req.body;

        if(!content) return res.status(400).json({message : "Invalid content."})

        const values = [generateID(), content, userId, feedImg, saved]

        await db.query('Insert into feeds (`id`, `content`, `userId`, `feedImg`, `saved`) values (?)', [values])

        return res.status(200).json({message : 'Feed has been created.'})
    } catch (error) {
        return next(error)
    }
}

export const getAllFeeds = async (req, res, next) => {
    try {
        const [feeds] = await db.query('Select feeds.id as feedId, username, profilePic, content, feedImg, feeds.created_at as createdFeed, userId from users join feeds on users.id = feeds.userId order by feeds.created_at Desc')

        return res.status(200).json({message : 'Get all feeds.', feeds})
    } catch (error) {
        return next(error)
    }
}

export const getFeedOfUser = async (req, res, next) => {
    try {
        const [feeds] = await db.query('Select id, content, created_at, feedImg from feeds where userId = ?', [req.params.userId])

        if(!feeds) return res.status(404).json({message : 'Please create feed now.'})

        return res.status(200).json({message : 'Feeds of user.', feeds})
    } catch (error) {
        return next(error)
    }
}

export const getOneFeed = async (req, res, next) => {
    try {
        const [feed] = await db.query('select username, profilePic, saved, feedImg, feeds.created_at as feed_created ,content from users join feeds on users.id = feeds.userId where feeds.id = ?', [req.params.feedId])

        if(!feed) return res.status(404).json({message : 'Please create feed now.'})

        return res.status(200).json({message : 'Feeds of user.', feed})
    } catch (error) {
        return next(error)
    }
}

export const removeFeed = async (req, res, next) => {
    try {
        const {feedId} = req.params;

        if(!feedId) return res.status(404).json({message : "Feed not found"})

        await db.query("delete from feeds where id = ?", [feedId])

        return res.status(200).json({message : "Feed has been removed"})
    } catch (error) {
        return next(error)
    }
}

export const addSavedFeed = async (req, res, next) => {
    try {
        await db.query("update feeds set `saved` = ? where id = ?", [req.body.saved, req.params.feedId])

        return res.status(200).json({message : "Feed has been saved."})
    } catch (error) {
        return next(error)
    }
}

export const removeSavedFeed = async (req, res, next) => {
    try {
        await db.query("update feeds set `saved` = ? where id = ?", [false, req.params.feedId])

        return res.status(200).json({message : "Remove feed from saved feeds."})
    } catch (error) {
        return next(error)
    }
}

export const getSavedFeed = async (req, res, next) => {
    try {
        const [saved] = await db.query("select * from feeds where saved = ?", [1])

        return res.status(200).json({message : "saved feeds", savedFeeds : saved, saved : saved.map(s => s.id)})
    } catch (error) {
        return next(error)
    }
}

export const getSavedFeeds = async (req, res, next) => {
    try {
        const [saved] = await db.query("select feeds.*, profilePic, username from feeds join users on feeds.userId = users.id where users.id = ?", [req.params.userId])
        
        return res.status(200).json({message : "saved feeds", saved : saved.filter(s => s.saved === 1)})
    } catch (error) {
        return next(error)
    }
}