const Feed = require("../models/feedModel");

const createFeed = async (text, userId) => {
  const feed = await Feed.create({
    text,
    userId
  });

  return feed.save();
};

const getAllFeeds = async () => {
  const feeds = await Feed.findAll();

  return feeds;
};

module.exports = { createFeed, getAllFeeds };
