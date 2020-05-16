import dotenv from 'dotenv';

const res = dotenv.config();
if (res.error) {
    console.error('Missing .env file.\nExiting...');
    process.exit(1);
}

export default {
    port: process.env.PORT || 8080,
    databaseURL: process.env.DATABASE_URL || 'mongodb://localhost/test',
    saltRounds: process.env.SALT_ROUNDS || 10,
    secret: process.env.SECRET || 'kaiserschmarrn'
};