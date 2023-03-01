const { Router } = require("express");
const router = Router();

const userRoute = require("./users");
const feedRoute = require("./feeds");
const authRoute = require("./auth");

module.exports = () => {
  router.use("/users", userRoute);
  router.use("/feeds", feedRoute);
  router.use("/auth", authRoute);
  return router;
};
