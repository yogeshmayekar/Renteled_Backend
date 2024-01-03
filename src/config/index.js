import dotenv from 'dotenv';
dotenv.config();

export const {
    DB_URL,
    PORT,
    JWT_SECRET
} = process.env;
