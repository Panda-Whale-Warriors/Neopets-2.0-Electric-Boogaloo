const User = require('../model/userModel');

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
      console.log('Error in getting all users', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
};

//  createUser - create and save a new User into the database.
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  User.create({ username, password })
    .then((user) => {
      res.locals.createUser = user;
      next();
    })
    .catch((error) => {
      console.log('Error in creating a user', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
};

// verifyUser - Obtain username and password from the request body, locate
//  * the appropriate user in the database, and then authenticate the submitted password
//  * against the password stored in the database.
userController.verifyUser = (req, res, next) => {
  console.log('req.body', req.body);
  console.log('req.params', req.params);
  console.log('req.query', req.query);
  console.log('req', req);
  User.findOne({ username: req.body.username }).then((user) => {
    // check if user is present or if the user's password is the same as
    // req.body's password, then
    // else, redirect to sign up page
    if (!user || user.password !== req.body.password) {
      console.log('this is body', req.body);
      res.redirect('/signup');
    } else {
      res.locals._id = user._id;
      res.locals.username = user.username;
      res.locals.password = user.password;
      console.log('made it to line 66 of verify user!');
      next();
    }
  });
};
module.exports = userController;
