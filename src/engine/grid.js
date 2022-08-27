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
		if (horizontal) {
			if (x > 45) {
				return false
			}
			for (let cellX = x; cellX <= x + 2; ++cellX) {
				const cells = this.getCellTwoPrev(cellX + 2, y, true)
				if (!isFibonacci(cells)) {
					return false
				}
			}
		} else {
			// TODO: Get rid of code duplicates
			if (y > 45) {
				return false
			}
			for (let cellY = y; cellY <= y + 2; ++cellY) {
				const cells = this.getCellTwoPrev(x, cellY + 2, false)
				if (!isFibonacci(cells)) {
					return false
				}
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

	// TODO: Move value setter to separate function
	clearLine(coordinate, horizontal = false) {
		for (let c = 0; c < 50; ++c) {
			const x = horizontal ? c : coordinate
			const y = horizontal ? coordinate : c
			console.log(`Clear ${x};${y}`)
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
			for (let cellX = 0; cellX < 50 - offsets.centerRight; ++cellX) {
				callbacks.horizontal(cellX, y)
			}
			const leftX = x < offsets.left ? 0 : x - offsets.left
			const rightX = x > 49 ? 49 : x + offsets.right
			for (let cellY = 0; cellY < 50; ++cellY) {
				if (cellY != y) {
					for (let x = leftX; x <= rightX; ++x) {
						callbacks.horizontal(x, cellY)
					}
				}
			}
		}
		// TODO: Get rid of code duplicates
		// Vertical
		if (callbacks.vertical) {
			for (let cellY = 0; cellY < 50 - offsets.centerBottom; ++cellY) {
				callbacks.vertical(x, cellY)
			}
			const topY = y < offsets.top ? 0 : y - offsets.top
			const bottomY = y > 49 ? 49 : y + offsets.bottom
			for (let cellX = 0; cellX < 50; ++cellX) {
				if (cellX != x) {
					for (let y = topY; y <= bottomY; ++y) {
						callbacks.vertical(cellX, y)
					}
				}
			}
		}
	}
}
