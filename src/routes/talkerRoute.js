const express = require('express');
const { readTalkerFile, readTalkerID } = require('../utils/fsUtils');

const router = express.Router();

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

module.exports = router;