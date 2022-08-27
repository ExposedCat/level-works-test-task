function handleClicks(containerSelector, elementClassName, callback) {
	const container = document.querySelector(containerSelector)
	if (!container) {
		throw new Error(`Container not found`)
	}
	container.addEventListener('click', ({ target }) => {
		if (target.classList.contains(elementClassName)) {
			callback(target)
		}
	})
}

function createRow() {
	let row = document.createElement('div')
	row.classList.add('row')
	return row
}

function createCell(x, y) {
	let cell = document.createElement('div')
	cell.classList.add('cell')
	cell.dataset.x = x
	cell.dataset.y = y
	cell.innerText = '·'
	return cell
}
