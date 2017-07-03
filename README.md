# Node.js Server Boilerplate

Node.js server boilerplate that uses JSON Web Tokens for authentication. It contains a small implementation of a REST API that can be accessed from a client. It also has a mysql dependency to work with a database. 

## Table of Contents 

* Before Using
* Installation
* Dependencies

## Before Using

* Download MySQL Community Server
* Download MySQL Workbench
* Add the following environment variables: 
    * `JWT_SECRET` This is the secret key to sign the JWT.
    * `JWT_EXPIRATION_TIME` This is the expiration time for the JWT.
    * `PORT` Port on which the server will run. Otherwise it runs on port 3000.

## Installation

* Clone or download this repo. 
* On the root folder run `npm install` to install all dependencies.
* Run `sudo node server.js` (Mac/Linux) or `node server.js` (Windows) to run the server on the selected port or port 3000 by default.

## Dependencies

* Express
* Body Parser
* Express JWT - Handles the JSON Web Token creation
* MySQL


