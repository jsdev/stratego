var Cell = require('./Cell');

var TOTAL_ROWS = 10,
	TOTAL_COLUMNS = 10;

function Board () {
	this.cells = [];

	for (var rowIndex = 0; rowIndex < TOTAL_ROWS; ++rowIndex) {
		this.cells[rowIndex] = [];
		for (var columnIndex = 0; columnIndex < TOTAL_COLUMNS; ++columnIndex) {
			var canBeOccupied = true;
			if ((rowIndex === 4 || rowIndex === 5) &&
				(columnIndex === 2 || columnIndex === 3)) {
				canBeOccupied = false;
			}
			this.cells[rowIndex][columnIndex] = new Cell(rowIndex, columnIndex, canBeOccupied);
		}
	}
}

Board.prototype.reset = function () {

};

module.exports = Board;
