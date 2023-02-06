const express = require('express');
const crypto = require('crypto');

const router = express.Router();

function tokenGenerator() {
    return crypto.randomBytes(8).toString('hex');
  }

router.post('/', async (req, res) => {
    const token = tokenGenerator();
    return res.status(200).json({ token });
});

module.exports = router;