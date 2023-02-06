const generateToken = require('../utils/generateToken');

const validateAuthorization = async (req, res, next) => {
  const authorization = await generateToken();
  
  // console.log(authorization);

  if (!authorization) res.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length !== 16) res.status(401).json({ message: 'Token inválido' });

  next();
};

module.exports = validateAuthorization;