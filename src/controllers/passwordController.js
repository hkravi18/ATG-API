const User = require('../models/userModel.js');
const { generateToken } = require('../utils/handleJWT.js');

// @desc     Forget Password 
// route     POST /api/password/forget
// @access   Public
const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        ok: true,
        message: "If the email is registered, a password reset link will be sent.",
        data: {}
      });
    }

    const token = generateToken({
      email: user.email,
      purpose: "forgetPassword"
    }, '5m');

    const tokenExpiry = new Date();

    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    // TODO: Send token to the user's email 

    return res.status(200).json({
      ok: true,
      message: "If the email is registered, a password reset link will be sent.",
      data: {}
    });
  } catch (err) {
    console.error(`ERROR (forget-password): ${err.message}`);
    return res.status(500).json({
      ok: false,
      error: "Forget Password failed, Please try again later.",
      data: {}
    });
  }

};

// @desc     Reset Password 
// route     POST /api/password/reset
// @access   Private
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(200).json({
        ok: true,
        message: "Password reset token is invalid or has expired.",
        data: {}
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    //clearning the reset fields from user in the database 
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Password has been changed successfully.",
      data: {}
    });
  } catch (err) {
    console.error(`ERROR (reset-password): ${err.message}`);
    return res.status(500).json({
      ok: false,
      error: "Forget Password failed, Please try again later.",
      data: {}
    });
  }


};


module.exports = {
  forgetPassword, resetPassword
};