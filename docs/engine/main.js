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
	const point = Point(x, y)

	// Increase cell values
	await GridUtils.forLineAt(point, grid.increaseCell.bind(grid), true)
	grid.highlightLines(
		[Line('x', x), Line('y', y)],
		Config.animations.increase.color,
		Config.animations.increase.time
	)

	// Check for Fibonacci sequences
	for (const isHorizontal of [true, false]) {
		const lines = await GridUtils.forLineAt(
			point,
			point => grid.processNewFibonacciLines(point, isHorizontal),
			isHorizontal,
			[Config.offsets.side1, Config.offsets.side2]
		)
		await grid.highlightLines(
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
