const bcrypt = require("bcrypt");

//models
const User = require("../models/userModel.js");

//utils
const handleValidation = require("../utils/handleValidation.js");
const { generateToken } = require("../utils/handleJWT.js");
const customToken = require("../utils/customToken.js");

// @desc     User Signup
// route     POST /api/auth/signup
// @access   Public
const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const validationRes = handleValidation(username, email, password, "signup");
    if (!validationRes.valid) {
      const error = new CustomError(validationRes.error, 409, "signup");
      next(error);
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      const error = new CustomError(
        "User already exists. Please Login",
        500,
        "signup"
      );
      next(error);
    }

    //hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(
      {
        email: user.email,
      },
      "2h"
    );

    if (user) {
      return res.status(201).json({
        ok: true,
        message: "User registered successfully.",
        data: {
          user: {
            username: user.username,
            email: user.email,
            token: token,
          },
        },
      });
    } else {
      const error = new CustomError(
        "User Registration failed, Please try again.",
        500,
        "signup"
      );
      next(error);
    }
  } catch (err) {
    console.error(`ERROR (signup): ${err.message}`);
    const error = new CustomError(
      "User Registration failed, Please try again.",
      500,
      "signup"
    );
    next(error);
  }
};

// @desc     User Login
// route     POST /api/auth/login
// @access   Public
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const validationRes = handleValidation(username, "", password, "login");
    if (!validationRes.valid) {
      const error = new CustomError(validationRes.error, 400, "login");
      next(error);
    }

    const user = await User.findOne({
      username,
    });

    if (!user) {
      const error = new CustomError(
        "Incorrect email or password",
        401,
        "login"
      );
      next(error);
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      const error = new CustomError(
        "Incorrect email or password",
        401,
        "login"
      );
      next(error);
    }

    const token = generateToken(
      {
        email: user.email,
      },
      "2h"
    );

    return res.status(200).json({
      ok: true,
      message: "User logged in successfully.",
      data: {
        user: {
          username: user.username,
          email: user.email,
          token: token,
        },
      },
    });
  } catch (err) {
    console.error(`ERROR (login): ${err.message}`);

    const error = new CustomError(
      "User Logged In failed. Please try again.",
      500,
      "login"
    );
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
