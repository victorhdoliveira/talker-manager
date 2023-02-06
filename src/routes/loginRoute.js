const express = require('express');
const crypto = require('crypto');
const { emailValidation, passwordValidation } = require('../middlewares/emailsAndPassValidation');

const router = express.Router();

function tokenGenerator() {
    return crypto.randomBytes(8).toString('hex');
  }

router.use(emailValidation, passwordValidation);

router.post('/', (_req, res) => {
    const token = tokenGenerator();
    return res.status(200).json({ token });
    });

module.exports = router;