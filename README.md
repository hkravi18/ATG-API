# Basic API for user authentication 

## Project Description

This is a simple project based on MERN tech stack for basic user authentication (signup and login) along with forget password functionality.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Backend](#backend)
- [Database](#database)


## Features

- User registration and authentication 
- Forget Password functionality for resetting password
- Uses JWT for authentication and password resetting
- Email is send to given email address on forget password
- Users can create Posts and Comments 
- Users can like Posts of other users

## Technologies Used

- Express.js
- MongoDB
- Node.js

## Prerequisites

- Node.js [Installation Guide](https://nodejs.org/)
- MongoDB [Installation Guide](https://docs.mongodb.com/manual/installation/)

## Installation

1. Clone the repository:

git clone <REPO_URL> api_project

2. Navigate to the project directory:

cd api_project

3. Install dependencies for the server:

npm install 

4. Set up environment variables (a .env file is needed for this expressJS server, instructions provided in `Configuration`).

5. Start the server:

In root directory:
- To start the server using Nodemon **npm run dev**
- To start the server without Nodemon **npm start** 

> NOTE: Start the mongodb daemon if you are using local mongodb database. If you're using remote service, then replace the MONGO_URI in .env with the database connection string of the remote service you are using.


## Configuration

- Create a `.env` file in the root directory of the project with the content mentioned in the **.env.example** file:
- Fill the environment variables values 

FOR EXAMPLE:

```.env
PORT=4000
MONGO_URI=<MONGODB_URI>  
SECRET_KEY=any_secret_key

# Email environment variables   
USER_EMAIL=  
USER_PASSWORD=  
```
**If you are using local mongodb MONGO_URI=`mongodb://localhost:27017`**

**Start Mongodb Daemon To use local mongodb database**

**USER_EMAIL** is the email address which will send the email to those users who wants to reset password  

**USER_PASSWORD** is the app password for the associated email address

>IMP NOTE: The **USER_EMAIL** should be allowed to send email (App passwords should be allowed in the coresspoding google account setting, as Google has changed some setting regarding the App password)

## Usage 
Signup is done with username (unique), email id and password  
Login is done with username (unique)


## API Routes

### All API related docs are available in API_DOCS.md file


## Backend 
- Router are created for authentication.  
- Controllers are created for handling routes of these routers.  
- Bcrypt is used to encrypt the passwords before saving to the database.  
- JWT is used to authenticate the user  
- Nodemailer is used to send a resetting password email (currently restricted to google email accounts only).


## Database
Mongodb is used as a primary database for this project along with Mongoose as an ORM.  
Local Mongodb is used currently for the database services.