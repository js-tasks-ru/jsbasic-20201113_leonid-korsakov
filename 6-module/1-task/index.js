/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this.users = rows;
    this.elem = this.createTable();
  }

  createTable() {
    this.table = document.createElement('table');
    const tBody = document.createElement('tbody');
    const thead = 
    `
    <thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr>
    </thead>
    `;

    for (let user of this.users) {
      let row = `
      <tr>
          <td>${user.name}</td>
          <td>${user.age}</td>
          <td>${user.salary}</td>
          <td>${user.city}</td>
          <td><button>X</button></td>
        </tr>
      `;
      tBody.insertAdjacentHTML('beforeend', row);
    }

    this.table.insertAdjacentHTML('beforeend', thead);
    this.table.append(tBody);

    this.table.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('button')) {
        target.closest('tr').remove();
      }
    });

    return this.table;
  }
}