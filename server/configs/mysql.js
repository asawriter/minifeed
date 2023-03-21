const {
    DB_NAME = 'minifeed',
    DB_USER = 'root',
    DB_PASSWORD = 'oconhoob952003@',
    DB_HOST = 'localhost',
} = process.env;

export const DB_OPTIONS = {
    database : DB_NAME,
    user : DB_USER,
    password : DB_PASSWORD,
    host : DB_HOST,
    multipleStatements: true
}