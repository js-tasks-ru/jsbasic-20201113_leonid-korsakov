/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  let result = [];
  for (let user of users) {
    if (user.age <= age) {
      result.push(`${user.name}, ${user.balance}`);
    }
  }
  for (let user in result) {
    if (user < result.length - 1) {
      result[user] += '\n';
    }
  }
  return result.join('');
}
