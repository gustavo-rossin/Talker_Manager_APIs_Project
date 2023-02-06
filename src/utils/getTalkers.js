const fs = require('fs/promises');
const path = require('path');

const pathTalker = path.resolve(__dirname, '../talker.json');

const getTalkers = async () => {
  const jsonContent = await fs.readFile(pathTalker, 'utf-8');
  const data = JSON.parse(jsonContent);
  return data;
};

module.exports = getTalkers;