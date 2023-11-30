const User = require("../model/userModel");

const userController = {};

// getAllUsers - retrieve all users from the database and stores it into res.locals
//  * before moving on to next middleware.
userController.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.locals.getAllUsers = users;
      console.log(res.locals.getAllUsers);
      return next();
    })
    .catch((error) => {
      console.log("Error in getting all users", error);
      return res.status(500).json({ error: "Internal Server Error" });
    });
};

//  createUser - create and save a new User into the database.
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log("username: ", username);
  console.log("password: ", password);
  User.create({ username, password })
    .then((user) => {
      res.locals.createUser = user.username;
      res.locals.message = "ok";
      return next();
    })
    .catch((error) => {
      console.log("Error in creating a user", error);
      return res.status(500).json({ error: "Internal Server Error" });
    });
};

// verifyUser - Obtain username and password from the request body, locate
//  * the appropriate user in the database, and then authenticate the submitted password
//  * against the password stored in the database.
userController.verifyUser = async (req, res, next) => {
  // deconstruct username and password from req.body
  const { username, password } = req.body;

  try {
    // attempt to find user in database by username
    const user = await User.findOne({ username: username });
    console.log("here is the user from DB", user);
    // if no users are found in database, redirect back to signup
    if (!user) {
      console.log("No user found by that name");
      // return res.redirect("/signup");
      res.locals.message = "username not found";
      return next();
    }
    console.log("about to run bcrypt password compare");
    // using bcrypt comparePassword method to check if passwords match
    const passwordMatch = await user.comparePassword(password);
    console.log("password compare completed....");
    // if passwords DO NOT match, redirect user to the login page to try again
    if (!passwordMatch) {
      console.log("User Verification failed");
      // return res.redirect("/login");
      res.locals.message = "password and username do not match";
      return next();
    }

    // if no other conditionals were hit, return next() to move on to next middleware.
    res.locals.message = "ok";
    return next();
  } catch (err) {
    next({
      log: "Express error handler caught error in userController middleware",
      status: 500,
      message: { err: "Unable to verify user data" },
    });
  }
};
module.exports = userController;

/*  // check if user is present or if the user's password is the same as
    // req.body's password, then
    // else, redirect to sign up page
    if (!user || user.password !== req.body.password) {
      console.log("this is body", req.body);
      res.locals.message = "not found";
    } else {
      // res.locals._id = user._id;
      // res.locals.username = user.username;
      // res.locals.password = user.password;
      res.locals.message = "ok";
    }
    return next();
  });
};
module.exports = userController;
*/
