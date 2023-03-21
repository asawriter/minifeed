const {
    ORIGIN_URL = 'http://localhost:3000',
    CREDENTIALS = true
} = process.env;

export const CORS_OPTIONS = {
    origin : ORIGIN_URL,
    credentials : CREDENTIALS
}