const { getUserByEmail } = require("../services/UserService");
const { SESSION_NAME } = require("../configs/session");

const isLogin = async (req, email) => {
  const user = await getUserByEmail(email);

  if (!req.session?.user) {
    req.session.user = {
      userId: user.id,
      createAt: new Date(Date.now()),
    };
  }
};

const isLogout = async (req, res) =>
  new Promise((resolve, reject) => {
    req.session?.destroy((err) => {
      if (err) reject(err);

      res.clearCookie(SESSION_NAME);

      resolve();
    });
  });

module.exports = { isLogin, isLogout };
