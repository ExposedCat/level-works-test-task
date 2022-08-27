function pushValid(array, item) {
	if (item !== undefined) {
		array.push(item)
	}
}

function isFibonacci([n2, n1, n]) {
	return !!(
		n2.clicks &&
		n1.clicks &&
		n.clicks &&
		n.clicks === n2.clicks + n1.clicks
	)
}

class DomUtils {
	static createRow() {
		let row = document.createElement('div')
		row.classList.add('row')
		return row
	}

	static createCell(point) {
		let cell = document.createElement('div')
		cell.classList.add('cell')
		cell.dataset.x = point.x
		cell.dataset.y = point.y
		cell.innerText = ''
		return cell
	}

	static handleClicks(container, elementClassName, callback) {
		if (!container) {
			throw new Error(`Can't handle clicks: container not found`)
		}
		container.addEventListener('click', ({ target }) => {
			if (target.classList.contains(elementClassName)) {
				callback(target)
			}
		})
	}

	static setLinesColor(lines, color) {
		const styles = document.querySelector('#styles')
		let query = ``
		for (const line of lines) {
			if (!line) {
				continue
			}
			query += `.cell[data-${line.axis}="${line.coordinate}"],`
		}
		styles.innerText = `${query.slice(0, -1)}{background:${color}}`
	}
}

class GridUtils {
	static forLineAt(point, callback, isHorizontal, offsets = [0, 0, 0]) {
		let results = []
		for (let coord = 0; coord < 50 - offsets[2]; ++coord) {
			if (isHorizontal) {
				pushValid(results, callback(Point(coord, point.y)))
			} else {
				pushValid(results, callback(Point(point.x, coord)))
			}
		}
		const axis1 = isHorizontal ? point.x : point.y
		const axis2 = isHorizontal ? point.y : point.x
		const firstLimit = axis1 < offsets[0] ? 0 : axis1 - offsets[0]
		const secondLimit = axis1 > 49 ? 49 : axis1 + offsets[1]
		for (let coord1 = 0; coord1 < 50; ++coord1) {
			if (coord1 != axis2) {
				for (let coord2 = firstLimit; coord2 <= secondLimit; ++coord2) {
					if (isHorizontal) {
						pushValid(results, callback(Point(coord2, coord1)))
					} else {
						pushValid(results, callback(Point(coord1, coord2)))
					}
				}
			}
		}
		return results
	}
}
