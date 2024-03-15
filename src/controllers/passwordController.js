const bcrypt = require("bcrypt");

//models
const User = require("../models/userModel.js");

//utils
const { generateToken } = require("../utils/handleJWT.js");
const sendMail = require("../utils/sendMail.js");

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
        message:
          "If the email is registered, a password reset link will be sent.",
        data: {},
      });
    }

    const token = generateToken(
      {
        email: user.email,
        purpose: "forgetPassword",
      },
      "5m"
    );

    const tokenExpiry = new Date();

    //setting up user variables for token expiration and authentication
    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    const mailInfo = sendMail({
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: "(Basic-API) Password reset Link",
      text: "",
      html: `TOKEN FOR PASSWORD RESETTING : <strong>${token}<strong>`,
    });

    if (mailInfo) {
      console.log("Mail send to the user email.");
      return res.status(200).json({
        ok: true,
        message:
          "If the email is registered, a password reset link will be sent.",
        data: {},
      });
    } else {
      console.error(`ERROR (forget-password): ${err.message}`);
      return res.status(500).json({
        ok: false,
        error: "Forget Password failed, Please try again later.",
        data: {},
      });
    }
  } catch (err) {
    console.error(`ERROR (forget-password): ${err.message}`);
    return res.status(500).json({
      ok: false,
      error: "Forget Password failed, Please try again later.",
      data: {},
    });
  }
};

// @desc     Reset Password
// route     POST /api/password/reset
// @access   Private
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    //finding any document which has matching token and has expiry greater than current time
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    //token expired or token is tampered
    if (!user) {
      return res.status(403).json({
        ok: true,
        message: "Password reset token is invalid or has expired.",
        data: {},
      });
    }

    //hasing the new password
    user.password = await bcrypt.hash(newPassword, 10);

    //clearning the reset fields from user in the database
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Password has been changed successfully.",
      data: {},
    });
  } catch (err) {
    console.error(`ERROR (reset-password): ${err.message}`);
    return res.status(500).json({
      ok: false,
      error: "Forget Password failed, Please try again later.",
      data: {},
    });
  }
};

module.exports = {
  forgetPassword,
  resetPassword,
};
