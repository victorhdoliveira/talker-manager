const express = require('express');
const utilsFile = require('../utils/readAndWriteFiles');

const router = express.Router();

router.get('/talker', async (req, res, next) => {
  const talkers = await utilsFile.readTalkerFile();
  if (!talkers) {
      next({ message: 'Error opening file', statusCode: 500 });
    }
  res.status(200).json(talkers);
});

module.exports = router;