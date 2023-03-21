import db from "./connectDb.js";
import path, {dirname} from "path";
import fs from "fs";
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const seed = async () => {
  const tablesSQL = fs
    .readFileSync(path.join(__dirname, 'tables.sql'))
    .toString();

    console.log(tablesSQL)

  try {
    await db.query(tablesSQL);
    console.log("[mysql] tables were created successfully.");
  } catch (error) {
    console.log(error);
  }
};
