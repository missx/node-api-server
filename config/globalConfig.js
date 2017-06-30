//file to store global configuration

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "secret12345", //add variable to store the JWT secret
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "7d" //add variable to store the expiration time for the jwt
}
 