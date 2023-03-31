import { Router } from "express";
import {createComment, getCommentsByFeedId} from "../controllers/index.js"
const router = Router()

router.get('/:feedId', getCommentsByFeedId)
router.post('/', createComment)

export default router;