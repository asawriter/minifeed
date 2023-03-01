const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect");
const User = require("./userModel");

const Feed = sequelize.define("feeds", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync({ alter: true });

User.hasOne(Feed, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Feed.belongsTo(User);

module.exports = Feed;
