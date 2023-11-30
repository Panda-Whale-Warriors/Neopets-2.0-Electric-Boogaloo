const express = require('express');
const petController = require('../controller/petController');

const router = express.Router();

//get all pets by current user
// find all pets owned by current logged in user
router.get('/pets', petController.getPets, (req, res) => {
  // console.log('made it to api', res.locals.getPets);
  return res.status(200).json(res.locals.getPets);
});

//get a single pet by current user
// findOne, and return a pet from database
router.get('/pets/:id', petController.getOnePet, (req, res) => {
  return res.status(200).json(res.locals.getOnePet);
});

// POST req
// router.post('/', petController.postPet, (req, res) => {
// creates a new pet with current user Id
//in testing stage
router.post('/pets', petController.postPet, (req, res) => {
  return res.status(200).json(res.locals.postPets);
});

//PATCH req
//updates a pets stats
// Updates pets stats in server, and returns update
//this just requ
router.patch('/pets/:id', petController.updatePet, (req, res) => {
  res.status(200).json(res.locals.updatePet);
});

// I don't think We need these maby update one into gifting

//DELETE req
router.delete('/pets/:id', petController.releasePet, (req, res) => {
  res.status(200).json(res.locals.releasePet);
});

// find all pets belonging to user
// delete all
// in testing stage
router.delete('/pets', petController.releaseAll, (req, res) => {
  return res.status(200).json();
});

module.exports = router;
