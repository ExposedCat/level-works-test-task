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

function processNewFibonnaciLines(x, y, grid, horizontal) {
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
		grid.clearLine(main, horizontal)
		return {
			axis: horizontal ? 'y' : 'x',
			main,
			horizontal
		}
	}
}

function setLinesColor(lines, color) {
	const styles = document.querySelector('#styles')
	let query = ``
	for (const line of lines) {
		if (!line) {
			continue
		}
		query += `.cell[data-${line.axis}="${line.main}"],`
	}
	styles.innerText = `${query.slice(0, -1)}{background:${color}}`
}

function pushValid(array, item) {
	if (item !== undefined) {
		array.push(item)
	}
}