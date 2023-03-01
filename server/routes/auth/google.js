const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/callback", passport.authenticate('google'), (req, res, next) => {
    return res.json({user : req.user})
})

module.exports = router;
