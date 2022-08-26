console.info(`Script connected`)

/*
    NOTE: Sometimes I am using let instead of const even when the object
    itself will not be overridden, because it is more correct semantically,
    since I am modifying its fields
*/

/**
 * @return {HTMLDivElement} The кщц HTML object
 */
function createRow() {
	let row = document.createElement('div')
	row.classList.add('row')
	return row
}

/**
 *
 * @param {Number} x - X coordinate of the cell
 * @param {Number} y - Y coordinate of the cell
 *
 * @return {HTMLDivElement} The cell HTML object
 */
function createCell(x, y) {
	let cell = document.createElement('div')
	cell.classList.add('cell')
	cell.dataset.x = x
	cell.dataset.y = y
	return cell
}

/**
 *
 * @param {String} containerSelector - Container to render grid in
 *
 * @return {void}
 */
function generateGrid(containerSelector) {
	let container = document.querySelector(containerSelector)
	if (!container) {
		throw new Error(`Container is not found`)
	}
	for (let y = 0; y < 50; ++y) {
		const row = createRow()
		for (let x = 0; x < 50; ++x) {
			const cell = createCell(x, y)
			row.appendChild(cell)
		}
		container.appendChild(row)
	}
}

generateGrid('.grid')