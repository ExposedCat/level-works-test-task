/**
 * Pushes item to the array if item is defined
 * @param {Array} array
 * @param {any} item
 */
function pushValid(array, item) {
	if (item !== undefined) {
		array.push(item)
	}
}

/**
 *
 * @param {{clicks: number}} - 3 cells to check
 * @returns {boolean} If cells make a Fibonacci sequence
 */
function isFibonacci([n2, n1, n]) {
	return !!(
		n2.clicks &&
		n1.clicks &&
		n.clicks &&
		n.clicks === n2.clicks + n1.clicks
	)
}

/**
 * Represents utilites for DOM
 */
class DomUtils {
	/**
	 * Creates row DOM element
	 * @returns {Element}
	 * @static
	 */
	static createRow() {
		let row = document.createElement('div')
		row.classList.add('row')
		return row
	}

	/**
	 * Creates cell DOM element
	 * @param {Point} point
	 * @returns {Element}
	 */
	static createCell(point) {
		let cell = document.createElement('div')
		cell.classList.add('cell')
		cell.dataset.x = point.x
		cell.dataset.y = point.y
		cell.innerText = ''
		return cell
	}

	/**
	 * Handles clicks on elements in container
	 * @param {Element} container
	 * @param {string} elementClassName - Class name of elements to handle clicks on
	 * @param {(target: EventTarget | null) => any} callback - Function to call on element on click
	 */
	static handleClicks(container, elementClassName, callback) {
		container.addEventListener('click', ({ target }) => {
			if (target.classList.contains(elementClassName)) {
				callback(target)
			}
		})
	}

	/**
	 * Sets color of specified lines. Uses `<style id='styles'>` element
	 * @param {Line[]} lines
	 * @param {string} color
	 */
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

/**
 * Represents utilites for grid
 */
class GridUtils {
	/**
	 * Executes callback for each point at line by offsets to both sides from the point
	 * @param {Point} point
	 * @param {(point: Point) => any} callback
	 * @param {boolean} isHorizontal If should process cells horizontally
	 * @param {number[]} offsets - Offsets by two sides
	 * @returns {Promise<any[]>}
	 */
	static forLineAt(point, callback, isHorizontal, offsets = [0, 0]) {
		return new Promise(resolve => {
			let results = []
			for (let coord = 0; coord < 50; ++coord) {
				if (isHorizontal) {
					pushValid(results, callback(new Point(coord, point.y)))
				} else {
					pushValid(results, callback(new Point(point.x, coord)))
				}
			}
			const axis1 = isHorizontal ? point.x : point.y
			const axis2 = isHorizontal ? point.y : point.x
			const firstLimit = axis1 < offsets[0] ? 0 : axis1 - offsets[0]
			const secondLimit = axis1 > 49 ? 49 : axis1 + offsets[1]
			for (let coord1 = 0; coord1 < 50; ++coord1) {
				if (coord1 != axis2) {
					for (
						let coord2 = firstLimit;
						coord2 <= secondLimit;
						++coord2
					) {
						if (isHorizontal) {
							pushValid(
								results,
								callback(new Point(coord2, coord1))
							)
						} else {
							pushValid(
								results,
								callback(new Point(coord1, coord2))
							)
						}
					}
				}
			}
			resolve(results)
		})
	}
}
