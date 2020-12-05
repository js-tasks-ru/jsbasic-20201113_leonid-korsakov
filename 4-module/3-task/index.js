/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  let rows = table.rows;
  for (let i = 1; i < rows.length; i++) {
    let currentRow = rows[i];
    let currentCells = [...currentRow.cells];

    if (currentCells[3].dataset.available === 'true') {
      rows[i].classList.add('available');
    } else if (currentCells[3].dataset.available === 'false') {
      rows[i].classList.add('unavailable');
    } else {
      rows[i].hidden = true;
    }
		
    if (currentCells[2].textContent === 'm') {
      rows[i].classList.add('male');
    } else {
      rows[i].classList.add('female');
    }
    let userAge = +currentCells[1].textContent;
    if (userAge < 18) {
      rows[i].style = "text-decoration: line-through";
    }
  }
}
