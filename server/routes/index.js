import {Router} from "express"
const router = Router();

import authRoute from "./auth.js"
import feedRoute from "./feeds.js"
import commentRoute from "./comments.js"
import userRoute from "./users.js"
import likeRoute from "./likes.js"
import uploadRoute from "./upload.js"

export const routes = () => {
    router.use("/auth", authRoute)
    router.use("/feeds", feedRoute)
    router.use("/comments", commentRoute)
    router.use("/users", userRoute)
    router.use("/likes", likeRoute)
    router.use("/uploads", uploadRoute)

    return router;
}