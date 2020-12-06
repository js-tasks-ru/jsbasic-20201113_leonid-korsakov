/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify (users) {
  let names = [];
  users.forEach(user => names.push(user.name));
  return names;
}
