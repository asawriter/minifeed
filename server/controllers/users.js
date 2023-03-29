import db from "../db/connectDb.js";
import { v4 as generateID } from "uuid";

export const getUserById = async (req, res, next) => {
  try {
    const [user] = await db.query("Select * from users where id = ?", [
      req.params.userId,
    ]);

    return res.status(200).json({ message: "Info user.", user });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, avatar, bio } = req.body;

    // const [foundUser]
    const values = [name, email, avatar, bio, req.params.userId];

    await db.query(
      "UPDATE users SET `name`=?,`email`=?, `avatar`=?, `bio`=? WHERE id= ? ",
      values
    );

    const updatedUser = { id: req.params.userId, name, email, avatar, bio };

    return res.status(200).json({ message: "You has been updated profile.", updatedUser });
  } catch (error) {
    return next(error);
  }
};

export const getBookmarks = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const followUser = async (req, res, next) => {
  try {
    const { followed, follower } = req.body;

    const values = [generateID(), followed, follower];

    const [follow] = await db.query(
      "Insert into friends `id`, `followed`, `follower` values (?)",
      [values]
    );

    return res.status(200).json({ message: "You have been followed", follow });
  } catch (error) {
    return next(error);
  }
};

export const unFollowUser = async (req, res, next) => {
  try {
    const { followed, follower } = req.body;

    await db.query("Delete from friends where followed = ? and follower = ?", [
      followed,
      follower,
    ]);

    return res.status(200).json({ message: "You have been unfollowed" });
  } catch (error) {
    return next(error);
  }
};
