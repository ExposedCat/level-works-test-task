let grid = new Grid()
handleClicks('.grid', 'cell', async cell => {
	let { x, y } = cell.dataset
	x = Number(x)
	y = Number(y)
	// Increase cell values
	grid.forLineAt(x, y, grid.increaseCell.bind(grid), true)
	await grid.highlightCross(x, y, 'yellow', 500)
	// Check for Fibonacci sequences
	for (const horizontal of [true, false]) {
		const lines = grid.forLineAt(
			x,
			y,
			(x, y) => processNewFibonnaciLines(x, y, grid, horizontal),
			horizontal,
			[5, 5, 2]
		)
		await grid.highlightLines(lines, 'green', 1000)
	}
})
