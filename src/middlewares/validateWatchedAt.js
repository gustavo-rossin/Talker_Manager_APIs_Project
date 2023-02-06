const checkDates = require('../utils/checkDates');

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  if (!talk) res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  if (!watchedAt) {
    res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!checkDates(watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }

  return next();
};

module.exports = validateWatchedAt;