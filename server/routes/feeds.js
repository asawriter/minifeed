import { Router } from "express";
import {createFeed, getAllFeeds, getOneFeed, removeFeed, getSavedFeed, addSavedFeed, removeSavedFeed, getSavedFeeds} from "../controllers/index.js"
const router = Router();

router.post('/', createFeed)
router.get('/', getAllFeeds)
router.put("/saved/:feedId", addSavedFeed)
router.get("/saved", getSavedFeed)
router.get("/saved/all/:userId", getSavedFeeds)
router.delete("/saved/:feedId", removeSavedFeed)
router.get('/:feedId', getOneFeed)
router.delete("/:feedId", removeFeed)

export default router;