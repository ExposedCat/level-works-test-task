class Grid {
	#matrix
	#element
	#animationTimer

	constructor() {
		this.#matrix = []
		this.#element = document.querySelector(`.grid`)
		if (!this.#element) {
			throw new Error(`Container not found`)
		}
		for (let i = 0; i < 50; ++i) {
			this.#matrix[i] = new Array(50).fill(0)
		}
		this.#render()
	}

	#render() {
		for (let y = 0; y < 50; ++y) {
			const row = DomUtils.createRow()
			for (let x = 0; x < 50; ++x) {
				const cell = DomUtils.createCell(Point(x, y))
				row.appendChild(cell)
			}
			this.#element.appendChild(row)
		}
	}

	getContainer() {
		if (!this.#element) {
			throw new Error(`Container not found`)
		}
		return this.#element
	}

	setCursor(clickable) {
		this.#element.style.cursor = clickable ? 'pointer' : 'not-allowed'
	}

	getCell(point, getDOMElement = false) {
		const row = this.#matrix[point?.y]
		if (!row || row[point.x] === undefined) {
			return {
				element: null,
				clicks: 0
			}
		}
		let cell = null
		if (getDOMElement) {
			const selector = `.cell[data-x="${point.x}"][data-y="${point.y}"]`
			cell = document.querySelector(selector)
		}
		return {
			element: cell,
			clicks: row[point.x]
		}
	}

	getCellTwoPrev(point, isHorizontal, reverse) {
		let prev1
		let prev2
		const multiplier = reverse ? 1 : -1
		if (isHorizontal) {
			prev1 = Point(point.x + multiplier, point.y)
			prev2 = Point(point.x + 2 * multiplier, point.y)
		} else {
			prev1 = Point(point.x, point.y + multiplier)
			prev2 = Point(point.x, point.y + 2 * multiplier)
		}
		const cell = Point(point.x, point.y)
		return [this.getCell(prev2), this.getCell(prev1), this.getCell(cell)]
	}

	checkLineFromPoint(point, isHorizontal, reverse) {
		let axis1 = point.y
		let axis2 = point.x
		if (isHorizontal) {
			axis1 = point.x
			axis2 = point.y
		}
		if (axis1 > 45) {
			return false
		}
		const offset = reverse ? 0 : 2
		for (let coord1 = axis1; coord1 <= axis1 + 2; ++coord1) {
			let cells
			if (isHorizontal) {
				cells = this.getCellTwoPrev(
					Point(coord1 + offset, axis2),
					true,
					reverse
				)
			} else {
				cells = this.getCellTwoPrev(
					Point(axis2, coord1 + offset),
					false,
					reverse
				)
			}
			if (!isFibonacci(cells)) {
				return false
			}
		}
		return true
	}

	increaseCell(point) {
		let { element } = this.getCell(point, true)
		if (!element) {
			return
		}
		element.innerText = ++this.#matrix[point.y][point.x]
	}

	clearLine(coord1, isHorizontal = false) {
		for (let coord2 = 0; coord2 < 50; ++coord2) {
			const x = isHorizontal ? coord2 : coord1
			const y = isHorizontal ? coord1 : coord2
			this.#matrix[y][x] = 0
			const { element } = this.getCell(Point(x, y), true)
			element.innerHTML = ''
		}
	}

	async highlightLines(lines, color, time) {
		if (!lines.length) {
			return
		}
		DomUtils.setLinesColor(lines, color)
		return new Promise(resolve => {
			clearTimeout(this.#animationTimer)
			this.#animationTimer = setTimeout(() => {
				DomUtils.setLinesColor(lines, 'none')
				resolve()
			}, time)
		})
	}

	processNewFibonacciLines(point, isHorizontal) {
		let main = point.x
		let limit = point.y
		if (isHorizontal) {
			main = point.y
			limit = point.x
		}
		if (limit > 47) {
			return
		}
		let isFibonacci = this.checkLineFromPoint(point, isHorizontal, false)
		isFibonacci ||= this.checkLineFromPoint(point, isHorizontal, true)
		if (isFibonacci) {
			return {
				axis: isHorizontal ? 'y' : 'x',
				coordinate: main,
				isHorizontal
			}
		}
	}
}
