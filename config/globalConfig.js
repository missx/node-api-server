//file to store global configuration

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "secret12345", //JWT secret key
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "7d", //expiration time for the jwt
    PORT: process.env.PORT || 3000 //port on which the server will run
}
 