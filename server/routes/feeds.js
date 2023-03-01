const { Router } = require("express");
const router = Router();

const { createFeed } = require("../services/feedService");
const { getUser } = require("../services/userService");

router.post("/", async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "Invalid inputs" });

    const user = await getUser();
    
    const newFeed = await createFeed(text, user.id);
    
    return res.status(200).json({ message: "Create feed successfully", feed: newFeed });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
