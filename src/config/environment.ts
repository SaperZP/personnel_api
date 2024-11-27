import dotenv from "dotenv";
dotenv.config();

export const { PORT, HOST, DBURI, SECRET_KEY, MODE, PAGE_SIZE } = process.env
