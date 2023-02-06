const checkDates = (date) => {
const splitted = date.split('/');
const monthsWith31Days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const monthsWith30Days = ['4', '6', '9', '11'];

if (+splitted[0] <= 30 && splitted[1] in monthsWith30Days) { 
  return date; 
}

if (+splitted[0] <= 31 && splitted[1] in monthsWith31Days) {
  return date;
}
};

module.exports = checkDates;