import db from "../db/connectDb.js";
import { v4 as generateID } from "uuid";

// GET ALL FEEDS
export const getAllFeeds = async (req, res, next) => {
  try {
    const [feeds] = await db.query(
      "Select feeds.id as feedId, name, avatar, title, content, image, feeds.created_at as createdFeed, author from users join feeds on users.id = feeds.author order by feeds.created_at Desc"
    );

    return res.status(200).json({ message: "Get all feeds.", feeds });
  } catch (error) {
    return next(error);
  }
};

// GET FEED BY USERID
export const getFeedByUserId = async (req, res, next) => {
  try {
    const [feeds] = await db.query(
      "Select * from feeds where userId = ? order by created_at desc",
      [req.params.userId]
    );

    if (!feeds)
      return res.status(404).json({ message: "Please create feed now." });

    return res.status(200).json({ message: "Feeds of user.", feeds });
  } catch (error) {
    return next(error);
  }
};

// GET FEED BY ID
export const getFeedById = async (req, res, next) => {
  try {
    const [feed] = await db.query(
      "Select feeds.id as feedId, name, avatar, title, content, image, feeds.created_at as createdFeed, author from users join feeds on users.id = feeds.author where feeds.id = ? order by feeds.created_at Desc",
      [req.params.feedId]
    );

    return res.status(200).json({ message: "Get a feed by id.", feed });
  } catch (error) {
    return next(error);
  }
};

// SEARCH
export const getSearchResults = async (req, res, next) => {};

// CREATE NEW FEED
export const createFeed = async (req, res, next) => {
  try {
    const { title, content, author, image, saved } = req.body;

    if (!content) return res.status(400).json({ message: "Invalid content." });

    const values = [generateID(), title, content, author, image, saved];

    await db.query(
      "Insert into feeds (`id`, `title`, `content`, `author`, `image`, `saved`) values (?)",
      [values]
    );

    return res.status(200).json({ message: "Feed has been created." });
  } catch (error) {
    return next(error);
  }
};

// REMOVE FEED
export const removeFeed = async (req, res, next) => {
  try {
    const { feedId } = req.params;

    if (!feedId) return res.status(404).json({ message: "Feed not found" });

    await db.query("delete from feeds where id = ?", [feedId]);

    return res.status(200).json({ message: "Feed has been removed" });
  } catch (error) {
    return next(error);
  }
};

// LIKE FEED
export const createLike = async (req, res, next) => {
  try {
    const { userLiked, feedLiked } = req.body;

    const values = [generateID(), userLiked, feedLiked];

    await db.query(
      "Insert into likes (`id`, `userLiked`, `feedLiked`) values (?)",
      [values]
    );

    return res.status(200).json({ message: "Feed has been liked" });
  } catch (error) {
    return next(error);
  }
};

// DISLIKE FEED
export const deleteLike = async (req, res, next) => {
  try {
    const { userLiked } = req.body;

    await db.query("Delete from likes where userliked = ? and feedLiked = ?", [
      userLiked,
      req.params.feedId,
    ]);

    return res.status(200).json({ message: "Feed has been unliked" });
  } catch (error) {
    return next(error);
  }
};

export const getOneFeed = async (req, res, next) => {
  try {
    const [feed] = await db.query(
      "select username, title, profilePic, saved, feedImg, feeds.created_at as feed_created ,content from users join feeds on users.id = feeds.userId where feeds.id = ?",
      [req.params.feedId]
    );

    if (!feed)
      return res.status(404).json({ message: "Please create feed now." });

    return res.status(200).json({ message: "Feeds of user.", feed });
  } catch (error) {
    return next(error);
  }
};

export const addSavedFeed = async (req, res, next) => {
  try {
    await db.query("update feeds set `saved` = ? where id = ?", [
      req.body.saved,
      req.params.feedId,
    ]);

    return res.status(200).json({ message: "Feed has been saved." });
  } catch (error) {
    return next(error);
  }
};

export const removeSavedFeed = async (req, res, next) => {
  try {
    await db.query("update feeds set `saved` = ? where id = ?", [
      false,
      req.params.feedId,
    ]);

    return res.status(200).json({ message: "Remove feed from saved feeds." });
  } catch (error) {
    return next(error);
  }
};

export const getSavedFeed = async (req, res, next) => {
  try {
    const [saved] = await db.query("select * from feeds where saved = ?", [1]);

    return res.status(200).json({
      message: "saved feeds",
      savedFeeds: saved,
      saved: saved.map((s) => s.id),
    });
  } catch (error) {
    return next(error);
  }
};

export const getSavedFeeds = async (req, res, next) => {
  try {
    const [saved] = await db.query(
      "select feeds.*, profilePic, title, username from feeds join users on feeds.userId = users.id where users.id = ?",
      [req.params.userId]
    );

    return res.status(200).json({
      message: "saved feeds",
      saved: saved.filter((s) => s.saved === 1),
    });
  } catch (error) {
    return next(error);
  }
};
