import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    dbUri: string;
    jwt_secret: string;
}

const dbUri = process.env.DATABASE_URL;
if (!dbUri) {
    throw new Error("DATABASE_URL is not defined in .env");
}
const jwt_secret = process.env.JWT_SECRET

if (!jwt_secret) {
    throw new Error("JWT_SECRET is not defined im .env")
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbUri,
    jwt_secret
};

export default config;