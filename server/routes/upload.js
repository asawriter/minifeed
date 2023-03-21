import {Router} from "express"
const router = Router()
import multer from "multer"

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, '../client/public/images/')
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

router.post("/", upload.single('file'), (req, res) => {
    const file = req.file;

    return res.status(200).json(file.filename)
})

export default router;