var Piece = require('./Piece');

function Major () {
	super('Major', 7);
}

Major.prototype = Piece;
Major.prototype.constructor = Major;

module.exports = Major;
