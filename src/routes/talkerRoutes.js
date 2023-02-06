const express = require('express');
const getTalkers = require('../utils/getTalkers');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  console.log(talkers);
  try {
    if (talkers.length !== 0) {
      return res.status(200).json(talkers);
    } 
      res.status(200).send([]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;