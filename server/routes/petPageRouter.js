const express = require('express');
const petController = require('../controller/petController');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('made it to petPageRouter');
  return res.status(200);
});

module.exports = router;
