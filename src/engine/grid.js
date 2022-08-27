class Grid {
	#matrix

	constructor() {
		this.#matrix = []
		for (let i = 0; i < 50; ++i) {
			this.#matrix[i] = new Array(50).fill(0)
		}
		this.render()
	}

	render() {
		let container = document.querySelector(`.grid`)
		if (!container) {
			throw new Error(`Container not found`)
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

	getCell(x, y, getDOMElement = false) {
		if (!this.#matrix[y] || this.#matrix[y][x] === undefined) {
			return {
				element: null,
				clicks: 0
			}
		}
		let cell = null
		if (getDOMElement) {
			const selector = `.cell[data-x="${x}"][data-y="${y}"]`
			cell = document.querySelector(selector)
		}
		return {
			element: cell,
			clicks: this.#matrix[y][x]
		}
	}

	getCellTwoPrev(x, y, horizontal = true) {
		const cell = this.getCell(x, y)
		let prev1
		let prev2
		if (horizontal) {
			prev1 = this.getCell(x - 1, y)
			prev2 = this.getCell(x - 2, y)
		} else {
			prev1 = this.getCell(x, y - 1)
			prev2 = this.getCell(x, y - 2)
		}
		return [prev2, prev1, cell]
	}

	checkLineFromPoint(x, y, horizontal = true) {
		let axis1 = y
		let axis2 = x
		if (horizontal) {
			axis1 = x
			axis2 = y
		}
		if (axis1 > 45) {
			return false
		}
		for (let i = axis1; i <= axis1 + 2; ++i) {
			let cells
			if (horizontal) {
				cells = this.getCellTwoPrev(i + 2, axis2, true)
			} else {
				cells = this.getCellTwoPrev(axis2, i + 2, false)
			}
			if (!isFibonacci(cells)) {
				return false
			}
		}
		return true
	}

	increaseCell(x, y) {
		let { element } = this.getCell(x, y, true)
		if (!element) {
			return
		}
		element.innerText = ++this.#matrix[y][x]
	}

	clearLine(coordinate, horizontal = false) {
		for (let c = 0; c < 50; ++c) {
			const x = horizontal ? c : coordinate
			const y = horizontal ? coordinate : c
			this.#matrix[y][x] = 0
			const { element } = this.getCell(x, y, true)
			element.innerHTML = ''
		}
	}

	highlightCell(x, y, color) {
		let { element } = this.getCell(x, y, true)
		if (!element) {
			return
		}
		element.style.background = color
	}

	forLineAt(x, y, callback, horizontal, offsets = [0, 0, 0]) {
		for (let coord = 0; coord < 50 - offsets[2]; ++coord) {
			if (horizontal) {
				callback(coord, y)
			} else {
				callback(x, coord)
			}
		}
		const axis1 = horizontal ? x : y
		const axis2 = horizontal ? y : x
		const firstLimit = axis1 < offsets[0] ? 0 : axis1 - offsets[0]
		const secondLimit = axis1 > 49 ? 49 : axis1 + offsets[1]
		for (let i = 0; i < 50; ++i) {
			if (i != axis2) {
				for (let j = firstLimit; j <= secondLimit; ++j) {
					if (horizontal) {
						callback(j, i)
					} else {
						callback(i, j)
					}
				}
			}
		}
	}

	forCrossAt(
		x,
		y,
		callbacks,
		offsets = {
			left: 0,
			right: 0,
			centerRight: 0,
			top: 0,
			bottom: 0,
			centerBottom: 0
		}
	) {
		// Horizontal
		if (callbacks.horizontal) {
			this.forLineAt(x, y, callbacks.horizontal, true, [
				offsets.left,
				offsets.right,
				offsets.centerRight
			])
		}
		if (callbacks.vertical) {
			this.forLineAt(x, y, callbacks.vertical, false, [
				offsets.top,
				offsets.bottom,
				offsets.centerBottom
			])
		}
	}
}
