let grid = new Grid()
let frozen = false
handleClicks('.grid', 'cell', async cell => {
	if (frozen) {
		return
	}
	frozen = true
	let { x, y } = cell.dataset
	x = Number(x)
	y = Number(y)
	// Increase cell values
	grid.forLineAt(x, y, grid.increaseCell.bind(grid), true)
	await grid.highlightCross(x, y, 'yellow', 500)
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
	frozen = false
})
