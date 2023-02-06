const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar //
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const contentPath = path.resolve(__dirname, 'talker.json');
  const content = await fs.readFile(contentPath, 'utf8');
  const talkers = JSON.parse(content);
  res.status(HTTP_OK_STATUS).json(talkers);
});
