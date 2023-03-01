const {Router} = require('express');
const router = Router();

const googleRoute = require("./google")
const localRoute = require("./local")

router.use("/google", googleRoute);
router.use("/", localRoute);

module.exports = router;