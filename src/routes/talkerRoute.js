const express = require('express');
const { readTalkerFile, readTalkerID,
  insertData, editData, deleteData, searchTalker } = require('../utils/fsUtils');
const { nameValidation, tokenValidation, ageValidation, talkValidation, watchedAtValidation,
  rateValidation } = require('../middlewares/talkerAuth');

const router = express.Router();

router.get('/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const searchingFor = await searchTalker(q);
  return res.status(200).json(searchingFor);
});

router.get('/', async (_req, res, next) => {
  const talkers = await readTalkerFile();
  if (!talkers) {
      next({ message: 'Error opening file', statusCode: 500 });
    }
    return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readTalkerID(id);
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
});

router.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const remainingTalkers = await deleteData(id);
  return res.status(204).json(remainingTalkers);
});

router.use(tokenValidation, nameValidation, ageValidation, talkValidation,
  watchedAtValidation, rateValidation);

router.post('/', async (req, res) => {
  const talkerBody = req.body;
  const insert = await insertData(talkerBody);
  return res.status(201).json(insert);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const edit = await editData(id, name, age, talk);
  return res.status(200).json(edit);
});

module.exports = router;