import { Router } from "express";
import {createComment, getCommentsByFeedId} from "../controllers/index.js"
const router = Router()

router.post('/', createComment)
router.get('/:feedId', getCommentsByFeedId)

export default router;