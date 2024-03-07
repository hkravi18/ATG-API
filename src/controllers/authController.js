const bcrypt = require('bcrypt');

//models 
const User = require('../models/userModel.js');

//utils
const handleValidation = require('../utils/handleValidation.js');

// @desc     User Signup 
// route     POST /api/auth/signup
// @access   Public
const signup = async(req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        if (!handleValidation(username, email, password, "signup")) {
            return res.status(400).json({
                ok: false,
                error: "Invalid input fields value, Please enter a valid values",
                data: {}
            }); 
        }
       
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        
        if (user) {
            return res.status(201).json({
                ok: true,
                message: "User registered successfully.",
                data: {
                    user: {
                        username: user.username,
                        email: user.email
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
        })
    }
};

const login = async(req, res, next) => {
      
};


modules.exports = {
    signup, login
};