import dotenv from 'dotenv'

const dotenvFound = dotenv.config()
if (!dotenvFound)
    console.error('No .env file')

export default {
    port: process.env.PORT || 8080
};