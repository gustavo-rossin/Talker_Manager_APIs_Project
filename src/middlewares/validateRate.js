const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  const ratings = [1, 2, 3, 4, 5];

  if (!rate) res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  if (Number.isInteger(rate) && rate in ratings) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

  return next();
};

module.exports = validateRate;