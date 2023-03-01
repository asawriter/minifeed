const { Router } = require("express");
const { getAllUsers } = require("../services/UserService");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
