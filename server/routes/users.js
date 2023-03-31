import { Router } from "express";
const router = Router();
import {
  getUserById,
  updateUser, 
  followUser,
  unFollowUser,
  getFollowedUser,
} from "../controllers/index.js";

router.get("/:userId", getUserById);

router.patch("/:userId", updateUser);

// router.get("/:userId/bookmarks", getBookmarks);

router.get("/:userId/follows", getFollowedUser)

router.post("/follow", followUser);

router.post("/unfollow", unFollowUser);

export default router;
