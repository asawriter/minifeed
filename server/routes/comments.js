import { Router } from "express";
import {createComment, getCommentOfFeed} from "../controllers/index.js"
const router = Router()

router.post('/', createComment)
router.get('/:feedId', getCommentOfFeed)

export default router;