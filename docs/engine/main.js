let grid = new Grid()
let lock = false

DomUtils.handleClicks(grid.getContainer(), 'cell', async cell => {
	// Lock on clear
	if (lock) {
		return
	}
	lock = true
	grid.setCursor(false)

	const { x, y } = cell.dataset
	const point = new Point(x, y)

	// Increase cell values
	await GridUtils.forLineAt(point, grid.increaseCell.bind(grid), true)
	grid.blinkLines(
		[new Line('x', x), new Line('y', y)],
		Config.animations.increase.color,
		Config.animations.increase.time
	)

	// Check for Fibonacci sequences
	for (const isHorizontal of [true, false]) {
		/**
		 * @type {(Line & {isHorizontal: boolean})[]}
		 */
		const lines = await GridUtils.forLineAt(
			point,
			point => grid.getFibonacciLines(point, isHorizontal),
			isHorizontal,
			[Config.offsets.side1, Config.offsets.side2]
		)
		await grid.blinkLines(
			lines,
			Config.animations.clear.color,
			Config.animations.clear.time
		)
		for (const { coordinate, isHorizontal } of lines) {
			grid.clearLine(coordinate, isHorizontal)
		}
	}

	// Unlock
	lock = false
	grid.setCursor(true)
})
