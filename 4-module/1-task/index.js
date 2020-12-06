/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  const list = document.createElement('ul');
  const names = friends.map(friend => {return `${friend.firstName} ${friend.lastName}`});
  for (let name of names) {
    list.innerHTML += `<li>${name}</li>`;
  }
  return list;
}
