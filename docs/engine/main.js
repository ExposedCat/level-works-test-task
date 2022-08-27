let grid = new Grid()

DomUtils.handleClicks(grid.getContainer(), 'cell', async cell => {
	const { x, y } = cell.dataset
	const point = Point(x, y)

	// Increase cell values
	GridUtils.forLineAt(point, grid.increaseCell.bind(grid), true)
	await grid.highlightLines(
		[Line('x', x), Line('y', y)],
		Config.animations.increase.color,
		Config.animations.increase.time
	)
	
	// Check for Fibonacci sequences
	for (const isHorizontal of [true, false]) {
		const lines = GridUtils.forLineAt(
			point,
			point => grid.processNewFibonacciLines(point, isHorizontal),
			isHorizontal,
			[Config.offsets.side1, Config.offsets.side2, Config.offsets.limit]
		)
		await grid.highlightLines(
			lines,
			Config.animations.clear.color,
			Config.animations.clear.time
		)
	}
})
