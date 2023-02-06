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

router.get('/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  console.log(id);
  const findTalker = talkers.find((json) => +id === json.id);
  try {
    if (findTalker) {
      return res.status(200).json(findTalker);
    } res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;