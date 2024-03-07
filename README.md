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



## Configuration

- Create a `.env` file in the root directory of the project with the content mentioned in the **.env.example** file:
- Fill the environment variables values 

FOR EXAMPLE:

```.env
PORT=4000
MONGO_URI=<MONGODB_URI> (for example: `mongodb://127.0.0.1:27017/atg/api` (local setup))
```


## Usage 
Signup is done with username (unique), email id and password  
Login is done with username (unique)


## API Routes

### Auth

- **POST /api/auth/signup**
  - Description: To Signup the user.

- **POST /api/auth/login**
  - Description: To login the user.


## Backend 
Router are created for authentication.  
Controllers are created for handling routes of these routers.  
Bcrypt is used to encrypt the passwords before saving to the database.


## Database
Mongodb is used as a primary database for this project along with Mongoose as an ORM.  
Local Mongodb is used currently for the database services.