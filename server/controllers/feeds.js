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
      "Select feeds.id as feedId, name, avatar, title, content, image, feeds.created_at as createdFeed, author from users join feeds on users.id = feeds.author where users.id = ? order by feeds.created_at Desc",
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
      "Select feeds.id as feedId, name, bio, avatar, title, content, image, feeds.created_at as createdFeed, users.created_at as createdUser, author from users join feeds on users.id = feeds.author where feeds.id = ? order by feeds.created_at Desc",
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

// GET LIKES OF ONE FEED
export const getLikesByFeedId = async (req, res, next) => {
  try {
    const [likes] = await db.query(
      "select userLiked from likes where feedLiked = ?",
      [req.query.feedId]
    );

    return res.status(200).json({
      message: "Get all likes of feed",
      likes: likes.map((like) => like.userLiked),
    });
  } catch (error) {
    return next(error);
  }
};

// LIKE FEED
export const createLike = async (req, res, next) => {
  try {
    const { userLiked } = req.body;

    const values = [generateID(), userLiked, req.params.feedId];

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

    await db.query(
      "Delete from likes where `userliked` = ? and `feedLiked` = ?",
      [userLiked, req.params.feedId]
    );

    return res.status(200).json({ message: "Feed has been unliked" });
  } catch (error) {
    return next(error);
  }
};

// BOOKMARK FEED
export const bookmarkFeed = async (req, res, next) => {
  try {
    const { userBookmarked, feedBookmarked } = req.body;

    const values = [generateID(), userBookmarked, feedBookmarked];

    await db.query(
      "Insert into bookmarks (`id`, `userBookmarked`, `feedBookmarked`) values (?)",
      [values]
    );

    return res.status(200).json({ message: "Feed has been bookmarked" });
  } catch (error) {
    return next(error);
  }
};

// UNBOOKMARK FEED
export const unbookmarkFeed = async (req, res, next) => {
  try {
    const { userBookmarked } = req.body;

    await db.query(
      "Delete from bookmarks where `userBookmarked` = ? and `feedBookmarked` = ?",
      [userBookmarked, req.params.feedId]
    );

    return res.status(200).json({ message: "Feed has been unbookmarked" });
  } catch (error) {
    return next(error);
  }
};

// GET ALLS FEED BOOKMARKED
export const getFeedsBookmarkByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const [feedsBookmark] = await db.query(
      "select author, avatar, name, content, title, image, feeds.id as feedId, feeds.created_at as feedCreated from bookmarks join feeds on bookmarks.feedBookmarked = feeds.id join users on feeds.author = users.id where userBookmarked = ?",
      [userId]
    );

    return res.status(200).json({
      message: "Get feeds bookmarked",
      feedsBookmark,
    });
  } catch (error) {
    return next(error);
  }
};

// GET ALLS FEED BOOKMARKED
export const getOneFeedBookmark = async (req, res, next) => {
  try {
    const { feedId } = req.query;

    const [feedsBookmark] = await db.query(
      "select userBookmarked from bookmarks where feedBookmarked = ?",
      [feedId]
    );

    return res.status(200).json({
      message: "Get feeds bookmarked",
      feedsBookmark: feedsBookmark.map((feed) => feed.userBookmarked),
    });
  } catch (error) {
    return next(error);
  }
};
