import { Router } from "express";
import {
  createFeed,
  getAllFeeds,
  removeFeed,
  getSavedFeed,
  addSavedFeed,
  removeSavedFeed,
  getSavedFeeds,
  getFeedByUserId,
  getFeedById,
  getSearchResults,
  createLike,
  deleteLike,
} from "../controllers/index.js";
const router = Router();

router.get("/", getAllFeeds);

router.get("/user/:userId", getFeedByUserId);

router.get("/:titleURL/:feedId", getFeedById);

router.get("/search?", getSearchResults);

router.post("/", createFeed);

router.delete("/:titleURL/:feedId", removeFeed);

router.put("/:feedId/like", createLike);

router.delete("/:feedId/unlike", deleteLike);




router.put("/saved/:feedId", addSavedFeed);

router.delete("/saved/:feedId", removeSavedFeed);

router.get("/saved", getSavedFeed);

router.get("/saved/all/:userId", getSavedFeeds);

export default router;
