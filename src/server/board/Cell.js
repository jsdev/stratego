function Cell (xPosition, yPosition, canBeOccupied) {
	this.xPosition = xPosition;
	this.yPosition = yPosition;
	this.canBeOccupied = canBeOccupied || true;
	this.isOccupiedBy = null;
}

Cell.prototype.placePiece = function (piece) {
	this.isOccupiedBy = piece;
};

Cell.prototype.empty = function () {
	this.isOccupiedBy = null;
};

module.exports = Cell;
