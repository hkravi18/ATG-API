const bcrypt = require('bcrypt');

//models 
const User = require('../models/userModel.js');

//utils
const handleValidation = require('../utils/handleValidation.js');
const { generateToken } = require('../utils/handleJWT.js');

// @desc     User Signup 
// route     POST /api/auth/signup
// @access   Public
const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const validationRes = handleValidation(username, email, password, "signup");
        if (!validationRes.valid) {
            return res.status(400).json({
                ok: false,
                error: validationRes.error,
                data: {}
            });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(500).json({
                ok: false,
                error: "User already exists. Please Login",
                data: {}
            })
        }

        //hashing the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = generateToken({
            email: user.email
        }, '2h');

        if (user) {
            return res.status(201).json({
                ok: true,
                message: "User registered successfully.",
                data: {
                    user: {
                        username: user.username,
                        email: user.email,
                        token: token
                    }
                }
            });
        } else {
            return res.status(500).json({
                ok: false,
                error: "User Registration failed, Please try again.",
                data: {}
            })
        }
    } catch (err) {
        console.error(`ERROR (signup): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "User Registration failed, Please try again later.",
            data: {}
        });
    }
};

// @desc     User Login 
// route     POST /api/auth/login
// @access   Public
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const validationRes = handleValidation(username, "", password, "login");
        if (!validationRes.valid) {
            return res.status(400).json({
                ok: false,
                error: validationRes.error,
                data: {}
            });
        }

        const user = await User.findOne({
            username
        });

        if (!user) {
            return res.status(404).json({
                ok: false,
                error: "Incorrect email or password",
                data: {}
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({
                ok: false,
                error: "Incorrect email or password",
                data: {}
            });
        };

        const token = generateToken({
            email: user.email
        }, '2h');

        return res.status(200).json({
            ok: true,
            message: "User logged in successfully.",
            data: {
                user: {
                    username: user.username,
                    email: user.email,
                    token: token
                }
            }
        });
    } catch (err) {
        console.error(`ERROR (login): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "User Logged In failed. Please try again.",
            data: {}
        });
    }
};

module.exports = {
    signup, login
};