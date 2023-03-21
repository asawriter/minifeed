import {Router} from "express"
const router = Router()
import {getUser, updateUser} from "../controllers/index.js"

router.get("/find/:userId", getUser)
router.put("/:userId", updateUser)

export default router