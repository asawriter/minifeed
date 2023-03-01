const express = require("express");
const createError = require("http-errors");
const session = require("express-session");
const { connectDB } = require("./db/connect");
const routes = require("./routes");
const auth = require("./auth/oauth");
const {SESSION_OPTIONS} = require("./configs/session");
const { statusActice } = require("./middlewares/auth");

connectDB();

const app = express();
const port = 3001;

app.use(express.json());
app.use(session(SESSION_OPTIONS))

app.use("/", routes());

app.use(auth.initialize)
app.use(auth.session)

app.use((req, res, next) => {
  return next(createError(404, "Page not found"));
});

app.use(statusActice)

app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({ message: err.message });
});

app.listen(port, () => console.log("Server listening on port " + port));
