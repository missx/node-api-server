# Node.js Server Boilerplate

Node.js server boilerplate that uses JSON Web Tokens for authentication. It contains a small implementation of a REST API that can be accessed from a client. It also has a mysql dependency to work with a database. 

## Table of Contents 

* Before Using
* Database Setup
* Installation
* Project Structure
* Dependencies
* JWT Usage Example

## Before Using

* Download MySQL Community Server
* Download MySQL Workbench
* Add the following environment variables: 
    * `JWT_SECRET` This is the secret key to sign the JWT. Otherwise it is 'secret12345'
    * `JWT_EXPIRATION_TIME` This is the expiration time for the JWT. Otherwise it is 1 hour
    * `PORT` Port on which the server will run. Otherwise it runs on port 3000.
    * `DATABASE` Database name. Otherwise it uses 'rsvpday'
    * `DATABASE_HOST` Database host. Otherwise it uses 'localhost'
    * `DATABASE_USER` Database user. Otherwise it uses 'root'
    * `DATABASE_PASSWORD` Database password. Otherwise it uses ''

## Database Setup

* Go to MySQL Workbench
* Click on the MySQL Connection related to this app
* Create a new schema -- Schema Name: `rsvpday`
* Click Apply and then Apply again
* Go back to the project's directory
* Go to sql folder and copy the sql script
* Go back to MySQL Workbench
* Paste the script in the editor, select `rsvpday` schema and then execute the script

## Installation

* Clone or download this repo. 
* On the root folder run `npm install` to install all dependencies.
* Run `sudo node server.js` (Mac/Linux) or `node server.js` (Windows) to run the server on the selected port or port 3000 by default.

## Project Structure


```

config/                         * Folder to store all the configuration files
|--globalConfig.js              * Global configurations
controllers/                    * Folder to store the controllers
|--db.controller.js             * Database controller
middlewares/                    * Folder to store middlewares
|--verifyToken.js               * Middleware to be used when we want to verify the JWT
models/                         * Folder to store models
|--objects/                     * Objects we are going to use in our project
|   |--dogs.js                  * Object to be used as an example for the JWT implementation
|   |--users.js                 * Object to be used as an example for the JWT implementation     
|--private/                     * Folder to store private methods
|   |--index.js            
|--public/                      * Folder to store private methods
|   |--index.js
routes/                         * Folder to store routes
|   |--auth.js                  * Authentication route, as an example
|   |--dogs.js                  * Dogs route, as an example
|   |--index.js                 * File that exports all of the routes together
|   |--main.js                  * Main routes, as an example
.gitignore
package.json
README.md
server.js

```

## Dependencies

* Express
* Body Parser
* Express JWT - Handles the JSON Web Token creation
* MySQL

## JWT Usage Example

This project comes with a small JWT implementation. In the file `routes/auth.js` there is a route called `authorize` that checks the user and the password sent and if it is valid, it signs a JSON Web Token, which is sent to the requester. 

The `main` route can be accessed without any kind of token, it's public. But if you want to access the route `dogs` you need to send the token given to you after authorizing, otherwise you won't have access to it. 


