var Piece = require('./Piece');

function General () {
	super('General', 9);
}

General.prototype = Piece;
General.prototype.constructor = General;

module.exports = General;
