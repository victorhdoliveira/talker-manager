const express = require('express');
const { readTalkerFile } = require('../utils/fsUtils');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const talkers = await readTalkerFile();
  if (!talkers) {
      next({ message: 'Error opening file', statusCode: 500 });
    }
  return res.status(200).json(talkers);
});

module.exports = router;