const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const sessionController = require("../controller/sessionController");
const router = express.Router();

router.get("/", userController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.getAllUsers);
});

// post req to  sign up, once signed up, redirect to log-in
router.post(
  "/signup",
  userController.createUser,
  authController.loginCookie,
  sessionController.startSession,
  (req, res) => {
    return res.json(res.locals.message);
  }
);

// post req to log in, redirect to create-pet page
router.post(
  "/",
  userController.verifyUser,
  authController.loginCookie,
  sessionController.startSession,
  (req, res) => {
    return res.json(res.locals.message);
  }
);

router.delete("/", sessionController.logOut, (req, res) => {
  return res.json(res.locals.loggedOut);
});
module.exports = router;
