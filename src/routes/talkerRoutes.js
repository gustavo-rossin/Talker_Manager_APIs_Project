const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const validateAge = require('../middlewares/validateAge');
const validateAuthorization = require('../middlewares/validateAuthorization');
const validateName = require('../middlewares/validateName');
const validateRate = require('../middlewares/validateRate');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const getTalkers = require('../utils/getTalkers');

const router = express.Router();
const pathTalkers = path.resolve(__dirname, '../talker.json');

router.get('/search',
validateAuthorization,
async (req, res) => {
  const { q } = req.query;

  const talkers = await getTalkers();

  const filteredQuery = talkers.filter((el) => el.name.toLowerCase().includes(q.toLowerCase())); 
  // console.log(filteredQuery);
    if (!q) {
      return res.status(200).send(talkers);
    } 
  res.status(200).json(filteredQuery);
});

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  // console.log(talkers);
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
  // console.log(id);
  const findTalker = talkers.find((json) => +id === json.id);
  try {
    if (findTalker) {
      return res.status(200).json(findTalker);
    } res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post('/',
validateAuthorization,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const talkers = await getTalkers();
  const id = talkers.length + 1;
  const newTalker = { id, ...req.body };
  const allTalkers = JSON.stringify([...talkers, newTalker], null, 2);

  await fs.writeFile(pathTalkers, allTalkers);

res.status(201).json(newTalker);
});

router.put('/:id',
validateAuthorization,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  // console.log(id);
  const indexTalker = talkers.findIndex((json) => +id === json.id);

  talkers[indexTalker] = { id: +id, ...req.body };
  // console.log(talkers[indexTalker]);
  const updatedTalkers = JSON.stringify(talkers, null, 2);
  await fs.writeFile(pathTalkers, updatedTalkers);

  res.status(200).json(talkers[indexTalker]);
});

router.delete('/:id', 
validateAuthorization,
async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  const filteredTalkers = talkers.filter((el) => +id !== el.id);

  const updatedTalkers = JSON.stringify(filteredTalkers, null, 2);
  await fs.writeFile(pathTalkers, updatedTalkers);

  res.status(204).end();
});

module.exports = router;