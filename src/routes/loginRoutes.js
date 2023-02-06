const express = require('express');
const generateToken = require('../utils/generateToken');
const validateLogin = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const token = await generateToken();

  res.status(200).json({ email, password, token });
});

module.exports = router;