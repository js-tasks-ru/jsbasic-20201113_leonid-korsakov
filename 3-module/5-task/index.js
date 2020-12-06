/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let result = {};
  let arr = str.split(',').join(' ').split(' ').map(prop => {
    if (!isNaN(prop) && prop !== '') {
      return prop;
    } else {
      return '';
    }
  });
  result.min = Math.min.apply(null, arr);
  result.max = Math.max.apply(null, arr);
  return result;
}
