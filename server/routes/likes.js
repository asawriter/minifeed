import {Router} from "express"
const router = Router()
import {createLike, deleteLike, getAllLikes} from "../controllers/index.js"

router.get("/:feedId", getAllLikes)
router.post('/', createLike)
router.post('/:feedId', deleteLike)

export default router;