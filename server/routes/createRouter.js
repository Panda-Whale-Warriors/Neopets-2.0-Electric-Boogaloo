const express = require('express');
const petController = require('../controller/petController');

const router = express.Router();

router.get('/pets', petController.getPets, (req, res) => {
  // console.log('made it to api', res.locals.getPets);
  return res.status(200).json(res.locals.getPets);
});

router.get('/pets/:id', petController.getOnePet, (req, res) => {
  return res.status(200).json(res.locals.getOnePet);
});

// POST req
// router.post('/', petController.postPet, (req, res) => {
router.post('/', petController.postPet, (req, res) => {
  return res.status(200).json(res.locals.postPets);
});

//PATCH req
router.patch('/pets/:id', petController.updatePet, (req, res) => {
  res.status(200).json(res.locals.updatePet);
});

//DELETE req
router.delete('/pets/:id', petController.releasePet, (req, res) => {
  res.status(200).json(res.locals.releasePet);
});

router.delete('/pets', petController.releaseAll, (req, res) => {
  return res.status(200).json();
});

module.exports = router;
