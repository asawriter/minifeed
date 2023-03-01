const { Sequelize } = require("sequelize");
const PG_OPTIONS = require("../configs/pg");

const sequelize = new Sequelize(PG_OPTIONS);

const connectDB = () => {
  sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch(() => console.error("Unable to connect to the database:", error));
};

module.exports = { sequelize, connectDB };
