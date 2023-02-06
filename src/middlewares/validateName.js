const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) res.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
   }

  return next();
};

module.exports = validateName;