/**
 * Represents line
 */
class Line {
	/**
	 * Creates line
	 * @param {'x' | 'y'} axis - Axis the line is perpendicular to
	 * @param {Number} coordinate - Point of the line on the specified axis
	 */
	constructor(axis, coordinate) {
		this.axis = axis
		this.coordinate = coordinate
	}
}

/**
 * Represents point
 */
class Point {
	/**
	 * Creates point
	 * @param {Number} x - X coordinate
	 * @param {Number} y - Y coordinate
	 */
	constructor(x, y) {
		this.x = Number(x)
		this.y = Number(y)
	}
}
