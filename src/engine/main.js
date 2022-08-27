let grid = new Grid()
handleClicks('.grid', 'cell', cell => {
	const { x, y } = cell.dataset
	// Increase cell values
	grid.forCrossAt(Number(x), Number(y), {
		horizontal: (x, y) => {
			grid.increaseCell(x, y)
		}
	})
	// Check for Fibonacci (horizontal)
	grid.forCrossAt(
		Number(x),
		Number(y),
		{
			// TODO: Get rid of code duplicates
			horizontal: (x, y) => {
				if (x > 47) {
					return
				}
				const isFibonacci = grid.checkLineFromPoint(x, y, true)
				if (isFibonacci) {
					grid.clearLine(y, true)
				}
			},
			vertical: (x, y) => {
				if (y > 47) {
					return
				}
				const isFibonacci = grid.checkLineFromPoint(x, y, false)
				if (isFibonacci) {
					grid.clearLine(x, false)
				}
			}
		},
		{
			left: 5,
			right: 5,
			centerRight: 2,
			top: 5,
			bottom: 5,
			centerBottom: 2
		}
	)
})
