import { Router } from "express";
const router = Router();
import {
  getUserById,
  updateUser,
  getBookmarks,
  followUser,
  unFollowUser,
} from "../controllers/index.js";

router.get("/:userId", getUserById);

router.patch("/:userId", updateUser);

router.get("/:userId/bookmarks", getBookmarks);

router.put("/follow", followUser);

router.put("/unfollow", unFollowUser);

export default router;
