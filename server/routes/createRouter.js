const express = require('express');
const petController = require('../controller/petController');

const router = express.Router();

<<<<<<< HEAD
=======
//get all pets by current user
// find all pets owned by current logged in user
>>>>>>> dev
router.get('/pets', petController.getPets, (req, res) => {
  // console.log('made it to api', res.locals.getPets);
  return res.status(200).json(res.locals.getPets);
});

<<<<<<< HEAD
=======
//get a single pet by current user
// findOne, and return a pet from database
>>>>>>> dev
router.get('/pets/:id', petController.getOnePet, (req, res) => {
  return res.status(200).json(res.locals.getOnePet);
});

// POST req
// router.post('/', petController.postPet, (req, res) => {
<<<<<<< HEAD
=======
// creates a new pet with current user Id
//in testing stage
>>>>>>> dev
router.post('/', petController.postPet, (req, res) => {
  return res.status(200).json(res.locals.postPets);
});

//PATCH req
<<<<<<< HEAD
=======
//updates a pets stats
// Updates pets stats in server, and returns update
//this just requ
>>>>>>> dev
router.patch('/pets/:id', petController.updatePet, (req, res) => {
  res.status(200).json(res.locals.updatePet);
});

// I don't think We need these maby update one into gifting

//DELETE req
router.delete('/pets/:id', petController.releasePet, (req, res) => {
  res.status(200).json(res.locals.releasePet);
});

<<<<<<< HEAD
=======
// find all pets belonging to user
// delete all
// in testing stage
>>>>>>> dev
router.delete('/pets', petController.releaseAll, (req, res) => {
  return res.status(200).json();
});

module.exports = router;
