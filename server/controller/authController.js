const Session = require("../model/sessionModel");
const User = require("../model/userModel");

const authController = {};

authController.loginCookie = async (req, res, next) => {
  console.log("giving user login cookies");
  //console.log(res._header);

  try {
    const { username } = req.body;
    // const newUser = req.body;
    const currentUser = await User.findOne({ username: username });
    console.log("user found in login cookies");
    const curUserId = currentUser._id;
    if (currentUser) {
      res.cookie("ssid", `${curUserId}`, { httpOnly: true });
      console.log("res.cookie was run");
      res.locals.ssid = curUserId;
      return next();
    }
  } catch (err) {
    next("Error in authController.loginCookie" + JSON.stringify(err));
  }
};

module.exports = authController;

/* res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    // expires: new Date(Date.now() + 5000),
    secure: false,
    // secure: process.env.NODE_ENV === 'production',
  }*/
