/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  let rows = table.rows;
  for (let i = 0; i < rows.length; i++) {
    let currentRow = rows[i];
    let currentCells = [...currentRow.cells];
    currentCells[i].style.backgroundColor = 'red';
  }
}
