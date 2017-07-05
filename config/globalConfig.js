//file to store global configuration

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development', //development, staging, or production
    JWT_SECRET: process.env.JWT_SECRET || "secret12345", //JWT secret key
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "1h", //expiration time for the jwt
    PORT: process.env.PORT || 3000, //port on which the server will run
    DATABASE: process.env.DB_NAME || 'rsvpday', //database name
    DATABASE_HOST: process.env.DB_HOST || 'localhost', //database host
    DATABASE_USER: process.env.DB_USER || 'root', //database user
    DATABASE_PASSWORD: process.env.DB_PASS || '' //database password
}
 