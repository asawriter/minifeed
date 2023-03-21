const {
    REDIS_HOST = 'localhost',
    REDIS_PORT = 6379
} = process.env;

export const REDIS_OPTIONS = {
    host : REDIS_HOST,
    port : REDIS_PORT,
}