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
	cell.innerText = ''
	return cell
}

async function checkAffectedCells(x, y, grid, horizontal) {
	let main = x
	let limit = y
	if (horizontal) {
		main = y
		limit = x
	}
	if (limit > 47) {
		return
	}
	const isFibonacci = grid.checkLineFromPoint(x, y, horizontal)
	if (isFibonacci) {
		const axis = horizontal ? 'x' : 'y'
		await grid.highlightLine(axis, main, 'green', 500)
		grid.clearLine(main, horizontal)
	}
}

function setLineColor(axis, coord, color) {
	const styles = document.querySelector('#styles')
	const query = `data-${axis}="${coord}"`
	const selector = `\\.cell\\[${query}\\]`
	const field = `background`
	styles.innerText = styles.innerText.replace(
		new RegExp(`${selector}{${field}:.+?}`),
		''
	)
	styles.innerText += `.cell[${query}]{${field}:${color}}`
}
