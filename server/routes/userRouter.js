const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.get('/', userController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.getAllUsers);
});
// post req to  sign up, once signed up, redirect to log-in
router.post('/signup', userController.createUser, (req, res) => {
  res.redirect('/create');
});

// post req to log in, redirect to create-pet page
router.post('/', userController.verifyUser, (req, res) => {
  res.redirect('/create');
});

module.exports = router;
