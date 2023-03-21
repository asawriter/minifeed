import mysql from "mysql2";
import { DB_OPTIONS } from "../configs/index.js";
import { seed } from "./seed.js";

const pool = mysql.createPool(DB_OPTIONS);

pool.getConnection((err, connection) => {
  if (err) throw new Error(err)

  console.log("Connected to database !!!", connection.threadId);

  seed();
});

const db = pool.promise();

export default db;
