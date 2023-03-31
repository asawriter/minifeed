import { Router } from "express";
import {
  createFeed,
  getAllFeeds,
  removeFeed,
  bookmarkFeed,
  unbookmarkFeed,
  getFeedByUserId,
  getFeedById,
  getSearchResults,
  createLike,
  deleteLike,
  getLikesByFeedId,
  getFeedsBookmarkByUserId,
  getOneFeedBookmark,
} from "../controllers/index.js";
const router = Router();

router.get("/", getAllFeeds);

router.get("/user/:userId", getFeedByUserId);

router.get("/:titleURL/:feedId", getFeedById);

router.get("/search", getSearchResults);

router.post("/", createFeed);

router.delete("/:titleURL/:feedId", removeFeed);

router.get("/like", getLikesByFeedId);

router.post("/:feedId/like", createLike);

router.post("/:feedId/unlike", deleteLike);

router.post("/:feedId/bookmark", bookmarkFeed);

router.post("/:feedId/unbookmark", unbookmarkFeed);

router.get("/:userId/bookmark/all", getFeedsBookmarkByUserId)

router.get("/bookmark", getOneFeedBookmark)
export default router;
