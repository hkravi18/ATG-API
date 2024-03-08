const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// TODO: Change this to the whitelisted origins (before deploying)

app.use(cors({
    origin: "*"
}));

module.exports = app;