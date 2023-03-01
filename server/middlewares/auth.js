const { isLogout } = require("../auth");

const authorized = (req, res, next) => {
  if (!req.session?.user)
    return res.status(401).json({ message: "You must be logged in" });

  return next();
};

const guest = (req, res, next) => {
  if (req.session?.user)
    return res.status(401).json({ message: "You already logged in" });

  return next();
};

const statusActice = async (req, res, next) => {
  if (req.session?.user) {
    const now = new Date(Date.now());
    const { createdAt } = req.session.user;

    if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
      await isLogout(req, res);

      return next(new Error("401 You must be logged in"));
    }
  }

  return next();
};

module.exports = {authorized, guest, statusActice}
