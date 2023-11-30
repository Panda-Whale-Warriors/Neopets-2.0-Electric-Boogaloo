const express = require("express");
const Session = require("../model/sessionModel");
const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = async (req, res, next) => {
  // write code here
  // console.log('are we here');
  // console.log('req.cookies: ', req.cookies);
  try {
    // console.log("are we there");
    const cookieId = req.cookies.ssid || null;
    // console.log("our cookie id: ", cookieId);
    const session = await Session.findOne({ cookieId: cookieId });
    // console.log("this is seesion maybe: ", session);
    if (session) {
      console.log("are we here: ");
      // will need to res.redirect to whatever 'home' page is for the user
      res.redirect("/secret"); // leftover from auth unit, we won't actually be redirecting to secret.
    }

    console.log("are we not here");
    next();
  } catch (err) {
    next("Error in sessionController.isLoggedIn: " + JSON.stringify(err));
  }
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = async (req, res, next) => {
  //write code here
  try {
    if (res.locals.message === "username not found") {
      return next();
    } else {
      console.log("locating cookie....");
      // its only on request initially
      // const ssid = req.cookies.ssid;
      const ssid = res.locals.ssid;
      console.log("ssid", ssid);
      await Session.create({ cookieId: ssid });
      console.log("session created");
      return next();
    }
  } catch (err) {
    return next(
      "Error in sessionController.startSession: " + JSON.stringify(err)
    );
  }
};

sessionController.logOut = async (req, res, next) => {
  try {
    console.log("attempting to logout...");
    const ssid = req.cookies.ssid;
    // console.log("ssid", ssid);
    await Session.findOneAndDelete({ cookieId: ssid });
    console.log("session cleared from database");
    // some way to delete ssid cookie from browser session?
    res.clearCookie("ssid");
    console.log("ssid cookie cleared from browser");
    // console.log("req.cookies", req.cookies);
    // res.redirect("/login");
    return next();
  } catch (err) {
    return next({
      log: "Express error handler caught error in sessionController.logOut middleware",
      status: 300,
      message: { err: "Encountered error in logout process" },
    });
  }
};
// const sessionSchema = new Schema({
//   cookieId: { type: String, required: true, unique: true },
//   createdAt: { type: Date, expires: 30, default: Date.now }
// });
module.exports = sessionController;
