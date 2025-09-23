import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    dbUri: string;
}

const dbUri = process.env.DATABASE_URL;
if (!dbUri) {
    throw new Error("DATABASE_URL is not defined in .env");
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbUri
};

export default config;