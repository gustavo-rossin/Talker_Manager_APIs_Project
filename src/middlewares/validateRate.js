const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const ratings = [1, 2, 3, 4, 5];

  if (talk.rate <= 0 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  if (!talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!(talk.rate in ratings)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

  next();
};

module.exports = validateRate;