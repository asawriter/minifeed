import {Router} from "express"
const router = Router()
import { register, login, logout} from "../controllers/index.js"

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router