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
- [API Response](#api-response)
- [Backend](#backend)
- [Database](#database)


## Features

- User registration and authentication 
- Forget Password functionality for resetting password
- Uses JWT for authentication and password resetting
- Email is send to given email address on forget password

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

### Auth

- **POST /api/auth/signup**
  - Content-Type: _application/json_
  - Description: To Signup the user.

- **POST /api/auth/login**
  - Content-Type: _application/json_
  - Description: To login the user.

  

### Password

- **POST /api/password/forget**
  - Content-Type: _application/json_
  - Description: To generate token for password resetting and sending the mail.

- **POST /api/password/reset**
  - Content-Type: _application/json_
  - Description: To reset the password after verifying the token.

## API Response

### Signup/Login
On successful signup/login, the server will respond with a 200 status code and a JSON object containing the user's information.
  ```javascript 
  {
    ok: true,
    message: "success_message",
    data: {
        user: {
            username: "username",
            email: "email",
            toke: "token"
        }
    }
  }
  ```
  
  If the login is unsuccessful, the server will respond with a 400 Bad Request status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "error_message",
    data: {}
  }
  ```

  ### Forget Password
  On succesfully sending a password reset token to the user's email address, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "If the email is registered, a password reset link will be sent.",
    data: {}
  }
  ```
  
  If the forget request is unsuccessful from server end, the server will respond with a 500 status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "error_message",
    data: {}
  }
  ```

  ### Reset Password
  On succesfully resetting the password, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Password has been changed successfully.",
    data: {}
  }
  ```
  
  If the password resetting is unsuccessful, the server will respond with a 403 forbidden status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Password reset token is invalid or has expired.",
    data: {}
  }
  ```

## Backend 
- Router are created for authentication.  
- Controllers are created for handling routes of these routers.  
- Bcrypt is used to encrypt the passwords before saving to the database.  
- JWT is used to authenticate the user  
- Nodemailer is used to send a resetting password email (currently restricted to google email accounts only).


## Database
Mongodb is used as a primary database for this project along with Mongoose as an ORM.  
Local Mongodb is used currently for the database services.