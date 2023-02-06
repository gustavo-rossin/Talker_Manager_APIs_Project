const express = require('express');
const generateToken = require('../utils/generateToken');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const token = await generateToken();
try {
  if (email !== '' && password.length >= 1) {
    res.status(200).json({ email, password, token });
  }
} catch (error) {
  res.status(500).json({ message: error.message });
}
});

module.exports = router;