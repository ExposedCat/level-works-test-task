let grid = new Grid()
handleClicks('.grid', 'cell', cell => {
	let { x, y } = cell.dataset
	x = Number(x)
	y = Number(y)
	// Increase cell values
	grid.forLineAt(x, y, grid.increaseCell.bind(grid), true)
	// Check for Fibonacci sequences
	for (const horizontal of [true, false]) {
		grid.forLineAt(
			x,
			y,
			(x, y) => checkAffectedCells(x, y, grid, horizontal),
			horizontal,
			[5, 5, 2]
		)
	}
})
